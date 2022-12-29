module.exports = {
    port: 3001,
    prettyLogs: true,
    ignoreWatch: '.ts$',
    logLevel: 'debug',
    // Should be higher than MONGODB_SERVER_SELECTION_TIMEOUT_MS or mongoose plugin might fail
    pluginTimeout: 11000,
};
