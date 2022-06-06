const { Menu } = require('../models');

// Get all available menus
const getAllAvailableMenusHandler = async (req, res) => {
  const menus = await Menu.findAndCountAll();

  const datas = (menus.rows).map(({id, name, description, price}) => ({id, name, description, price}));

  const message = {
    total: menus.count,
    data: datas,
  }
  res.status(200).json(message);
};

// Add a menu
const addMenuHandler = (req, res) => {

};

module.exports = { getAllAvailableMenusHandler, addMenuHandler };
