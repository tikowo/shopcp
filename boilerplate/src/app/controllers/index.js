const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);
const obj = {};

// TODO make sure this is correct
const _ = fn => (req, res, next) => {
    fn(req, res, next).catch(e => {
        next(e);
    });
}

fs.readdirSync(dir).forEach(controller => {
    if (controller === 'index.js') return;

    const file = path.join(__dirname, controller);
    const _controller = require(file);

    const controllerName = controller.split('.')[0];
    obj[controllerName] = {};

    Object.keys(_controller).forEach(key => {
        obj[controllerName][key] = _(_controller[key]);
    })
});

module.exports = obj;