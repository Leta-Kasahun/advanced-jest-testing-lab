export default {
  testEnvironment: "node",
  transform: {},
  coverageProvider: "v8",
  collectCoverageFrom: ["src/**/*.js"],
  coverageReporters: ["text", "html", "lcov"],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 85,
      functions: 90,
      lines: 90
    }
  }
};
