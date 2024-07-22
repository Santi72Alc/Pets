import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="card w-25 d-flex flex-column mt-5 mx-auto text-center">
      <div className="card-header">
        <div>
          <p className="fs-1 fw-bold text-danger">Oops!</p>
        </div>
        <div className="fs-2 text-black">Page NOT FOUND</div>

        <div className="my-3 mt-5">
          <hr />
          <Link to="/" replace>
            {"<"} Go back {">"}
          </Link>
        </div>
      </div>
    </div>
  );
}
