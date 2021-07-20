import "./Navigation.scss";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Expense Manager</Link>
      </div>
      <ul className="navLink">
        <li>
          <Link to="/login">
            <Button basic color="green">
              Login
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <Button basic color="green">
              Register
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <Button basic color="green">
                Dashboard
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/expense">
            <Button basic color="green">
                Expense
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/Report">
            <Button basic color="green">
                Report
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
