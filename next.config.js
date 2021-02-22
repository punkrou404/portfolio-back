const path = require('path');

module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.node = {
                fs: 'empty',
            };
        }
        config.resolve.alias = {
            ...config.resolve.alias,
            '~': path.resolve(__dirname, './src'),
        };
        return config;
    },
};
