import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { LOGOUT, USER } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { DropdownButton, DropdownItem } from "react-bootstrap";
import Cookie from "cookie-universal";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const [name, setName] = useState("");
  const nav = useNavigate();
  const cookie = Cookie();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch((err) => console.log(err));
  }, []);

  async function handleLogOut() {
    try {
      await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      nav("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="top-bar box-shadow">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-4">
          <h3>E-Commerce</h3>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
          />
        </div>
        <div>
          <DropdownButton id="dropdown-basic-button" title={name}>
            <DropdownItem onClick={handleLogOut}>Logout</DropdownItem>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
