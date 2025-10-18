/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/*.test.ts'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/testSetup.ts'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  coveragePathIgnorePatterns: ['/node_modules/'],
};
