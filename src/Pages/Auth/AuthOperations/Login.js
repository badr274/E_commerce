import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LOGIN, baseUrl } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function Login() {
  // Navigations
  // const nav = useNavigate();
  // States
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // Loading
  const [loading, setLoading] = useState(false);

  // Error handlers
  const [err, setErr] = useState("");

  //Use Ref
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Cookies
  const cookie = Cookie();

  // Handle Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Submit

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      const go =
        role === "1995"
          ? "/dashboard/users"
          : role === "1996"
          ? "/dashboard/writter"
          : "/";
      cookie.set("e-commerce", token);
      window.location.pathname = `${go}`;
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("Wrong Email or Password");
      } else {
        setErr("Internal Server Error");
      }
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Login</h1>
              <Form.Group controlId="email" className="form-custom">
                <Form.Control
                  type="email"
                  placeholder="Enter Your Email..."
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  ref={focus}
                />
                <Form.Label>Email:</Form.Label>
              </Form.Group>
              <Form.Group controlId="password" className="form-custom">
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password..."
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <Form.Label>Password:</Form.Label>
              </Form.Group>
              <div className="submit">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src={require("../../../images/google.png")}
                      alt="Sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              {err !== "" && <div className="err">{err}</div>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
