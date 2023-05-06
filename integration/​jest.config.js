module.exports = {
    preset: 'jest-puppeteer',
    rootDir: '.',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
};
