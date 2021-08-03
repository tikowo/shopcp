const Item = require('../models/Item');
const ItemCategory = require('../models/ItemCategory');
const Attribute = require('../models/Attribute');

const getValidators = require('../../utils/AjvValidators');

exports.index = async (req, res, next) => {
    let data = await Item.query().withGraphFetched('[category.[attributes, children.^3], attributes.[attribute, option]]').page(999, 20);
    // data.results = data.results.map(item => item.formattedAttributes)
    res.send(data);
}

exports.findById = async (req, res, next) => {
    const a = await Item.query().withGraphFetched('[category.[attributes.options, parent.^3], attributes.[attribute, option]]').findById(req.params.id);
    return res.send(a);
}

exports.saveAttributes = async (req, res, next) => {
    const validators = await getValidators();
    const category = await Item.relatedQuery('category').for(req.params.id).first();
    // TODO custom error classes :3
    if (!category) {
        const error = new Error('ValidationError');
        error.statusCode = 404;
        error.name = 'ValidationError';
        error.messages = 'Not found';
        throw error;

    }
    const valid = validators[category.id](req.body);
    const errors = validators[category.id].errors;
    if (!valid) {
        const error = new Error('ValidationError');
        error.messages = errors;
        error.statusCode = 400;
        error.name = 'ValidationError'
        throw error;
    }
    const _ids = Object.keys(req.body).map(i => Number(i));
    const _items = _ids.map(id => {
        let keyAttr = req.body[id].value ? 'value' : 'option_id';
        return {
            attribute_id: id,
            [keyAttr]: req.body[id][keyAttr]
        }
    });
    const b = await Item.relatedQuery('attributes').for(Number(req.params.id)).delete().whereIn('attribute_id', _ids);
    const savedAttributes = await Item.relatedQuery('attributes').for(Number(req.params.id)).insertGraph([
        ..._items
    ])
    res.send(savedAttributes)
}

exports.saveItem = async (req, res, next) => {
    const item = await Item.query().insert(req.body)
    res.send(item)
}

exports.getCategories = async (req, res, next) => {
    const categories = await ItemCategory.query().withGraphFetched('[attributes.options, children.^]').whereNull('parent_id');
    return res.json(categories);
}
exports.getCategory = async (req, res, next) => {
    const category = await ItemCategory.query().withGraphFetched('[attributes.options, children.^]').findById(req.params.id);
    return res.json(category);
}

exports.getCategoryItems = async (req, res, next) => {
    const data = await Item.query().withGraphFetched('[category.[attributes, children.^3], attributes.[attribute, option]]').where('category_id', req.params.id).page(Number(req.query.page ?? 0), 20);
    // data.results = data.results.map(item => item.formattedAttributes)
    return res.send(data);
}

exports.getAttributes = async (req, res, next) => {
    const data = await Attribute.query();
    res.json(data);
}
