module.exports = {
  preset: '@shelf/jest-mongodb',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageProvider: 'v8',
  testEnvironment: 'node',
  coverageReporters: ['text-summary', 'lcov'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
}
