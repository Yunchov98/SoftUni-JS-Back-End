exports.changeCahracters = (category) => {
    let result = '';

    if (category === 'estate') {
        result = 'Real Estate';
    } else if (category === 'vehicles') {
        result = 'Vehicles';
    } else if (category === 'furniture') {
        result = 'Furniture';
    } else if (category === 'electronics') {
        result = 'Electronics';
    } else if (category === 'other') {
        result = 'Other';
    }

    return result;
};