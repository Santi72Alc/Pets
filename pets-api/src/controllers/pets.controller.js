const petsService = require("../services/pets.service");

const router = require("express").Router();

// Get all records
router.get("/", petsService.getAll);

// Get record by id
router.get("/:id", petsService.getById);

// Post new record
router.post("/", petsService.newRecord);

// Update data from a record
router.put("/:id", petsService.updateById);

// Delete a record
router.delete("/:id", petsService.deleteById);

module.exports = router;
