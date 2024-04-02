import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { PaginatedItems } from "../Dashboard/Padination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import TransformDate from "../../helpers/TransformDate";
// import { Axios } from "../../Api/Axios";

export default function TableComponent(props) {
  const currentUser = props.currentUser || {
    name: "",
  };

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filterDataBySearch, setFilterDataBySearch] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filterDataByDate = props.data.filter(
    (item) => TransformDate(item.created_at) === date
  );
  console.log(filterDataByDate);

  const filterSearchByDate = filterDataBySearch.filter(
    (item) => TransformDate(item.created_at) === date
  );

  async function handleSearch() {
    try {
      const res = await Axios.post(
        `/${props.searchLink}/search?title=${search}`
      );
      setFilterDataBySearch(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      search.length > 0 ? handleSearch() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);

  const showWhichData = date
    ? search.length > 0
      ? filterSearchByDate
      : filterDataByDate
    : search.length > 0
    ? filterDataBySearch
    : props.data;

  // Header Show
  const headerShow = props.headers.map((item, index) => (
    <th key={index}>{item.name}</th>
  ));
  // Data Show
  const dataShow = showWhichData.map((item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      {props.headers.map((item2, index2) => (
        <td key={index2}>
          {item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(item[item2.key])
          ) : item2.key === "images" ? (
            <div className="d-flex justify-content-start align-items-center flex-wrap gap-1 ">
              {item[item2.key].map((img, index3) => (
                <img key={index3} width={"50px"} src={img.image} alt="" />
              ))}
            </div>
          ) : item2.key === "image" ? (
            <img width={"35px"} src={item[item2.key]} alt="" />
          ) : item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "2001" ? (
            "user"
          ) : item[item2.key] === "1996" ? (
            "writter"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.name && "(You)"}
        </td>
      ))}
      <td className="d-flex  align-items-center gap-2">
        <Link to={`${item.id}`}>
          <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
        </Link>
        {item.name !== currentUser.name && (
          <FontAwesomeIcon
            onClick={() => props.delete(item.id)}
            fontSize={"19px"}
            color="red"
            icon={faTrash}
            cursor={"pointer"}
          />
        )}
      </td>
    </tr>
  ));
  return (
    <>
      <Form.Control
        type="search"
        className="mb-3"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
          setSearchLoading(true);
        }}
      ></Form.Control>
      <Form.Control
        type="date"
        className="mb-3"
        placeholder="Search"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      ></Form.Control>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {props.loading ? (
            <tr>
              <td colSpan={12} className="text-center">
                "Loading..."
              </td>
            </tr>
          ) : searchLoading ? (
            <tr>
              <td colSpan={12} className="text-center">
                "Searching..."
              </td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select onChange={(e) => props.setLimit(e.target.value)}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
      </div>
      <PaginatedItems
        itemsPerPage={props.limit}
        data={props.data}
        page={props.page}
        setPage={props.setPage}
        total={props.total}
      />
    </>
  );
}
