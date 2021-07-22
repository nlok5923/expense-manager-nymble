import "./AdminNavigation.scss"
import { Link, useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import useToken from "../../Utils/customHooks/token"

const Navbar = () => {
    
    const history = useHistory();
    const { removeToken } = useToken();
  
    const logoutUser = () => {
      removeToken();
      history.push('/');
    }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"> Admin </Link>
      </div>
      <ul className="navLink">
        <li>
          <Link to="/admin/dashboard">
            <Button basic color="green">
              Dashboard
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/">
            <Button basic color="red" onClick={() => logoutUser()}>
                Logout
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
