import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { ADD, USER } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  //Use Ref
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle Form Change
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const nav = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`/${USER}/${ADD}`, form);
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
            placeholder="Enter Name..."
            name="name"
            value={form.name}
            onChange={handleFormChange}
            required
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Emai:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email..."
            name="email"
            value={form.email}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password..."
            name="password"
            value={form.password}
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
        <button
          disabled={
            form.name.length > 1 &&
            form.email.length > 1 &&
            form.password.length > 7 &&
            form.role !== ""
              ? false
              : true
          }
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
