const userService = require("../services/user.service");

const getUsers = async (req, res, next) => {
  try {
    const users = await Promise.resolve(userService.getAll());

    res.status(200).json({
      status: "success",
      payload: users
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await Promise.resolve(userService.getById(req.params.id));

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }

    res.status(200).json({
      status: "success",
      payload: user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById
};