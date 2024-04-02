import { useEffect, useState } from "react";
// import Logout from "../Auth/Logout";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import { CATE, CATEGO } from "../../../Api/Api";
import TableComponent from "../../../Components/TableCopmponent/TableComponent";

export default function Categories() {
  const [catego, setCatego] = useState([]);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const headers = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
    {
      key: "created_at",
      name: "Created At",
    },
    {
      key: "updated_at",
      name: "Updated At",
    },
  ];
  // Get Categorise
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGO}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCatego(data.data.data);
        setTotal(data.data.total);
        setLoading(false);
      })
      // .then(() => setNoUsers(true))
      .catch((err) => console.log(err));
  }, [limit, page]);

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`/${CATE}/${id}`);
      setCatego((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h1>Categorise Page</h1>
        <Link to="/dashboard/category/add" className="btn btn-primary">
          Add Category
        </Link>
      </div>
      <TableComponent
        headers={headers}
        data={catego}
        delete={handleDelete}
        loading={loading}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        total={total}
        searchLink={CATE}
      />
    </div>
  );
}
