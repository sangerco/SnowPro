/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/**/*.test.ts', '**/**/*/*.test.ts'],
    verbose: true,
    forceExit: true,
    // clearMocks: true,
};