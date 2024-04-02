import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CATEGO, EDIT, PRODUDT } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function EditProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [idsFromServer, setIdsFromServer] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  //Use Ref
  const focus = useRef(null);
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  useEffect(() => {
    focus.current.focus();
  }, []);

  function handleImage() {
    openImage.current.click();
  }

  // Get Data
  useEffect(() => {
    setLoading(true);
    const res = Axios.get(`${PRODUDT}/${id}`)
      .then((data) => {
        setForm(data.data[0]);
        setLoading(false);
        console.log(data.data[0]);
        setImagesFromServer(data.data[0].images);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        nav("/dashboard/products/page/404", { replace: true });
      });
  }, []);
  // Handle Form Change

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  // Handle Images Change
  const j = useRef(0);
  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);

    const imagesArray = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imagesArray.length; i++) {
      data.append("image", imagesArray[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("product-img/add", data, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
      j.current++;
    }
  }
  // Handle image delete
  async function deleteImage(img, id) {
    const findId = ids.current[id];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));

      ids.current = ids.current.filter((id) => id !== findId);
      --j.current;
    } catch (err) {
      console.log(err);
    }
  }
  // Handle  delete image from server
  async function deleteImageFromServer(id) {
    setImagesFromServer((prev) => prev.filter((image) => image.id !== id));
    setIdsFromServer((prev) => [...prev, id]);
  }

  // Mapping

  const categorisShow = categories.map((category, index) => (
    <option key={index} value={category.id}>
      {category.title}
    </option>
  ));

  const imagesShow = images.map((image, index) => (
    <div key={index} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2  mb-3">
          <img src={URL.createObjectURL(image)} alt="" width={"80px"}></img>
          <div>
            <p className="mb-1">{image.name}</p>
            <p>{(image.size / (1024 * 1024)).toFixed(2)}MB</p>
          </div>
        </div>
        <Button variant="danger" onClick={() => deleteImage(image, index)}>
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          className="inner-progress"
          ref={(ele) => progress.current.push(ele)}
        ></span>
      </div>
    </div>
  ));
  const showImagesFromServer = imagesFromServer.map((img, index) => (
    <div key={index} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2  mb-3">
          <img src={img.image} alt="" width={"80px"}></img>
        </div>
        <Button variant="danger" onClick={() => deleteImageFromServer(img.id)}>
          Delete
        </Button>
      </div>
    </div>
  ));

  useEffect(() => {
    Axios.get(`/${CATEGO}`)
      .then((data) => setCategories(data.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      for (let i = 0; i < idsFromServer.length; i++) {
        await Axios.delete(`product-img/${idsFromServer[i]}`);
      }
      const res = await Axios.post(`/${PRODUDT}/${EDIT}/${id}`, form);
      console.log(res.data);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 mx-2 p-3">
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleEdit}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category:</Form.Label>
          <Form.Select
            name="category"
            value={form.category}
            onChange={handleFormChange}
            ref={focus}
          >
            <option disabled>Select Category</option>
            {categorisShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title..."
            name="title"
            value={form.title}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="desc">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description..."
            name="description"
            value={form.description}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Price..."
            name="price"
            value={form.price}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Discount..."
            name="discount"
            value={form.discount}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="about">
          <Form.Label>About:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter About..."
            name="About"
            value={form.About}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images:</Form.Label>
          <Form.Control
            hidden
            multiple
            type="file"
            onChange={handleImagesChange}
            ref={openImage}
          />
        </Form.Group>
        <div
          onClick={handleImage}
          className="d-flex justify-content-center align-items-center flex-column gap-2 py-3 rounded mb-3"
          style={{
            border: "2px dashed #0086fe",
            cursor: "pointer",
          }}
        >
          <img
            src={require("../../../images/upload.png")}
            alt="Upload Here"
            width={"90px"}
          />
          <p className="fw-bold mb-0">Upload Images</p>
        </div>
        <button
          disabled={form.title.length > 1 ? false : true}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
      <div>{imagesShow}</div>
      <div>{showImagesFromServer}</div>
    </div>
  );
}
