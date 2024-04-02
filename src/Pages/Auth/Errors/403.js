import { Link } from "react-router-dom";
import "./403.css";

export default function Err403({ role }) {
  return (
    <div className="text-wrapper">
      <div className="title" data-content={404}>
        403 - ACCESS_DENIED
      </div>
      <div className="subtitle">
        Oops, You don't have permission to access this page.
        <Link
          to={role === "1996" ? "/dashboard/writter" : "/"}
          className="d-block text-center btn btn-danger mt-3 fw-bold fs-5"
        >
          {role === "1996" ? "Go To Writter Page" : "Go To Home Page"}
        </Link>
      </div>
    </div>
  );
}
