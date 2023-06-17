const handlebars = require('express-handlebars');

const { hbs, viewEngine, views } = require('../configs/utils');
const { viewsRoute } = require('../utils/routes');

function handlebarsConfigs(app) {
    app.engine(hbs, handlebars.engine({
        extname: hbs,
    }));

    app.set(viewEngine, hbs);
    app.set(views, viewsRoute);
}

module.exports = handlebarsConfigs;