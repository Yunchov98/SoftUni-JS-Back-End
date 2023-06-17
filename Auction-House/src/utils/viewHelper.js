const { changeCahracters } = require('./editCategoryCahrs');

exports.getCategoryViewData = (category) => {
    const categories = [
        'estate',
        'vehicles',
        'furniture',
        'electronics',
        'other',
    ];

    const options = categories.map(currentCategory => ({
        currentCategory: changeCahracters(currentCategory),
        value: category,
        selected: category === currentCategory,
    }));

    return options;
};