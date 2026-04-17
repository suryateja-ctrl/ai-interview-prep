import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Types "../types/interview";
import Common "../types/common";

module {
  // ── helpers ──────────────────────────────────────────────────────────────

  // Keyword-based scoring: count keyword hits in answer vs ideal
  func scoreAnswer(answer : Text, idealAnswer : Text) : (Nat, Text) {
    let lAnswer = answer.toLower();
    let lIdeal = idealAnswer.toLower();
    let words = lIdeal.split(#char ' ');
    var hits : Nat = 0;
    var total : Nat = 0;
    for (word in words) {
      if (word.size() > 4) {
        total += 1;
        if (lAnswer.contains(#text word)) { hits += 1 };
      };
    };
    let score : Nat = if (total == 0) 70 else {
      let pct = (hits * 100) / total;
      if (pct >= 70) 90 else if (pct >= 40) 70 else if (pct >= 20) 50 else 30
    };
    let feedback = if (score >= 85) {
      "Excellent answer! You covered the key concepts clearly and demonstrated strong understanding."
    } else if (score >= 65) {
      "Good answer. You addressed the main points. Consider adding more specific examples or technical details."
    } else if (score >= 45) {
      "Fair answer. You touched on some concepts but missed important aspects. Review the ideal answer for key points."
    } else {
      "Needs improvement. Your answer was missing several key concepts. Study this topic more thoroughly before the interview."
    };
    (score, feedback)
  };

  // ── public API ────────────────────────────────────────────────────────────

  public func getQuestionsByRole(
    questions : List.List<Types.InterviewQuestion>,
    role : Common.UserRole,
    difficulty : ?Common.Difficulty,
  ) : [Types.InterviewQuestion] {
    let filtered = questions.filter(func(q) {
      if (q.role != role) return false;
      switch difficulty {
        case null true;
        case (?d) q.difficulty == d;
      }
    });
    filtered.toArray()
  };

  public func getQuestion(
    questions : List.List<Types.InterviewQuestion>,
    id : Common.QuestionId,
  ) : ?Types.InterviewQuestion {
    questions.find(func(q) { q.id == id })
  };

  public func startSession(
    sessions : Map.Map<Common.SessionId, Types.MockSession>,
    questions : List.List<Types.InterviewQuestion>,
    nextId : Nat,
    userId : Common.UserId,
    role : Common.UserRole,
    difficulty : Common.Difficulty,
    now : Common.Timestamp,
  ) : Types.SessionStartResult {
    let roleQs = questions.filter(func(q) {
      q.role == role and q.difficulty == difficulty
    });
    // Fall back to any role questions if not enough for difficulty
    let pool = if (roleQs.size() < 5) {
      questions.filter(func(q) { q.role == role })
    } else {
      roleQs
    };
    // Pick up to 10 questions
    let allArr = pool.toArray();
    let count = if (allArr.size() > 10) 10 else allArr.size();
    var questionIds : [Common.QuestionId] = [];
    var i = 0;
    while (i < count) {
      questionIds := questionIds.concat([allArr[i].id]);
      i += 1;
    };
    let firstQ = switch (questions.find(func(q) { q.id == questionIds[0] })) {
      case (?q) q;
      case null {
        { id = 0; role = role; questionType = #Technical; difficulty = difficulty;
          question = "Tell me about yourself.";
          idealAnswer = "Provide a structured 2-minute overview of your background, skills, and goals.";
          rubric = { excellent = "Clear, concise, relevant"; good = "Mostly structured"; fair = "Some structure"; poor = "Rambling" };
          tags = ["intro"] }
      };
    };
    let session : Types.MockSession = {
      id = nextId;
      userId = userId;
      role = role;
      difficulty = difficulty;
      turns = [];
      currentQuestionIndex = 0;
      questionIds = questionIds;
      totalScore = 0;
      isComplete = false;
      startedAt = now;
      completedAt = null;
    };
    sessions.add(nextId, session);
    { sessionId = nextId; firstQuestion = firstQ }
  };

  public func submitAnswer(
    sessions : Map.Map<Common.SessionId, Types.MockSession>,
    questions : List.List<Types.InterviewQuestion>,
    sessionId : Common.SessionId,
    userId : Common.UserId,
    answer : Text,
    now : Common.Timestamp,
  ) : Types.AnswerSubmitResult {
    let session = switch (sessions.get(sessionId)) {
      case (?s) s;
      case null Runtime.trap("Session not found");
    };
    if (session.userId != userId) Runtime.trap("Unauthorized");
    if (session.isComplete) Runtime.trap("Session already complete");

    let currentIdx = session.currentQuestionIndex;
    let currentQId = session.questionIds[currentIdx];
    let currentQ = switch (questions.find(func(q) { q.id == currentQId })) {
      case (?q) q;
      case null Runtime.trap("Question not found");
    };

    let (score, feedback) = scoreAnswer(answer, currentQ.idealAnswer);
    let turn : Types.MockSessionTurn = {
      questionId = currentQId;
      question = currentQ.question;
      userAnswer = answer;
      score = score;
      feedback = feedback;
      answeredAt = now;
    };

    let newTurns = session.turns.concat([turn]);
    let newIndex = currentIdx + 1;
    let isLastQuestion = newIndex >= session.questionIds.size();

    // compute cumulative total
    var cumScore : Nat = 0;
    for (t in newTurns.values()) { cumScore += t.score };
    let avgScore = cumScore / newTurns.size();

    let nextQ : ?Types.InterviewQuestion = if (isLastQuestion) null else {
      let nextQId = session.questionIds[newIndex];
      questions.find(func(q) { q.id == nextQId })
    };

    let updated : Types.MockSession = {
      session with
      turns = newTurns;
      currentQuestionIndex = newIndex;
      totalScore = avgScore;
      isComplete = isLastQuestion;
      completedAt = if (isLastQuestion) ?now else null;
    };
    sessions.add(sessionId, updated);

    {
      score = score;
      feedback = feedback;
      nextQuestion = nextQ;
      sessionComplete = isLastQuestion;
      finalScore = if (isLastQuestion) ?avgScore else null;
    }
  };

  public func getSession(
    sessions : Map.Map<Common.SessionId, Types.MockSession>,
    sessionId : Common.SessionId,
    userId : Common.UserId,
  ) : ?Types.MockSession {
    switch (sessions.get(sessionId)) {
      case (?s) { if (s.userId == userId) ?s else null };
      case null null;
    }
  };

  public func getUserSessions(
    sessions : Map.Map<Common.SessionId, Types.MockSession>,
    userId : Common.UserId,
  ) : [Types.MockSession] {
    let result = List.empty<Types.MockSession>();
    for ((_id, s) in sessions.entries()) {
      if (s.userId == userId) result.add(s);
    };
    result.toArray()
  };

  // ── seed data ─────────────────────────────────────────────────────────────

  public func seedQuestions(
    questions : List.List<Types.InterviewQuestion>,
    startId : Nat,
  ) : Nat {
    if (questions.size() > 0) return startId; // already seeded
    var id = startId;

    // ── Frontend Developer (12 questions) ────────────────────────────────
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Technical;
      difficulty = #Medium; tags = ["css", "layout"];
      question = "Explain the CSS box model and how margin, padding, and border affect element sizing.";
      idealAnswer = "The CSS box model consists of content, padding, border, and margin layers. By default (content-box), width/height apply to the content only. With box-sizing:border-box, width includes padding and border. Margin collapses vertically between siblings. Understanding this prevents layout bugs.";
      rubric = { excellent = "Explains all 4 layers, box-sizing, margin collapse"; good = "Covers 3 layers and box-sizing"; fair = "Mentions content/padding/border"; poor = "Vague answer" };
    });
    id += 1;
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Technical;
      difficulty = #Medium; tags = ["javascript", "async"];
      question = "What is the difference between Promise, async/await, and callbacks in JavaScript?";
      idealAnswer = "Callbacks are functions passed as arguments executed after async operation but cause callback hell. Promises represent future values with .then/.catch chaining, improving readability. async/await is syntactic sugar over Promises, making async code look synchronous and easier to reason about. All three handle async operations but differ in readability and error handling.";
      rubric = { excellent = "Explains all three, callback hell, Promise chaining, async/await sugar"; good = "Compares Promise vs async/await well"; fair = "Understands Promise basics"; poor = "Only knows callbacks" };
    });
    id += 1;
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Technical;
      difficulty = #Hard; tags = ["react", "performance"];
      question = "How do you optimize React application performance?";
      idealAnswer = "Key optimizations include: React.memo to prevent unnecessary re-renders, useMemo/useCallback to memoize expensive computations and stable references, code splitting with React.lazy and Suspense, virtualization for long lists (react-window), avoiding anonymous functions in JSX, using production builds, and profiling with React DevTools.";
      rubric = { excellent = "Mentions memo, useMemo, code splitting, virtualization, profiling"; good = "Covers memo and useMemo/useCallback"; fair = "Knows React.memo only"; poor = "Generic answer" };
    });
    id += 1;
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Technical;
      difficulty = #Easy; tags = ["html", "accessibility"];
      question = "What are semantic HTML elements and why are they important?";
      idealAnswer = "Semantic elements like <header>, <nav>, <main>, <article>, <section>, <footer> convey meaning about the content they contain. They improve accessibility for screen readers, help search engines understand content structure, make code more readable, and often provide built-in browser behaviors.";
      rubric = { excellent = "Lists examples, mentions accessibility, SEO, readability"; good = "Explains meaning and accessibility"; fair = "Lists some elements"; poor = "Only says 'meaningful HTML'" };
    });
    id += 1;
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Technical;
      difficulty = #Medium; tags = ["css", "responsive"];
      question = "Explain CSS Flexbox vs Grid — when would you use each?";
      idealAnswer = "Flexbox is one-dimensional (row or column), ideal for aligning items in a single axis: navigation bars, card rows, form layouts. Grid is two-dimensional, perfect for complex page layouts, dashboard grids, and anything requiring row+column control simultaneously. You can nest them — Grid for page structure, Flexbox for component internals.";
      rubric = { excellent = "Explains 1D vs 2D, gives concrete use cases for each"; good = "Correct distinction with use cases"; fair = "Knows they are layout tools"; poor = "Confuses the two" };
    });
    id += 1;
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Technical;
      difficulty = #Hard; tags = ["javascript", "closures"];
      question = "Explain closures in JavaScript and give a practical use case.";
      idealAnswer = "A closure is a function that remembers variables from its outer scope even after the outer function has returned. Practical uses include: data encapsulation/private variables (module pattern), event handler factories, memoization functions, and partial application/currying. Each closure has its own reference to the outer scope.";
      rubric = { excellent = "Correct definition, explains scope chain, multiple use cases"; good = "Correct definition with one use case"; fair = "Understands functions accessing outer vars"; poor = "Vague or incorrect" };
    });
    id += 1;
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Technical;
      difficulty = #Medium; tags = ["browser", "performance"];
      question = "What happens when you type a URL in the browser and press Enter?";
      idealAnswer = "DNS resolution converts domain to IP. TCP connection established (3-way handshake). HTTPS negotiation occurs. HTTP request sent. Server responds with HTML. Browser parses HTML, builds DOM, parses CSS for CSSOM, combines to Render Tree, Layout calculates positions, Paint renders pixels, Composite layers. JavaScript is parsed/executed, potentially modifying DOM.";
      rubric = { excellent = "DNS, TCP, HTTP, DOM+CSSOM, render pipeline"; good = "Covers DNS through rendering"; fair = "DNS and HTTP response"; poor = "Just says 'loads the page'" };
    });
    id += 1;
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Technical;
      difficulty = #Easy; tags = ["javascript", "dom"];
      question = "What is event delegation and why is it useful?";
      idealAnswer = "Event delegation attaches a single event listener to a parent element instead of many listeners on child elements. It leverages event bubbling — events bubble up from target to ancestors. Benefits: better performance (fewer listeners), handles dynamically added elements automatically. Use event.target to identify which child triggered the event.";
      rubric = { excellent = "Explains bubbling, performance benefit, dynamic elements"; good = "Correct explanation with bubbling"; fair = "Understands attaching to parent"; poor = "Confuses delegation with bubbling" };
    });
    id += 1;
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Behavioral;
      difficulty = #Medium; tags = ["teamwork", "communication"];
      question = "Describe a time you had a technical disagreement with a teammate and how you resolved it.";
      idealAnswer = "Use the STAR method: describe a specific Situation and Task, explain the Actions taken (listened to their perspective, presented data/evidence for your position, sought team input or a tech lead's opinion, found a compromise or agreed to prototype both solutions), and the Result (reached consensus, maintained relationship, improved solution quality).";
      rubric = { excellent = "STAR format, shows empathy and data-driven resolution"; good = "Clear conflict and resolution"; fair = "Describes resolution without full context"; poor = "Avoids or escalates conflict only" };
    });
    id += 1;
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Behavioral;
      difficulty = #Easy; tags = ["learning", "growth"];
      question = "How do you stay current with frontend technologies and trends?";
      idealAnswer = "Strong candidates mention: following official docs (MDN, React blog), newsletters (JavaScript Weekly, CSS-Tricks), podcasts (Syntax, JS Party), Twitter/X tech community, GitHub trending repos, experimenting in side projects, reading RFCs/proposals, and attending conferences or meetups. They balance staying current vs avoiding hype.";
      rubric = { excellent = "Multiple specific resources + critical evaluation of trends"; good = "Several concrete sources"; fair = "Mentions docs and some community"; poor = "Generic 'I read articles'" };
    });
    id += 1;
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Technical;
      difficulty = #Hard; tags = ["security", "web"];
      question = "What is XSS and how do you prevent it in a React application?";
      idealAnswer = "Cross-Site Scripting (XSS) injects malicious scripts into web pages. Types: Stored, Reflected, DOM-based. React prevents XSS by automatically escaping content in JSX. Prevention: never use dangerouslySetInnerHTML with user input, sanitize HTML with DOMPurify when needed, use Content Security Policy headers, validate/sanitize server-side, avoid eval(), use HTTPOnly cookies.";
      rubric = { excellent = "XSS types, React auto-escaping, dangerouslySetInnerHTML, CSP, sanitization"; good = "XSS definition, React protection, sanitization"; fair = "Knows XSS and JSX escaping"; poor = "Vague security answer" };
    });
    id += 1;
    questions.add({
      id = id; role = #FrontendDeveloper; questionType = #Technical;
      difficulty = #Medium; tags = ["react", "state"];
      question = "Explain the difference between controlled and uncontrolled components in React.";
      idealAnswer = "Controlled components have their form data managed by React state — the input value is bound to state and updated via onChange. Uncontrolled components store their own state internally, accessed via refs (useRef). Controlled components give more control for validation and conditional logic. Uncontrolled are simpler for basic forms or integrating with non-React code.";
      rubric = { excellent = "State vs ref, use cases for each, validation advantage"; good = "Correct distinction with examples"; fair = "Understands state-driven vs ref"; poor = "Confuses the concepts" };
    });
    id += 1;

    // ── Backend Developer (12 questions) ────────────────────────────────
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Technical;
      difficulty = #Medium; tags = ["rest", "api"];
      question = "What are the key principles of RESTful API design?";
      idealAnswer = "REST principles: Stateless (each request contains all needed info), Client-Server separation, Uniform Interface (standard HTTP methods GET/POST/PUT/DELETE), Resource-based URLs (nouns not verbs), Cacheable responses, Layered system. Best practices: proper HTTP status codes, versioning, pagination, consistent naming conventions, HATEOAS links.";
      rubric = { excellent = "All 6 REST constraints plus best practices"; good = "Stateless, HTTP methods, resource URLs"; fair = "HTTP methods and resource naming"; poor = "Only knows GET/POST" };
    });
    id += 1;
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Technical;
      difficulty = #Medium; tags = ["database", "sql"];
      question = "Explain database indexing and when you should and should not use indexes.";
      idealAnswer = "Indexes are data structures (usually B-tree) that speed up data retrieval at the cost of write performance and storage. Use indexes on: frequently queried columns (WHERE/JOIN/ORDER BY), foreign keys, high-cardinality columns. Avoid on: small tables, frequently updated columns, low-cardinality columns (e.g., boolean), columns rarely used in queries. Composite indexes: column order matters (prefix rule).";
      rubric = { excellent = "B-tree structure, read vs write tradeoff, when to use/avoid, composite index order"; good = "Read speedup, write cost, use cases"; fair = "Knows indexes speed queries"; poor = "Only mentions existence of indexes" };
    });
    id += 1;
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Technical;
      difficulty = #Hard; tags = ["distributed", "consistency"];
      question = "Explain the CAP theorem and its implications for distributed systems design.";
      idealAnswer = "CAP theorem: a distributed system can guarantee only 2 of 3 properties simultaneously — Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (system works despite network failures). Since partitions are inevitable in distributed systems, you choose between CP (consistent, may be unavailable: HBase, ZooKeeper) or AP (available, eventually consistent: DynamoDB, Cassandra). Design choice depends on business requirements.";
      rubric = { excellent = "All 3 properties, why P is inevitable, CP vs AP examples"; good = "Correct properties, CP vs AP tradeoff"; fair = "Names 3 properties correctly"; poor = "Vague or incorrect" };
    });
    id += 1;
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Technical;
      difficulty = #Easy; tags = ["http", "networking"];
      question = "What is the difference between HTTP status codes 400, 401, 403, and 404?";
      idealAnswer = "400 Bad Request: client sent malformed/invalid request syntax. 401 Unauthorized: authentication required or failed (not logged in). 403 Forbidden: authenticated but not permitted to access resource. 404 Not Found: resource doesn't exist at that URL. Correctly using these helps API consumers diagnose issues and implement proper error handling.";
      rubric = { excellent = "Precise definitions for all 4 with auth distinction"; good = "Correct for all 4"; fair = "Correct for 3 of 4"; poor = "Confuses 401 vs 403" };
    });
    id += 1;
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Technical;
      difficulty = #Medium; tags = ["security", "auth"];
      question = "How does JWT authentication work, and what are its security considerations?";
      idealAnswer = "JWT consists of Header.Payload.Signature (base64 encoded). Server creates JWT with claims, signs with secret key. Client sends in Authorization: Bearer header. Server validates signature without database lookup (stateless). Security considerations: use HTTPS, short expiry, refresh tokens, store in httpOnly cookies (not localStorage), use RS256 for asymmetric signing, validate all claims, handle token revocation (blocklist or short TTL).";
      rubric = { excellent = "Structure, signing, stateless nature, all security considerations"; good = "Structure, validation, major security points"; fair = "Header.Payload.Signature and signing"; poor = "Only knows JWT is for auth" };
    });
    id += 1;
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Technical;
      difficulty = #Hard; tags = ["caching", "performance"];
      question = "Describe different caching strategies and when to use each.";
      idealAnswer = "Cache-aside (lazy loading): app checks cache, on miss fetches from DB and populates cache. Write-through: write to cache and DB simultaneously (consistent, higher write latency). Write-behind: write to cache, async write to DB (fast writes, risk of data loss). Read-through: cache automatically loads from DB on miss. Cache invalidation strategies: TTL, event-driven (on update), cache-busting. Tools: Redis (distributed), Memcached, CDN (static assets), application-level.";
      rubric = { excellent = "All 4 strategies, invalidation, tools with trade-offs"; good = "3+ strategies with trade-offs"; fair = "Cache-aside and TTL"; poor = "Only knows caching exists" };
    });
    id += 1;
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Technical;
      difficulty = #Medium; tags = ["database", "transactions"];
      question = "What are ACID properties in database transactions?";
      idealAnswer = "ACID: Atomicity (all operations in transaction succeed or all fail — no partial commits), Consistency (transaction brings DB from one valid state to another, constraints maintained), Isolation (concurrent transactions behave as if sequential, isolation levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE), Durability (committed transactions survive system failures, ensured by WAL/redo logs).";
      rubric = { excellent = "All 4 properties with isolation levels"; good = "All 4 correct definitions"; fair = "3 of 4 correct"; poor = "Only knows 'atomic means all-or-nothing'" };
    });
    id += 1;
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Technical;
      difficulty = #Easy; tags = ["microservices", "architecture"];
      question = "What are the main differences between monolithic and microservices architectures?";
      idealAnswer = "Monolithic: single deployable unit, simpler development/testing initially, harder to scale independently, one codebase. Microservices: independently deployable services, independent scaling, technology flexibility, fault isolation, but adds complexity: network latency, distributed transactions, service discovery, observability requirements. Choose monolith for small teams/early stage; microservices when scale or team independence demands it.";
      rubric = { excellent = "Clear tradeoffs, deployment, scaling, complexity, when to use each"; good = "Main differences with scaling and deployment"; fair = "Basic differences understood"; poor = "Only surface-level differences" };
    });
    id += 1;
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Technical;
      difficulty = #Hard; tags = ["concurrency", "threading"];
      question = "Explain the challenges of handling concurrency in backend systems.";
      idealAnswer = "Challenges: race conditions (multiple threads modifying shared state simultaneously), deadlocks (circular wait for locks), livelocks, starvation. Solutions: mutexes/locks, optimistic locking (versioning), database transactions, message queues for serialization, immutable data structures, actor model (Erlang/Akka), event loop model (Node.js). Always minimize shared mutable state and prefer message passing.";
      rubric = { excellent = "Race conditions, deadlocks, multiple solutions with trade-offs"; good = "Race conditions, locks, transactions"; fair = "Knows race conditions and locking"; poor = "Generic concurrency mention" };
    });
    id += 1;
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Behavioral;
      difficulty = #Medium; tags = ["incident", "problem-solving"];
      question = "Describe a production incident you handled. What was your process?";
      idealAnswer = "Strong answers include: immediate mitigation (rollback/feature flag), structured investigation (logs, metrics, traces), clear communication with stakeholders, root cause analysis, blameless post-mortem, prevention measures (monitoring/alerting improvements, code fixes, runbooks). Shows ownership, calm under pressure, and systems thinking.";
      rubric = { excellent = "Full incident lifecycle, RCA, prevention, stakeholder communication"; good = "Mitigation and RCA"; fair = "Describes the problem and fix"; poor = "No structured approach" };
    });
    id += 1;
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Behavioral;
      difficulty = #Easy; tags = ["code-quality", "review"];
      question = "How do you approach code reviews — both giving and receiving feedback?";
      idealAnswer = "Giving: focus on code not person, explain 'why' not just 'what', distinguish blocking vs suggestion, check for correctness/security/performance/readability, use questions ('Did you consider...?'). Receiving: treat as learning opportunity, ask for clarification, don't take personally, respond to all comments. Both: maintain team standards, be timely, use automated tooling for style issues.";
      rubric = { excellent = "Both perspectives, constructive tone, blocking vs suggestion, automated tooling"; good = "Good approach for both sides"; fair = "Basic professional approach"; poor = "One-sided or defensive" };
    });
    id += 1;
    questions.add({
      id = id; role = #BackendDeveloper; questionType = #Technical;
      difficulty = #Medium; tags = ["api", "graphql"];
      question = "What is GraphQL and how does it differ from REST?";
      idealAnswer = "GraphQL is a query language for APIs where clients specify exactly what data they need. Differences from REST: single endpoint vs multiple endpoints, client-specified data shape (no over/under-fetching), strongly typed schema, introspection, subscriptions for real-time. REST advantages: simpler caching, better HTTP semantics, wider tooling support. GraphQL suits complex, data-rich apps; REST suits simpler or resource-oriented APIs.";
      rubric = { excellent = "Over/under-fetching, schema, introspection, REST tradeoffs"; good = "Main differences with use cases"; fair = "Knows single endpoint and flexible queries"; poor = "Only knows it's a query language" };
    });
    id += 1;

    // ── Data Analyst (12 questions) ────────────────────────────────────
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Technical;
      difficulty = #Easy; tags = ["sql", "queries"];
      question = "Explain the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.";
      idealAnswer = "INNER JOIN: returns rows where join condition matches in both tables. LEFT JOIN: all rows from left table, matching rows from right (NULL if no match). RIGHT JOIN: all rows from right table, matching rows from left (NULL if no match). FULL OUTER JOIN: all rows from both tables (NULL where no match). Use LEFT JOIN most commonly to preserve all records from primary table.";
      rubric = { excellent = "All 4 with NULL handling explained and use cases"; good = "All 4 correct definitions"; fair = "INNER and LEFT JOIN correct"; poor = "Only knows INNER JOIN" };
    });
    id += 1;
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Technical;
      difficulty = #Medium; tags = ["statistics", "analysis"];
      question = "Explain the difference between mean, median, and mode — when is each most appropriate?";
      idealAnswer = "Mean: arithmetic average, sensitive to outliers, best for symmetric distributions (e.g., height). Median: middle value when sorted, robust to outliers, best for skewed distributions (e.g., income, house prices). Mode: most frequent value, best for categorical data (e.g., most popular product). When data is skewed right (e.g., salary), median better represents 'typical' value than mean.";
      rubric = { excellent = "All 3 correct, outlier sensitivity, skewed distribution use cases"; good = "Correct with outlier discussion"; fair = "Correct basic definitions"; poor = "Only knows mean" };
    });
    id += 1;
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Technical;
      difficulty = #Medium; tags = ["visualization", "communication"];
      question = "How do you choose the right visualization for different types of data?";
      idealAnswer = "Bar charts: comparing categories. Line charts: trends over time. Scatter plots: correlation between two numeric variables. Pie charts: parts of whole (max 5-6 categories). Histograms: distribution of numeric data. Box plots: distribution with outliers, comparing groups. Heatmaps: correlation matrices. Choose based on: data type (categorical/continuous), number of variables, message to convey, audience. Avoid chart junk, ensure proper labeling.";
      rubric = { excellent = "6+ chart types with use cases, data type considerations"; good = "4+ chart types with appropriate use cases"; fair = "3 chart types correct"; poor = "Generic mention of charts" };
    });
    id += 1;
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Technical;
      difficulty = #Hard; tags = ["statistics", "testing"];
      question = "Explain A/B testing — how do you design and analyze an experiment?";
      idealAnswer = "A/B testing: randomly assign users to control (A) vs treatment (B) groups, measure difference in key metric. Design: define hypothesis and primary metric, calculate required sample size (power analysis: effect size, α=0.05, power=0.80), randomize properly, run until sample size reached. Analysis: t-test or z-test for means, chi-square for proportions, check p-value < 0.05, calculate confidence interval, check for novelty effects, segment results. Common mistakes: peeking, multiple testing, sample ratio mismatch.";
      rubric = { excellent = "Full process including power analysis, significance testing, common mistakes"; good = "Hypothesis, randomization, significance testing"; fair = "Understands control vs treatment and p-value"; poor = "Only knows 'compare two versions'" };
    });
    id += 1;
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Technical;
      difficulty = #Medium; tags = ["python", "pandas"];
      question = "How would you handle missing data in a dataset?";
      idealAnswer = "First understand the pattern: MCAR (missing completely at random), MAR (missing at random), MNAR (not at random). Strategies: deletion (listwise/pairwise — only when MCAR and small fraction), imputation (mean/median for numeric, mode for categorical, KNN imputation, multiple imputation), predictive modeling to fill values, flagging missing as indicator variable, business-rule imputation. Never blindly drop — understand WHY data is missing first.";
      rubric = { excellent = "MCAR/MAR/MNAR, multiple strategies with trade-offs"; good = "3+ strategies with when to use"; fair = "Deletion and basic imputation"; poor = "Only drop rows or fill with mean" };
    });
    id += 1;
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Technical;
      difficulty = #Easy; tags = ["sql", "aggregation"];
      question = "What is the difference between WHERE and HAVING clauses in SQL?";
      idealAnswer = "WHERE filters rows before aggregation — it operates on individual rows. HAVING filters groups after aggregation — it operates on aggregate results. WHERE cannot use aggregate functions (COUNT, SUM, AVG); HAVING can. Example: WHERE filters by individual sale amount, HAVING filters by total sales per customer. ORDER: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.";
      rubric = { excellent = "Pre/post aggregation distinction, can't use aggregates in WHERE, SQL order"; good = "Correct distinction with example"; fair = "WHERE=rows, HAVING=groups"; poor = "Confuses the two" };
    });
    id += 1;
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Technical;
      difficulty = #Hard; tags = ["statistics", "regression"];
      question = "Explain linear regression assumptions and how to check them.";
      idealAnswer = "Assumptions: Linearity (use scatter plots, residual vs fitted plots), Independence of observations (check autocorrelation — Durbin-Watson test), Homoscedasticity (constant variance — scale-location plot), Normality of residuals (Q-Q plot, Shapiro-Wilk test), No multicollinearity (VIF > 10 indicates problem — use correlation matrix). Violations: transform variables, add/remove predictors, use robust regression or different models.";
      rubric = { excellent = "All 5 assumptions with diagnostic tests and fixes"; good = "4 assumptions with tests"; fair = "3 assumptions correctly named"; poor = "Only knows Y = mX + b" };
    });
    id += 1;
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Technical;
      difficulty = #Medium; tags = ["data-cleaning", "quality"];
      question = "Walk me through your process for exploratory data analysis (EDA).";
      idealAnswer = "EDA process: 1) Understand the data (shape, dtypes, sample rows), 2) Summary statistics (describe(), value_counts()), 3) Missing values analysis, 4) Distribution of each variable (histograms, box plots), 5) Correlation analysis (heatmap), 6) Outlier detection (IQR, z-score), 7) Bivariate analysis (scatter plots, grouped stats), 8) Feature relationships with target. Document findings and hypotheses throughout.";
      rubric = { excellent = "Full systematic process, multiple techniques, documentation"; good = "6+ steps with appropriate techniques"; fair = "4+ steps"; poor = "Just 'look at the data'" };
    });
    id += 1;
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Behavioral;
      difficulty = #Medium; tags = ["communication", "stakeholders"];
      question = "How do you communicate complex data findings to non-technical stakeholders?";
      idealAnswer = "Key principles: lead with the business insight not the method, use plain language, focus on implications and recommendations not just findings, use clear visualizations (avoid complex charts), provide context (benchmarks, trends), acknowledge uncertainty/caveats, tell a story structure (situation → complication → resolution), tailor to audience's priorities, invite questions. Avoid statistical jargon without explanation.";
      rubric = { excellent = "Business-first framing, storytelling, audience tailoring, visuals"; good = "Plain language, visuals, business focus"; fair = "Mentions simplifying and visuals"; poor = "Just 'explain it simply'" };
    });
    id += 1;
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Behavioral;
      difficulty = #Easy; tags = ["problem-solving", "ambiguity"];
      question = "Describe a time you had to work with incomplete or messy data. How did you handle it?";
      idealAnswer = "Strong answers use STAR: specific scenario with data quality issues (missing values, inconsistencies, duplicates), actions (documented issues, communicated with data owners, applied appropriate cleaning strategies, created data quality metrics), result (delivered actionable insight despite limitations, proposed data collection improvements). Shows pragmatism, communication, and technical skills.";
      rubric = { excellent = "STAR format, specific techniques, communication, systemic fix"; good = "Clear situation, techniques used, outcome"; fair = "Describes problem and basic fix"; poor = "Generic mention of data cleaning" };
    });
    id += 1;
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Technical;
      difficulty = #Medium; tags = ["sql", "window-functions"];
      question = "Explain SQL window functions and give an example use case.";
      idealAnswer = "Window functions perform calculations across a set of rows related to the current row without collapsing them (unlike GROUP BY). Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), SUM() OVER(), AVG() OVER(). Syntax: function() OVER (PARTITION BY col ORDER BY col ROWS/RANGE BETWEEN ...). Use cases: running totals, moving averages, year-over-year comparisons, ranking within groups, finding previous/next values.";
      rubric = { excellent = "Multiple functions, OVER/PARTITION/ORDER syntax, 3+ use cases"; good = "Correct definition, 2+ functions, use case"; fair = "Understands OVER and partitioning"; poor = "Confuses with GROUP BY" };
    });
    id += 1;
    questions.add({
      id = id; role = #DataAnalyst; questionType = #Technical;
      difficulty = #Hard; tags = ["metrics", "kpi"];
      question = "How would you define and measure the success of a product feature launch?";
      idealAnswer = "Framework: 1) Define primary metric (north star metric aligned with business goal), 2) Guard rail metrics (ensure we're not hurting other key metrics), 3) Diagnostic metrics (explain the 'why' behind changes). Measurement: A/B test if possible, define success criteria upfront, appropriate statistical tests, segment analysis (by user type, region), leading vs lagging indicators, time horizon for evaluation. Document and share learnings regardless of outcome.";
      rubric = { excellent = "Primary/guardrail/diagnostic metrics, A/B testing, segmentation, documentation"; good = "Clear metrics framework with testing approach"; fair = "Defines metrics and measurement approach"; poor = "Only mentions 'track engagement'" };
    });
    id += 1;

    id // return next available id
  };
};
