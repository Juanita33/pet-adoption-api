const { getAdoptions } = require("../data/adoption.memory");

const getAll = () => {
  return getAdoptions();
};

const getById = (id) => {
  return getAdoptions().find((adoption) => adoption.id === Number(id));
};

const create = (data) => {
  const adoptions = getAdoptions();

  const newAdoption = {
    id: adoptions.length + 1,
    petName: data.petName,
    petType: data.petType,
    adopterName: data.adopterName,
    adopterEmail: data.adopterEmail,
    status: "pending"
  };

  adoptions.push(newAdoption);

  return newAdoption;
};

const updateStatus = (id, status) => {
  const adoption = getById(id);

  if (!adoption) {
    return null;
  }

  adoption.status = status;
  return adoption;
};

const remove = (id) => {
  const adoptions = getAdoptions();
  const index = adoptions.findIndex((adoption) => adoption.id === Number(id));

  if (index === -1) {
    return false;
  }

  adoptions.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  updateStatus,
  remove
};