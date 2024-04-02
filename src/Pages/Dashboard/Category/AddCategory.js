import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { ADD, CATE } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  //Use Ref
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`/${CATE}/${ADD}`, form);
      nav("/dashboard/categories");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Choose Image:</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>

        <button
          disabled={title.length > 1 ? false : true}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
