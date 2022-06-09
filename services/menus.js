const Validator = require('fastest-validator');
const { Menu } = require('../models');
const fail = require('../responses/fail');
const success = require('../responses/success');

const v = new Validator();

// Get all menus (customer)
const getAllMenusHandler = async (req, res) => {
  const menus = await Menu.findAndCountAll();

  const datas = (menus.rows).map(({
    id: menuId, name, description, price, photoUrl,
  }) => ({
    menuId, name, description, price, photoUrl,
  }));

  const message = {
    total: menus.count,
    data: datas,
  };
  res.status(200).json(message);
};

// Add a menu (admin)
const addMenuHandler = async (req, res) => {
  const schema = {
    name: 'string',
    description: 'string',
    price: 'number',
    photoUrl: 'string',
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) return res.status(400).json(validate);

  const menu = await Menu.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (menu) return res.status(400).json(fail.menuAlreadyExisted);

  await Menu.create(req.body);

  res.status(201).json(success.menuAdded);
};

module.exports = { getAllMenusHandler, addMenuHandler };
