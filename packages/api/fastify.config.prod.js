module.exports = {
    prettyLogs: false,
    ignoreWatch: '.ts$',
    logLevel: 'info',
    // Should be higher than MONGODB_SERVER_SELECTION_TIMEOUT_MS or mongoose plugin might fail
    pluginTimeout: 11000,
};
