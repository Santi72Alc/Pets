import { URL_PETS_API } from "../constants/pets-api.contants";

const apiConfig = {
  method: "GET",
  headers: { "Content-Type": "application/json; charset=UTF-8" },
};

// Get all records
const getAll = async () => {
  const resp = await fetch(URL_PETS_API, apiConfig);
  const jsonData = await resp.json();
  return jsonData.ok ? jsonData.data : [];
};

// Get record by id
const getById = async (id) => {
  const resp = await fetch(`${URL_PETS_API}/${id}`, apiConfig);
  const jsonData = await resp.json();
  return jsonData.data;
};

// Save new record
const saveNew = async (data) => {
  const config = {
    ...apiConfig,
    method: "POST",
    body: JSON.stringify(data),
  };
  return await fetch(URL_PETS_API, config);
};

// Update record by id
const updateById = async (id, data) => {
  const config = {
    ...apiConfig,
    method: "PUT",
    body: JSON.stringify({ id, ...data }),
  };
  return await fetch(`${URL_PETS_API}/${id}`, config);
};

// Delete record by id
const deleteById = async (id) => {
  const config = {
    ...apiConfig,
    method: "DELETE",
  };
  return await fetch(`${URL_PETS_API}/${id}`, config);
};

// All filters in 'dataList' for name, breed or owner
const filter = (dataList, str) => {
  return dataList.filter(
    (pet) =>
      pet.name.toLowerCase().includes(str.toLowerCase()) ||
      pet.breed.toLowerCase().includes(str.toLowerCase()) ||
      pet.owner.toLowerCase().includes(str.toLowerCase())
  );
};

export default {
  getAll,
  getById,
  saveNew,
  updateById,
  deleteById,
  filter,
};
