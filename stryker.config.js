export default {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "jest",
  jest: {
    projectType: "custom",
    configFile: "jest.config.js",
    enableFindRelatedTests: false
  },
  coverageAnalysis: "perTest",
  mutate: ["src/scholarship.js"],
  htmlReporter: { baseDir: "reports/mutation/scholarship" }
};

