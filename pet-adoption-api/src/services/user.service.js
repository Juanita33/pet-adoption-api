const { getUsers } = require("../data/user.memory");

const getAll = () => {
  return getUsers();
};

const getById = (id) => {
  return getUsers().find((user) => user.id === Number(id));
};

module.exports = {
  getAll,
  getById
};