const Validator = require('fastest-validator');
const { Menu, OrderMenu, sequelize } = require('../models');
const fail = require('../responses/fail');
const success = require('../responses/success');

const v = new Validator();

// Get all menus (CUSTOMER)
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

// Get menu recommendation (CUSTOMER)
const getMenuRecommendationHandler = async (req, res) => {
  const recMenuIds = await OrderMenu.findAll({
    attributes: [
      'menuId',
      [sequelize.fn('SUM', sequelize.col('amount')), 'ordered'],
    ],
    group: 'menuId',
    order: [
      [sequelize.fn('SUM', sequelize.col('amount')), 'DESC'],
    ],
  });

  const menuIds = recMenuIds.map(({ menuId }) => (menuId));
  const recMenus = await Menu.findAndCountAll({
    where: {
      id: menuIds,
    }
  });

  const menuDatas = [];

  recMenuIds.forEach((recMenuId) => {
    const specRecMenu = (recMenus.rows).find((recMenu) => (recMenu.id === recMenuId.menuId));
    const menuData = {
      id: specRecMenu.id,
      name: specRecMenu.name,
      description: specRecMenu.description,
      price: specRecMenu.price,
      photoUrl: specRecMenu.photoUrl,
      ordered: recMenuId.get('ordered'),
    }
    menuDatas.push(menuData);
  });

  const message = {
    count: recMenus.count,
    data: menuDatas,
  }

  res.send(message);
};

// Add a menu (ADMIN)
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

module.exports = { getAllMenusHandler, getMenuRecommendationHandler, addMenuHandler };
