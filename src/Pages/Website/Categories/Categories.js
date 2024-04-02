import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CATEGO } from "../../../Api/Api";
import { Container } from "react-bootstrap";
import StringSlice from "../../../helpers/StringSlice";

export default function WebsiteCategories() {
  const [categoryies, setCategories] = useState([]);
  useEffect(() => {
    Axios.get(`${CATEGO}`).then((data) => {
      setCategories(data.data);
    });
  }, []);

  const showCategories = categoryies.map((category) => (
    <div className="col-lg-2 col-md-6 col-12 bg-transparent border-0">
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img
          className="ms-3"
          width="50px"
          src={category.image}
          alt="just an img"
        />
        <p className="category m-0">{StringSlice(category.title, 12)}</p>
      </div>
    </div>
  ));
  return (
    <>
      <div className="py-5 categories">
        <Container>
          <div className="d-flex align-items-center flex-wrap row-gap-2">
            {showCategories}
          </div>
        </Container>
      </div>
    </>
  );
}
