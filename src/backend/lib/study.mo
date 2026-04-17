import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Types "../types/study";
import Common "../types/common";

module {
  // Composite text key for (UserId, TopicId) to avoid tuple compare issues
  func progressKey(userId : Common.UserId, topicId : Common.TopicId) : Text {
    userId.toText() # ":" # topicId.toText()
  };

  public func getTopicsByRole(
    topics : List.List<Types.StudyTopic>,
    role : Common.UserRole,
  ) : [Types.StudyTopic] {
    topics.filter(func(t) { t.role == role }).toArray()
  };

  public func getTopic(
    topics : List.List<Types.StudyTopic>,
    id : Common.TopicId,
  ) : ?Types.StudyTopic {
    topics.find(func(t) { t.id == id })
  };

  public func markTopicComplete(
    progress : Map.Map<Text, Types.UserTopicProgress>,
    userId : Common.UserId,
    topicId : Common.TopicId,
    now : Common.Timestamp,
  ) {
    let entry : Types.UserTopicProgress = {
      userId = userId;
      topicId = topicId;
      completed = true;
      completedAt = ?now;
    };
    progress.add(progressKey(userId, topicId), entry);
  };

  public func getUserProgress(
    progress : Map.Map<Text, Types.UserTopicProgress>,
    userId : Common.UserId,
  ) : [Types.UserTopicProgress] {
    let result = List.empty<Types.UserTopicProgress>();
    for ((_key, entry) in progress.entries()) {
      if (entry.userId == userId) result.add(entry);
    };
    result.toArray()
  };

  // ── seed data ─────────────────────────────────────────────────────────────

  public func seedTopics(
    topics : List.List<Types.StudyTopic>,
    startId : Nat,
  ) : Nat {
    if (topics.size() > 0) return startId; // already seeded
    var id = startId;

    // ── Frontend Developer (8 topics) ────────────────────────────────────
    topics.add({
      id = id; role = #FrontendDeveloper; priority = 1;
      name = "JavaScript Fundamentals";
      description = "Core JavaScript concepts essential for any frontend role.";
      subtopics = [
        { name = "Closures & Scope"; description = "Lexical scope, closure patterns, module pattern"; links = [{ title = "MDN Closures"; url = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"; resourceType = "documentation" }, { title = "JavaScript.info Closures"; url = "https://javascript.info/closure"; resourceType = "tutorial" }] },
        { name = "Prototypes & Classes"; description = "Prototype chain, ES6 classes, inheritance"; links = [{ title = "MDN OOP in JS"; url = "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming"; resourceType = "documentation" }] },
        { name = "Async JavaScript"; description = "Promises, async/await, event loop, microtasks"; links = [{ title = "Event Loop Visualization"; url = "https://www.jsv9000.app/"; resourceType = "interactive" }, { title = "JavaScript.info Promises"; url = "https://javascript.info/async"; resourceType = "tutorial" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #FrontendDeveloper; priority = 2;
      name = "React & Component Architecture";
      description = "Modern React patterns and best practices for building UIs.";
      subtopics = [
        { name = "Hooks Deep Dive"; description = "useState, useEffect, useCallback, useMemo, custom hooks"; links = [{ title = "React Official Docs"; url = "https://react.dev/reference/react"; resourceType = "documentation" }, { title = "useHooks"; url = "https://usehooks.com/"; resourceType = "reference" }] },
        { name = "State Management"; description = "Context API, Redux, Zustand, Jotai comparison"; links = [{ title = "Redux Toolkit"; url = "https://redux-toolkit.js.org/"; resourceType = "documentation" }] },
        { name = "Performance Optimization"; description = "Memoization, code splitting, virtualization"; links = [{ title = "React Performance Docs"; url = "https://react.dev/reference/react/memo"; resourceType = "documentation" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #FrontendDeveloper; priority = 3;
      name = "CSS & Responsive Design";
      description = "Modern CSS techniques for building responsive, accessible UIs.";
      subtopics = [
        { name = "Flexbox & Grid"; description = "Complete mastery of CSS layout systems"; links = [{ title = "CSS-Tricks Flexbox Guide"; url = "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"; resourceType = "reference" }, { title = "Grid Garden"; url = "https://cssgridgarden.com/"; resourceType = "interactive" }] },
        { name = "CSS Variables & Custom Properties"; description = "Design tokens, theming, dynamic styling"; links = [{ title = "MDN CSS Custom Properties"; url = "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties"; resourceType = "documentation" }] },
        { name = "Responsive Design Patterns"; description = "Mobile-first, breakpoints, fluid typography"; links = [{ title = "Responsive Web Design Fundamentals"; url = "https://web.dev/responsive-web-design-basics/"; resourceType = "tutorial" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #FrontendDeveloper; priority = 4;
      name = "Browser APIs & Performance";
      description = "Web platform APIs and browser performance optimization.";
      subtopics = [
        { name = "Web Performance Metrics"; description = "Core Web Vitals, LCP, FID, CLS, performance tooling"; links = [{ title = "web.dev Performance"; url = "https://web.dev/performance/"; resourceType = "tutorial" }] },
        { name = "Browser Storage"; description = "localStorage, sessionStorage, IndexedDB, cookies"; links = [{ title = "MDN Web Storage"; url = "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API"; resourceType = "documentation" }] },
        { name = "Fetch API & HTTP"; description = "Fetch, XMLHttpRequest, HTTP headers, CORS"; links = [{ title = "MDN Fetch API"; url = "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"; resourceType = "documentation" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #FrontendDeveloper; priority = 5;
      name = "TypeScript for Frontend";
      description = "TypeScript patterns and best practices for React applications.";
      subtopics = [
        { name = "Type System Fundamentals"; description = "Interfaces, types, generics, utility types"; links = [{ title = "TypeScript Handbook"; url = "https://www.typescriptlang.org/docs/handbook/intro.html"; resourceType = "documentation" }] },
        { name = "React + TypeScript"; description = "Typing components, hooks, events, refs"; links = [{ title = "React TypeScript Cheatsheet"; url = "https://react-typescript-cheatsheet.netlify.app/"; resourceType = "reference" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #FrontendDeveloper; priority = 6;
      name = "Testing Frontend Applications";
      description = "Testing strategies for frontend code.";
      subtopics = [
        { name = "Unit Testing with Jest"; description = "Jest setup, matchers, mocking, snapshot testing"; links = [{ title = "Jest Documentation"; url = "https://jestjs.io/docs/getting-started"; resourceType = "documentation" }] },
        { name = "React Testing Library"; description = "Component testing, user interactions, accessibility queries"; links = [{ title = "Testing Library Docs"; url = "https://testing-library.com/docs/react-testing-library/intro/"; resourceType = "documentation" }] },
        { name = "E2E Testing with Cypress/Playwright"; description = "End-to-end test strategies"; links = [{ title = "Playwright Docs"; url = "https://playwright.dev/docs/intro"; resourceType = "documentation" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #FrontendDeveloper; priority = 7;
      name = "Web Security";
      description = "Frontend security best practices and common vulnerabilities.";
      subtopics = [
        { name = "XSS Prevention"; description = "Input sanitization, Content Security Policy, safe HTML rendering"; links = [{ title = "OWASP XSS Prevention"; url = "https://owasp.org/www-community/attacks/xss/"; resourceType = "documentation" }] },
        { name = "CSRF Protection"; description = "Cross-site request forgery attacks and mitigations"; links = [{ title = "OWASP CSRF"; url = "https://owasp.org/www-community/attacks/csrf"; resourceType = "documentation" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #FrontendDeveloper; priority = 8;
      name = "Build Tools & Development Workflow";
      description = "Modern frontend build tooling and development practices.";
      subtopics = [
        { name = "Webpack & Vite"; description = "Bundlers, module federation, tree shaking, HMR"; links = [{ title = "Vite Documentation"; url = "https://vitejs.dev/guide/"; resourceType = "documentation" }] },
        { name = "Git & Code Review"; description = "Branching strategies, pull requests, conventional commits"; links = [{ title = "Conventional Commits"; url = "https://www.conventionalcommits.org/"; resourceType = "reference" }] },
        { name = "CI/CD for Frontend"; description = "Automated testing, deployment pipelines"; links = [{ title = "GitHub Actions"; url = "https://docs.github.com/en/actions"; resourceType = "documentation" }] },
      ];
    });
    id += 1;

    // ── Backend Developer (8 topics) ─────────────────────────────────────
    topics.add({
      id = id; role = #BackendDeveloper; priority = 1;
      name = "System Design Fundamentals";
      description = "Core concepts for designing scalable backend systems.";
      subtopics = [
        { name = "Scalability Patterns"; description = "Horizontal vs vertical scaling, load balancing, sharding"; links = [{ title = "System Design Primer"; url = "https://github.com/donnemartin/system-design-primer"; resourceType = "reference" }] },
        { name = "CAP Theorem & Distributed Systems"; description = "Consistency, availability, partition tolerance tradeoffs"; links = [{ title = "Designing Data-Intensive Applications"; url = "https://dataintensive.net/"; resourceType = "book" }] },
        { name = "Microservices vs Monolith"; description = "Architecture decision factors, service decomposition"; links = [{ title = "Martin Fowler on Microservices"; url = "https://martinfowler.com/articles/microservices.html"; resourceType = "article" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #BackendDeveloper; priority = 2;
      name = "Database Design & Optimization";
      description = "Relational and NoSQL databases, query optimization.";
      subtopics = [
        { name = "SQL & Query Optimization"; description = "Indexes, query plans, N+1 problems, EXPLAIN"; links = [{ title = "Use the Index, Luke"; url = "https://use-the-index-luke.com/"; resourceType = "tutorial" }] },
        { name = "NoSQL Data Modeling"; description = "Document, key-value, column-family, graph databases"; links = [{ title = "MongoDB Data Modeling"; url = "https://www.mongodb.com/docs/manual/core/data-modeling-introduction/"; resourceType = "documentation" }] },
        { name = "ACID Transactions"; description = "Transaction isolation levels, deadlocks, distributed transactions"; links = [{ title = "PostgreSQL Transaction Isolation"; url = "https://www.postgresql.org/docs/current/transaction-iso.html"; resourceType = "documentation" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #BackendDeveloper; priority = 3;
      name = "API Design & REST/GraphQL";
      description = "Designing robust, developer-friendly APIs.";
      subtopics = [
        { name = "RESTful API Design"; description = "Resource modeling, HTTP methods, status codes, versioning"; links = [{ title = "REST API Tutorial"; url = "https://restfulapi.net/"; resourceType = "tutorial" }] },
        { name = "GraphQL"; description = "Schema design, resolvers, N+1 problem, subscriptions"; links = [{ title = "GraphQL Official Docs"; url = "https://graphql.org/learn/"; resourceType = "documentation" }] },
        { name = "API Security"; description = "Authentication, rate limiting, input validation, OWASP API security"; links = [{ title = "OWASP API Security Top 10"; url = "https://owasp.org/www-project-api-security/"; resourceType = "reference" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #BackendDeveloper; priority = 4;
      name = "Caching & Performance";
      description = "Caching strategies to build high-performance backend services.";
      subtopics = [
        { name = "Redis & Caching Patterns"; description = "Cache-aside, write-through, TTL, cache invalidation"; links = [{ title = "Redis Documentation"; url = "https://redis.io/docs/"; resourceType = "documentation" }] },
        { name = "CDN & Static Assets"; description = "Content delivery networks, cache-control headers"; links = [{ title = "MDN HTTP Caching"; url = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching"; resourceType = "documentation" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #BackendDeveloper; priority = 5;
      name = "Authentication & Authorization";
      description = "Secure user authentication and access control systems.";
      subtopics = [
        { name = "JWT & OAuth 2.0"; description = "Token design, refresh tokens, OAuth flows, OIDC"; links = [{ title = "JWT Introduction"; url = "https://jwt.io/introduction"; resourceType = "tutorial" }, { title = "OAuth 2.0 Simplified"; url = "https://aaronparecki.com/oauth-2-simplified/"; resourceType = "article" }] },
        { name = "Role-Based Access Control"; description = "RBAC, ABAC, permission modeling"; links = [{ title = "RBAC Overview"; url = "https://www.nist.gov/system/files/documents/2021/03/29/rbac1.pdf"; resourceType = "documentation" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #BackendDeveloper; priority = 6;
      name = "Message Queues & Async Processing";
      description = "Asynchronous communication patterns for scalable systems.";
      subtopics = [
        { name = "Message Queue Patterns"; description = "Producer/consumer, pub/sub, dead letter queues"; links = [{ title = "RabbitMQ Tutorials"; url = "https://www.rabbitmq.com/tutorials/"; resourceType = "tutorial" }] },
        { name = "Event-Driven Architecture"; description = "Events vs commands, event sourcing, CQRS basics"; links = [{ title = "Event-Driven Architecture Guide"; url = "https://aws.amazon.com/event-driven-architecture/"; resourceType = "article" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #BackendDeveloper; priority = 7;
      name = "Containerization & DevOps";
      description = "Docker, Kubernetes, and CI/CD for backend services.";
      subtopics = [
        { name = "Docker Fundamentals"; description = "Images, containers, Dockerfile best practices, docker-compose"; links = [{ title = "Docker Getting Started"; url = "https://docs.docker.com/get-started/"; resourceType = "documentation" }] },
        { name = "CI/CD Pipelines"; description = "Automated testing, deployment strategies, rollback"; links = [{ title = "GitHub Actions Documentation"; url = "https://docs.github.com/en/actions"; resourceType = "documentation" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #BackendDeveloper; priority = 8;
      name = "Observability & Monitoring";
      description = "Logging, metrics, and tracing for production systems.";
      subtopics = [
        { name = "Structured Logging"; description = "Log levels, correlation IDs, log aggregation (ELK, Datadog)"; links = [{ title = "Structured Logging Intro"; url = "https://www.honeycomb.io/blog/structured-logging"; resourceType = "article" }] },
        { name = "Metrics & Alerting"; description = "Prometheus, Grafana, RED/USE methods, SLOs"; links = [{ title = "Prometheus Docs"; url = "https://prometheus.io/docs/introduction/overview/"; resourceType = "documentation" }] },
        { name = "Distributed Tracing"; description = "OpenTelemetry, trace propagation, span analysis"; links = [{ title = "OpenTelemetry Docs"; url = "https://opentelemetry.io/docs/"; resourceType = "documentation" }] },
      ];
    });
    id += 1;

    // ── Data Analyst (8 topics) ───────────────────────────────────────────
    topics.add({
      id = id; role = #DataAnalyst; priority = 1;
      name = "SQL for Data Analysis";
      description = "Advanced SQL techniques used in real-world data analysis.";
      subtopics = [
        { name = "Window Functions"; description = "ROW_NUMBER, RANK, LAG/LEAD, running totals, moving averages"; links = [{ title = "Mode SQL Tutorial"; url = "https://mode.com/sql-tutorial/sql-window-functions/"; resourceType = "tutorial" }] },
        { name = "CTEs & Subqueries"; description = "Common table expressions, recursive CTEs, correlated subqueries"; links = [{ title = "PostgreSQL CTE Docs"; url = "https://www.postgresql.org/docs/current/queries-with.html"; resourceType = "documentation" }] },
        { name = "Query Optimization"; description = "EXPLAIN ANALYZE, indexes, query rewriting strategies"; links = [{ title = "Use the Index, Luke"; url = "https://use-the-index-luke.com/"; resourceType = "tutorial" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #DataAnalyst; priority = 2;
      name = "Statistics & Probability";
      description = "Statistical foundations for data analysis and interpretation.";
      subtopics = [
        { name = "Descriptive Statistics"; description = "Central tendency, variability, distribution shapes, percentiles"; links = [{ title = "Khan Academy Statistics"; url = "https://www.khanacademy.org/math/statistics-probability"; resourceType = "course" }] },
        { name = "Hypothesis Testing"; description = "t-tests, chi-square, p-values, Type I/II errors, effect size"; links = [{ title = "StatQuest Hypothesis Testing"; url = "https://www.youtube.com/@statquest"; resourceType = "video" }] },
        { name = "A/B Testing"; description = "Experiment design, power analysis, multiple testing correction"; links = [{ title = "Evan Miller Sample Size Calculator"; url = "https://www.evanmiller.org/ab-testing/sample-size.html"; resourceType = "tool" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #DataAnalyst; priority = 3;
      name = "Python for Data Analysis";
      description = "Python libraries and workflows for data analysis.";
      subtopics = [
        { name = "Pandas & NumPy"; description = "DataFrames, series operations, vectorization, performance"; links = [{ title = "Pandas Documentation"; url = "https://pandas.pydata.org/docs/"; resourceType = "documentation" }, { title = "Pandas Tutorial"; url = "https://pandas.pydata.org/docs/getting_started/10min.html"; resourceType = "tutorial" }] },
        { name = "Data Cleaning"; description = "Missing values, outliers, type coercion, deduplication"; links = [{ title = "Practical Data Cleaning"; url = "https://realpython.com/python-data-cleaning-numpy-pandas/"; resourceType = "tutorial" }] },
        { name = "EDA Workflow"; description = "Exploratory analysis, profiling libraries, reproducibility"; links = [{ title = "Ydata Profiling"; url = "https://docs.profiling.ydata.ai/"; resourceType = "tool" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #DataAnalyst; priority = 4;
      name = "Data Visualization";
      description = "Creating clear, insightful charts and dashboards.";
      subtopics = [
        { name = "Matplotlib & Seaborn"; description = "Chart types, styling, publication-quality figures"; links = [{ title = "Seaborn Tutorial"; url = "https://seaborn.pydata.org/tutorial.html"; resourceType = "tutorial" }] },
        { name = "Business Intelligence Tools"; description = "Tableau, Power BI, Looker — dashboard design principles"; links = [{ title = "Tableau Training"; url = "https://www.tableau.com/learn/training"; resourceType = "course" }] },
        { name = "Data Storytelling"; description = "Narrative structure, chart selection, audience-first design"; links = [{ title = "Storytelling with Data"; url = "https://www.storytellingwithdata.com/"; resourceType = "book" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #DataAnalyst; priority = 5;
      name = "Machine Learning Fundamentals";
      description = "Core ML concepts relevant to data analyst roles.";
      subtopics = [
        { name = "Supervised Learning Basics"; description = "Linear/logistic regression, decision trees, model evaluation"; links = [{ title = "Scikit-learn User Guide"; url = "https://scikit-learn.org/stable/user_guide.html"; resourceType = "documentation" }] },
        { name = "Feature Engineering"; description = "Encoding, scaling, feature selection, handling imbalanced data"; links = [{ title = "Feature Engineering for ML"; url = "https://www.kaggle.com/learn/feature-engineering"; resourceType = "course" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #DataAnalyst; priority = 6;
      name = "Business Metrics & KPIs";
      description = "Frameworks for defining and measuring business performance.";
      subtopics = [
        { name = "Product Metrics Frameworks"; description = "AARRR, HEART, North Star metrics, OKRs"; links = [{ title = "Reforge Metrics Guide"; url = "https://www.reforge.com/blog/north-star-metric-growth-model"; resourceType = "article" }] },
        { name = "Cohort & Funnel Analysis"; description = "Retention cohorts, conversion funnels, churn analysis"; links = [{ title = "Amplitude Analytics Guide"; url = "https://amplitude.com/blog/cohort-analysis"; resourceType = "article" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #DataAnalyst; priority = 7;
      name = "Data Pipeline & ETL";
      description = "Building and managing data pipelines.";
      subtopics = [
        { name = "ETL vs ELT"; description = "Extract/transform/load patterns, data warehouses, data lakes"; links = [{ title = "Modern Data Stack Overview"; url = "https://www.getdbt.com/blog/what-exactly-is-dbt"; resourceType = "article" }] },
        { name = "dbt for Data Transformation"; description = "SQL-based transformations, testing, documentation"; links = [{ title = "dbt Documentation"; url = "https://docs.getdbt.com/docs/introduction"; resourceType = "documentation" }] },
      ];
    });
    id += 1;
    topics.add({
      id = id; role = #DataAnalyst; priority = 8;
      name = "Communication & Data Literacy";
      description = "Translating data insights into business decisions.";
      subtopics = [
        { name = "Executive Presentations"; description = "Slide structure, key message first, handling questions"; links = [{ title = "Pyramid Principle"; url = "https://www.barbaraminto.com/"; resourceType = "book" }] },
        { name = "SQL & Analytics Best Practices"; description = "Version control for SQL, documentation, peer review"; links = [{ title = "dbt Style Guide"; url = "https://github.com/dbt-labs/corp/blob/main/dbt_style_guide.md"; resourceType = "reference" }] },
      ];
    });
    id += 1;

    id // return next available id
  };
};
