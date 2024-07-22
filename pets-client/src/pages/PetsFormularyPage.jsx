import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import petsServices from "../services/pets.services";
import "./pets-formulary.css";

const PetsFormulary = () => {
  const { id } = useParams();
  const isNew = id.toUpperCase() === "NEW";
  const [initialRecord, setInitialRecord] = useState();
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({ defaultValues: async () => await getPetFromDB(id) });

  // Take initial data for formulary from DB or empty
  const getPetFromDB = async (id) => {
    let initPet = {
      name: "",
      age: 0,
      breed: "",
      owner: "",
    };

    if (id.toUpperCase() !== "NEW") {
      initPet = await petsServices.getById(id);
    }
    setInitialRecord({ ...initPet });
  };

  const onSubmit = async (data) => {
    const newPet = { ...data, age: Number(data.age) };
    const resp = isNew
      ? await petsServices.saveNew(newPet) // Create the record
      : await petsServices.updateById(id, newPet); // Update the record
    if (resp.ok) {
      reset();
      navigate("/", { replace: true });
    }
  };

  return (
    <div id="card-formulary">
      <div id="card" className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h2>Pet data formulary</h2>
          <div className="d-flex my-auto fs-4 text-primary">{isNew ? "New pet" : `Id: ${id}`}</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body ">
            <div className="row">
              <div className="col">
                {/* Name */}
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Pet name"
                    {...register("name", { required: true, minLength: 4 })}
                    defaultValue={initialRecord?.name}
                  />
                  {errors.name?.type === "required" && (
                    <small className="text-warning">
                      Pet{"'"}s name is required
                    </small>
                  )}
                  {errors.name?.type === "minLength" && (
                    <small className="text-warning">
                      Pet{"'"}s name must have more than 4 ch.
                    </small>
                  )}
                </div>
              </div>
              <div className="col-4">
                {/* Age */}
                <div className="form-group mb-3">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    className="form-control"
                    {...register("age", { required: true, min: 0, max: 25 })}
                    defaultValue={initialRecord?.age}
                  />
                  {errors.age?.type === "min" ||
                    (errors.age?.type === "max" && (
                      <small className="text-warning">Age max. 25</small>
                    ))}
                </div>
              </div>
            </div>
            {/* Breed */}
            <div className="form-group mb-3">
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                name="breed"
                id="breed"
                className="form-control"
                placeholder="Breed name"
                {...register("breed")}
                defaultValue={initialRecord?.breed}
              />
            </div>
            {/* Owner */}
            <div className="form-group">
              <label htmlFor="name">Owner</label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="form-control"
                placeholder="Owner name"
                {...register("owner", { required: true, minLength: 4 })}
                defaultValue={initialRecord?.owner}
              />
              {errors.owner?.type === "required" && (
                <small className="text-warning">
                  Pet{"'"}s owner name is required
                </small>
              )}
              {errors.owner?.type === "minLength" && (
                <small className="text-warning">
                  Pet{"'"}s owner name must have more than 4 ch.
                </small>
              )}
            </div>
          </div>
          <div className="card-footer">
            {/* Buttons */}
            <div className="d-flex gap-3 justify-content-end">
              <button
                className="btn btn-success"
                disabled={!isValid && isDirty}
              >
                Save pet
              </button>
              <Link className="btn btn-secondary" to="/" replace>
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetsFormulary;
