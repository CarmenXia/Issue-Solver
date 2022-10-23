import {
  faBars,
  faTicket,
  faBug,
  faHome,
  faUser,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { showMe } from "../../dataHandling/userHandling";

import "./Navbar.css";

//Set navbar item data
const NavItem = [
  {
    display: "Home",
    icon: <FontAwesomeIcon icon={faHome} />,
    path: "/",
    name: "nav-text",
  },
  {
    display: "Tickets",
    icon: <FontAwesomeIcon icon={faTicket} />,
    path: "/tickets",
    name: "nav-text",
  },
  {
    display: "Issues",
    icon: <FontAwesomeIcon icon={faBug} />,
    path: "/issues",
    name: "nav-text",
  },

  {
    display: "My Page",
    icon: <FontAwesomeIcon icon={faUser} />,
    path: "/mypage",
    name: "nav-text",
  },
];

//If not logIn, show login page
const Navbar = () => {
  const [sidebar, setSidebar] = useState("false");
  const [myName, setMyName] = useState("");
  const sidebarToggle = () => {
    setSidebar(!sidebar);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setMyName("");
    //window.location.reload();
  };

  useEffect(() => {
    showMe().then((data) => {
      setMyName(data.username);
    });
  }, []);

  return (
    <>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FontAwesomeIcon icon={faBars} onClick={sidebarToggle} />
        </Link>
        {myName ? (
          <a className='nav-username'>Welcom {myName}!</a>
        ) : (
          <Link to='/login' className='nav-username'>
            Login to start!
          </Link>
        )}
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className='nav-menu-items' onClick={sidebarToggle}>
          <li className='navbar-close'>
            <a className='menu-bars'>Issue Slover</a>
          </li>
          {NavItem.map((item, index) => {
            return (
              <li key={index} className={item.name}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.display}</span>
                </Link>
              </li>
            );
          })}
          <li className='nav-text'>
            <Link to='/login'>
              <FontAwesomeIcon icon={faSignOut} />
              <span onClick={handleLogout}>Log Out</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
