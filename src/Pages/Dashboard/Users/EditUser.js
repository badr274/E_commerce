import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { EDIT, USER, baseUrl } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function EditUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  // Handle Form Change
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const { id } = useParams();
  const nav = useNavigate();
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USER}/${id}`)
      .then((data) => {
        setForm({
          ...form,
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
        });
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => nav("/dashboard/users/page/404", { replace: true }));
  }, []);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`/${USER}/${EDIT}/${id}`, form);
      nav("/dashboard/users");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Edit Name..."
            name="name"
            value={form.name}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Emai:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Edit Email..."
            name="email"
            value={form.email}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="role">
          <Form.Label>Role:</Form.Label>
          <Form.Select
            name="role"
            value={form.role}
            onChange={handleFormChange}
          >
            <option disabled>Select Role</option>
            <option value={1995}>Admin</option>
            <option value={2001}>User</option>
            <option value={1996}>Writter</option>
            <option value={1999}>Product Manger</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
