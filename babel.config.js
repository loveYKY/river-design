module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                module: 'auto',
                targets: {
                    node: true,
                },
            },
        ],
    ],
};
