module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  collectCoverage: true,
  verbose: true,
  moduleNameMapper: {
    "@shared/(.*)": "<rootDir>/shared/$1",
    "modules/database/(.*)": "<rootDir>/modules/database/$1",
    "@core/(.*)": "<rootDir>/core/$1",
    "@modules/(.*)": "<rootDir>/modules/$1"
  }
}