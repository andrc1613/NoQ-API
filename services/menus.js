const { Menu } = require('../models');

// Get all menus (user)
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

// Add a menu (root)
const addMenuHandler = (req, res) => {
  
};

module.exports = { getAllMenusHandler, addMenuHandler };
