const {
  objOriginalReturn,
  recordNotFound,
  systemError,
} = require("../constants/api.constants");
const Pets = require("../model/pet.model");

// Get all records
const getAll = async (req, res) => {
  let objRet = objOriginalReturn();
  try {
    const pets = await Pets.findAll();
    if (pets === null || pets.length == 0) {
      objRet = recordNotFound();
    } else {
      objRet.data = pets;
    }
  } catch (err) {
    objRet = systemError(err.message);
  }
  res.status(objRet.status).json(objRet);
};

// Get record by id
const getById = async (req, res) => {
  let objRet = objOriginalReturn();
  try {
    const id = Number(req.params.id);
    const pet = await Pets.findByPk(id);
    if (pet === null) {
      objRet = recordNotFound();
    } else {
      objRet.data = pet;
    }
  } catch {
    objRet = systemError(err.message);
  }
  res.status(objRet.status).json(objRet);
};

// Post a new record
const newRecord = async (req, res) => {
  let objRet = objOriginalReturn();
  try {
    const pet = await Pets.create(req.body, { isNewRecord: true });
    objRet.status = 201;
    objRet.data = pet.toJSON()
    objRet.messaje = "Record created";
  } catch (err) {
    objRet = systemError(err.message);
  }
  res.status(objRet.status).json(objRet);
};

// Update a record by id
const updateById = async (req, res) => {
  let objRet = objOriginalReturn();
  const id = Number(req.params.id);
  try {
    const nPet = await Pets.update({ ...req.body }, { where: { id } });
    if (nPet < 1) {
      objRet = recordNotFound();
    } else {
      objRet.messaje = "Record updated";
      objRet.data = { id, ...req.body };
    }
  } catch (err) {
    objRet = systemError(err.message);
  }
  res.status(objRet.status).json(objRet);
};

// Delete a record by id
const deleteById = async (req, res) => {
  let objRet = objOriginalReturn();
  const id = Number(req.params.id);
  try {
    const nPet = await Pets.destroy({
      where: {
        id,
      },
    });
    if (nPet < 1) {
      objRet = recordNotFound();
    } else {
      objRet.messaje = "Record deleted";
    }
  } catch (err) {
    objRet = systemError(err.message);
  }
  res.status(objRet.status).json(objRet);
};

module.exports = {
  getAll,
  getById,
  newRecord,
  updateById,
  deleteById,
};
