import React, { useEffect, useState } from "react";
import logoPath from "../assets/buagrouplogo.webp";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import api from "./authService";

function Nav() {
  const location = useLocation();
  //const[(navColor, setNavColor)] = useState("");

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve user details from localStorage and set userDetails state
    const userDetailsFromLocalStorage = JSON.parse(
      localStorage.getItem("user")
    );
    setUserDetails(userDetailsFromLocalStorage);
  }, []);

  const navColor = (nav) => {
    //console.log(location.pathname);
    if (location.pathname === nav || location.pathname.startsWith(`${nav}/`)) {
      return "text-[#efae31]";
    }
    return "text-white";
  };

  const [isSticky, setSticky] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState(null);

    useEffect(() => {
      let lastScrollY = window.pageYOffset;

      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const direction = scrollY > lastScrollY ? "down" : "up";
        if (
          direction !== scrollDirection &&
          (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
        ) {
          setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener("scroll", updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
      };
    }, [scrollDirection]);

    return scrollDirection;
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setSticky(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const scrollDirection = useScrollDirection();

  const navigate = useNavigate();

  const signOut = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    await api.post("api/logout/").then((resp) => {
      if (resp.data.success) {
        navigate("/login");
      }
    });
  };

  return (
    <div
      // className={`${
      //   isSticky ? "fixed top-0  " : "relative"
      // }  p-4 bg-[#b32e3c] h-[5vw] w-screen items-center flex z-10`}
      className={`sticky p-4 bg-[#b32e3c] sm:h-[12vw] h-[5vw] w-full items-center  flex top-0 z-10 ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      }`}
    >
      <Link to={"/"}>
        <img
          src={logoPath}
          className="mx-4 sm:w-[10vw] sm:h-[10vw] w-[4vw] h-[4vw]"
        />
      </Link>
      <nav className=" flex-1">
        <ul className="flex justify-end gap-4 text-lg sm:text-sm">
          <li>
            <NavLink
              to={`/inventory`}
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "#efae31" : "#fff",
                };
              }}
            >
              Inventory
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to={`/retrieved`}
              className={` ${navColor("/retrieved")} hover:text-[#efae31] `}
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "#efae31" : "#fff",
                };
              }}
            >
              Logs
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to={`/add-item`}
              className={` ${navColor("/add-item")} hover:text-[#efae31] `}
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "#efae31" : "#fff",
                };
              }}
            >
              Add item
            </NavLink>
          </li>
          {userDetails !== null && userDetails.is_superuser && (
            <li>
              <a
                href="http://192.168.204.8:8000/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#efae31]"
              >
                Admin
              </a>
            </li>
          )}
          <li>
            <button
              className="bg-inherit items-center text-white hover:text-[#efae31] px-0 py-0 mr-8"
              onClick={signOut}
            >
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
