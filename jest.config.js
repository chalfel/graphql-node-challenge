module.exports = {
  preset: '@shelf/jest-mongodb',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  collectCoverage: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  coverageReporters: ['text', 'lcov'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
}
