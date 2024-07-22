import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/common/Header";
import PetsListPage from "./pages/PetsListPage";
import PetsFormularyPage from "./pages/PetsFormularyPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="" exact element={<PetsListPage />} />
          <Route path="form/:id" element={<PetsFormularyPage />} />
          <Route
            path="*"
            element={<NotFoundPage />}
            action={() => <Navigate to="/404" />}
          />
        </Route>
      </Routes>

      {/* Formulary pets */}
      {/* <PetsFormulary /> */}

      {/* List (Table) pets */}
      {/* <PetsList /> */}
    </>
  );
}

export default App;
