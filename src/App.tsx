import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import "./App.css";
import { Link, useNavigate } from "react-router";
import { Characters } from "./components/pages/characters";

function App() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar fluid rounded>
        <NavbarBrand as={Link} href="https://flowbite-react.com">
          <img
            src="/rick-morty.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Rick & morty Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Rick & Morty
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="#" active>
            Home
          </NavbarLink>
          <NavbarLink as={Link} onClick={() => navigate("/favorites")}>
            Favorites
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <Characters />
    </>
  );
}

export default App;
