// eslint-disable-next-line no-undef
module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['jest-extended/all'],
};
