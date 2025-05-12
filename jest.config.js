/** @type {import('jest').Config} */
const config = {
    testEnvironment: "jsdom", 
    clearMocks: true,          
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], 
};

module.exports = config;