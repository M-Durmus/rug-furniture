module.exports = {
  ci: {
    collect: {
      startServerCommand: "node scripts/serve-warm.mjs",
      startServerReadyPattern: "Server warmed",
      url: [
        "http://127.0.0.1:4173/",
        "http://127.0.0.1:4173/rugs",
        "http://127.0.0.1:4173/rugs/sivas-medallion",
        "http://127.0.0.1:4173/services/rug-cleaning",
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
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
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
