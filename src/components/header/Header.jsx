import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { LogoutFunction, auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import { onAuthStateChanged } from "firebase/auth";

const logo = (
  <div className="logo">
    <Link to="/">
      <h2>
        e<span>shop</span>.
      </h2>
    </Link>
  </div>
);

// const cart = (
//   <span className="cart">
//     <NavLink
//       className={({ isActive }) => (isActive ? "active" : "")}
//       to="/cart"
//     >
//       Cart <FaShoppingCart size={20} />
//       <p>0</p>
//     </NavLink>
//   </span>
// );

const Header = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false);


  const toggleShowMenu = () => setShowMenu(!showMenu);

  const handleHideMenu = () => setShowMenu(false);

  const LogoutFunctionHandler = () => {
    toast.promise(LogoutFunction(), {
      pending: "Loading...",
      success: "Logout successfully!",
      error: "Error retrieving data :(",
    });
    dispatch(REMOVE_ACTIVE_USER())
    navigate("/login");
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        dispatch(SET_ACTIVE_USER(currentUser));

      });
      return () => {
        unSubscribe();
      };
    }, []);

  return (
    <header>
      <div className="header">
        {logo}
        <nav className={showMenu ? "show-nav" : "hide-nav"}>
          <div
            onClick={handleHideMenu}
            className={
              showMenu ? "nav-wrapper show-nav-wrapper" : "nav-wrapper"
            }
          ></div>
          <ul onClick={handleHideMenu}>
            {showMenu && (
              <li>
                <Link to="/">{logo}</Link>
              </li>
            )}
            {/* <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/"
              >
                Home
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/contact"
              >
                Contact Us
              </NavLink>
            </li> */}
          </ul>
          <div onClick={handleHideMenu} className="header-right">
            <span className="links">
              {!user?.id ? (
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/login"
                >
                  Login
                </NavLink>
              ) : (
                <>
                  <span className="f-13 cursor-pointer">{user.name}</span>
                  <span
                    className="f-13 cursor-pointer"
                    onClick={LogoutFunctionHandler}
                  >
                    Logout
                  </span>
                </>
              )}
              {!user?.id && (
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/register"
                >
                  Register
                </NavLink>
              )}
              {/* <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/order-history"
              >
                My orders
              </NavLink> */}
            </span>
            {/* {cart} */}
          </div>
        </nav>

        <div className="menu-icon">
          <HiOutlineMenuAlt3 size={28} onClick={toggleShowMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
