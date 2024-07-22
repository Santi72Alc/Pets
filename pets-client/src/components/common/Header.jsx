import { Link, Outlet, useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  const location = useLocation();

  const isPathMenu = (path) =>
    location.pathname === path
      ? "align-content-center pe-none text-secondary px-3"
      : "btn btn-outline-primary";

  return (
    <>
      <div
        id="header-app"
        className="d-flex justify-content-between px-3 border-3 border-bottom"
      >
        <div className="fs-1 my-auto m-0">Pets</div>
        <div className="d-flex my-auto gap-3">
          <Link to={"/"} replace className={`${isPathMenu("/")}`}>
            Pets list
          </Link>
          <Link to={"/"} replace className={`${isPathMenu("about")} `}>
            About Us
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
