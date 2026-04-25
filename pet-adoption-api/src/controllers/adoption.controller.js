const adoptionService = require("../services/adoption.service");

const validStatuses = ["pending", "approved", "rejected"];

const getAdoptions = async (req, res, next) => {
  try {
    const adoptions = await Promise.resolve(adoptionService.getAll());

    res.status(200).json({
      status: "success",
      payload: adoptions
    });
  } catch (error) {
    next(error);
  }
};

const getAdoptionById = async (req, res, next) => {
  try {
    const adoption = await Promise.resolve(
      adoptionService.getById(req.params.id)
    );

    if (!adoption) {
      return res.status(404).json({
        status: "error",
        message: "Adoption not found"
      });
    }

    res.status(200).json({
      status: "success",
      payload: adoption
    });
  } catch (error) {
    next(error);
  }
};

const createAdoption = async (req, res, next) => {
  try {
    const { petName, petType, adopterName, adopterEmail } = req.body;

    if (!petName || !petType || !adopterName || !adopterEmail) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields"
      });
    }

    const newAdoption = await Promise.resolve(
      adoptionService.create({
        petName,
        petType,
        adopterName,
        adopterEmail
      })
    );

    res.status(201).json({
      status: "success",
      payload: newAdoption
    });
  } catch (error) {
    next(error);
  }
};

const updateAdoptionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid status"
      });
    }

    const adoption = await Promise.resolve(
      adoptionService.updateStatus(req.params.id, status)
    );

    if (!adoption) {
      return res.status(404).json({
        status: "error",
        message: "Adoption not found"
      });
    }

    res.status(200).json({
      status: "success",
      payload: adoption
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdoption = async (req, res, next) => {
  try {
    const deleted = await Promise.resolve(
      adoptionService.remove(req.params.id)
    );

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Adoption not found"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Adoption deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdoptions,
  getAdoptionById,
  createAdoption,
  updateAdoptionStatus,
  deleteAdoption
};