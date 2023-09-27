module.exports = {
    preset: 'ts-jest',
    // testEnvironment: 'node',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  };
  