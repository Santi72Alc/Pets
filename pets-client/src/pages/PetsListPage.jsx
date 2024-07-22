import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import petsServices from "../services/pets.services";
// buttons Icons
import { MdEdit } from "react-icons/md";
import { VscTrash } from "react-icons/vsc";

import "./pets-list.css";

const PetsList = () => {
  let [strFilter, setStrFilter] = useState("");
  const [dataApi, setDataApi] = useState();
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPetsFromDB = () => {
    (async () => {
      const pets = await petsServices.getAll();
      console.log("PETS", pets);
      setDataApi(pets);
      setFilterData(pets);
    })();
  };

  useEffect(() => {
    setIsLoading(true);
    getPetsFromDB(); // Take data from DB
    setIsLoading(false);
  }, []);

  // Make the new filter string
  const handleChangeFilter = (evt) => {
    const valueFilter = evt.target.value;
    setStrFilter(valueFilter);
    if (!valueFilter) setFilterData(dataApi);
    else {
      const newFilter = petsServices.filter(dataApi, valueFilter);
      setFilterData(newFilter);
    }
  };

  // Deleting a record by id
  const handleDelete = async (id) => {
    // Delete id from store
    const newData = filterData.filter((resp) => resp.id !== id);
    setDataApi(newData);
    setFilterData(newData);
    // Delete record in database
    await petsServices.deleteById(id);
  };

  return (
    <div id="card-list" className="card mt-5 mx-auto shadow-lg border-dark">
      <div className="card-header d-flex">
        <p className="m-0 fs-2">Pets list</p>
        <div className="d-flex ms-auto gap-2">
          <div className="d-flex align-content-center ">
            <label className="form-label my-auto me-2">Filter</label>
            <input
              className="form-control"
              type="text"
              id="filter"
              name="strFilter"
              onChange={handleChangeFilter}
              placeholder="Name, Breed, Owner"
              value={strFilter}
            />
          </div>
          <div className="vr"></div>
          <div className="d-flex my-auto">
            <Link to={"/form/new"} className="btn btn-success">
              Add new pet
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        {isLoading && <h4>Loading...</h4>}
        {!isLoading && !filterData.length && (
          <div className="fs-3 fst-italic text-center">
            <span>No records</span>
          </div>
        )}
        {!isLoading && filterData.length > 0 && (
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Breed</th>
                <th>Owner</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterData?.map((pet) => (
                <tr className="align-middle" key={pet.id}>
                  <th>{pet.id}</th>
                  <td>{pet.name}</td>
                  <td>{pet.age}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.owner}</td>
                  <td>{pet.created_at}</td>
                  <td>{pet.updated_at}</td>
                  <td>
                    <div className="d-flex justify-content-evenly">
                      <Link to={`/form/${pet.id}`} className="btn btn-info">
                        <MdEdit className="mb-1" /> Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(pet.id)}
                      >
                        <VscTrash className="mb-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/*  <div className="card-footer">
        <div className="d-flex gap-3 justify-content-end">
          <button type="button" className="btn btn-success">
            Save
          </button>
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default PetsList;
