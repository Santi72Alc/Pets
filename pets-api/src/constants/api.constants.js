// Object to return
const objOriginalReturn = () => {
  return {
    ok: true,
    status: 200,
    messaje: "Ok",
    data: undefined,
  };
};

// Record NOT FOUND
const recordNotFound = () => {
  let notFound = objOriginalReturn();
  notFound.ok = false;
  notFound.status = 404;
  notFound.messaje = "Record not found";
  return notFound;
};

// System ERROR
const systemError = (message) => {
  let systemError = objOriginalReturn();
  systemError.ok = false;
  systemError.status = 500;
  systemError.messaje = `System error: ${message}`;
  return systemError;
};

module.exports = {
  objOriginalReturn,
  recordNotFound,
  systemError,
};
