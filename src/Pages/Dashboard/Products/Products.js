import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import { PRODUDT, PRODUDTS } from "../../../Api/Api";
import TableComponent from "../../../Components/TableCopmponent/TableComponent";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const headers = [
    {
      key: "images",
      name: "Images",
    },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
  ];
  // Get Categorise
  useEffect(() => {
    Axios.get(`/${PRODUDTS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err));
  }, [limit, page]);
  console.log(products);
  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`/${PRODUDT}/${id}`);
      setProducts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h1>Products Page</h1>
        <Link to="/dashboard/product/add" className="btn btn-primary">
          Add Product
        </Link>
      </div>
      <TableComponent
        headers={headers}
        data={products}
        delete={handleDelete}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        total={total}
      />
    </div>
  );
}
