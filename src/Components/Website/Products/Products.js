import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StringSlice from "../../../helpers/StringSlice";

export default function Products(props) {
  const roundedStarts = Math.round(props.rating);
  const stars = Math.min(roundedStarts, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solidStar} style={{ color: "gold" }} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  return (
    <div className="col-lg-3 col-md-6 col-12">
      <div className="m-1 border rounded p-3 h-100">
        <div className="border-bottom pb-3">
          <p style={{ color: "gray" }}>{StringSlice(props.title, 30)}</p>
          <p>{StringSlice(props.title, 30)}</p>
          <div className="px-5 py-4 position-relative">
            <p
              className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block d-flex align-items-center justify-content-center"
              style={{ width: "50px", height: "50px" }}
            >
              Sale
            </p>
            <img
              className="img-fluid"
              src={require("../../../images/upload.png")}
              alt="products img"
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {showGoldStars}
            {showEmptyStars}
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">{props.price}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {props.discount}$
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <img
              src={require("../../../images/cart.png")}
              width="20px"
              alt="Cart"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
