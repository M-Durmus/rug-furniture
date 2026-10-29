/** Mobile Lighthouse budgets for the home, a listing, a product, and a service page. */
module.exports = {
  ci: {
    collect: {
      startServerCommand: "npx next start -p 3100",
      startServerReadyPattern: "Ready",
      startServerReadyTimeout: 60000,
      url: [
        "http://127.0.0.1:3100/",
        "http://127.0.0.1:3100/rugs",
        "http://127.0.0.1:3100/rugs/pale-oushak-field",
        "http://127.0.0.1:3100/services/rug-cleaning",
      ],
      numberOfRuns: 1,
      settings: {
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
        throttlingMethod: "simulate",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
