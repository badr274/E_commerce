import { LATESTSALE } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { useEffect, useState } from "react";
import Products from "./Products";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

export default function LatestSale() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LATESTSALE}`)
      .then((data) => {
        setLatestProducts(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const productsShow = latestProducts.map((product, index) => (
    <Products
      key={index}
      title={product.title}
      desc={product.description}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
    />
  ));

  return (
    <Container>
      <h1 className="mt-5">Latest Sale Products</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2 mb-5">
        {loading ? (
          <>
            {" "}
            <div className="col-1g-3 col-md-6 col-12">
              <div className="mx-1">
                <Skeleton height="300px" />
              </div>
            </div>{" "}
            <div className="col-1g-3 col-md-6 col-12">
              <div className="mx-1">
                <Skeleton height="300px" />
              </div>
            </div>{" "}
            <div className="col-1g-3 col-md-6 col-12">
              <div className="mx-1">
                <Skeleton height="300px" />
              </div>
            </div>{" "}
            <div className="col-1g-3 col-md-6 col-12">
              <div className="mx-1">
                <Skeleton height="300px" />
              </div>
            </div>
          </>
        ) : (
          productsShow
        )}
      </div>
    </Container>
  );
}
