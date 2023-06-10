exports.getPlatformsViewData = (platform) => {
    const platforms = [
        'PC',
        'Nintendo',
        'PS4',
        'PS5',
        'XBOX',
    ];

    const options = platforms.map((title, i) => ({
        title,
        value: title,
        selected: platform === title,
    }));

    return options;
};