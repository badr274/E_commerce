import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";

import TableComponent from "../../../Components/TableCopmponent/TableComponent";

export default function Users() {
  const [users, setUsers] = useState([]);
  // const [reload, setReload] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [noUsers, setNoUsers] = useState(false);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const headers = [
    {
      key: "name",
      name: "UserName",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];

  // Current User
  useEffect(() => {
    Axios.get(`/${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  // Get Users
  useEffect(() => {
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotal(data.data.total);
      })
      .then(() => setNoUsers(true))
      .catch((err) => console.log(err));
  }, [limit, page]);

  // Handle Delete
  async function handleDelete(id) {
    try {
      await Axios.delete(`/${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2 box-shadow-sm m-5">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h1>Users Page</h1>
        <Link to="/dashboard/user/add" className="btn btn-primary">
          Add User
        </Link>
      </div>
      <TableComponent
        headers={headers}
        data={users}
        delete={handleDelete}
        currentUser={currentUser}
        noData={noUsers}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        total={total}
      />
    </div>
  );
}
