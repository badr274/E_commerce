import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { WindowResize } from "../../Context/WindowContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { links } from "./NavLink";

export default function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const windowResize = useContext(WindowResize);
  const windowSize = windowResize.windowSize;
  const [role, setRole] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setRole(data.data.role))
      .catch((err) => nav("/login", { replace: true }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.3)",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar box-shadow pt-3"
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen
            ? windowSize < "768"
              ? "fit-content"
              : "240px"
            : "fit-content",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}
      >
        {links.map(
          (link, key) =>
            link.role.includes(role) && (
              <NavLink
                key={key}
                to={link.path}
                className="d-flex align-items-center gap-2 side-bar-link"
              >
                <FontAwesomeIcon icon={link.icon} />
                <span
                  style={{
                    display: isOpen
                      ? windowSize < "768"
                        ? "none"
                        : "block"
                      : "none",
                  }}
                >
                  {link.name}
                </span>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}
