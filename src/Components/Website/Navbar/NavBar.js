import { Axios } from "../../../Api/Axios";
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CATEGO } from "../../../Api/Api";
import StringSlice from "../../../helpers/StringSlice";
import Skeleton from "react-loading-skeleton";
import "./navbar.css";

export default function NavBar() {
  const [categoryies, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletons = Array.from({ length: 8 }).map((_, index) => (
    <p className="category m-0" key={index}>
      <Skeleton width="70px" height="30px" />
    </p>
  ));
  useEffect(() => {
    Axios.get(`${CATEGO}`)
      .then((data) => {
        setCategories(data.data.slice(-8));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const showCategories = categoryies.map((category, index) => (
    <p className="category m-0" key={index}>
      {StringSlice(category.title, 12)}
    </p>
  ));
  return (
    <nav className="py-3">
      <Container>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <Link className="col-3" to="/">
            <img
              width="200px"
              src={require("../../../images/logo.png")}
              alt="logo"
            />
          </Link>
          <div className="col-12 col-md-6 order-md-2 order-3 mt-0 position-relative">
            <Form.Control
              type="search"
              className="form-control custom-search py-3 rounded-0"
              placeholder="Search Product"
            />
            <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center">
              Search
            </h3>
          </div>
          <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
            <Link to="/cart">
              <img
                width="30px"
                src={require("../../../images/cart.png")}
                alt="Cart"
              />
            </Link>
            <div className="profile">
              <Link to="/profile" className="profile">
                <img
                  width="35px"
                  src={require("../../../images/profile.png")}
                  alt="Profile"
                  className="profile-icon"
                />
              </Link>
              <div className="signing text-center bg-light p-4">
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <div className="register">
                  <span className="fw-bold">New customer?</span>
                  <Link to="/register">Start here</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 mt-3">
          {loading ? skeletons : showCategories}
          <Link className="category-title text-black" to="/categories">
            Show All
          </Link>
        </div>
      </Container>
    </nav>
  );
}
