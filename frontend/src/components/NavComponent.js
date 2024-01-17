import {NavLink, Container, ListGroup, ListGroupItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from "react";


function NavComponent({userid}) {
    const [isActive, setIsActive] = useState(false);

    const handleToggleActive = () => {
      setIsActive(!isActive);
    };
  return (
    <Container className="border border-3 rounded mt-3 p-3 ">
        <ListGroup>

        <ListGroup.Item as={Link} to={`/home/${userid}`} className={`text-muted p-3 ${window.location.pathname === `/home/${userid}` ? 'bg-light' : ''}`} action>
        <i className="bi bi-house-fill"></i> Home
      </ListGroup.Item>
      <ListGroup.Item as={Link} to={`/wallets/${userid}`} className={`text-muted p-3 ${window.location.pathname === `/wallets/${userid}` ? 'bg-light' : ''}`} action>
        <i className="bi bi-wallet-fill"></i> Wallets
      </ListGroup.Item>
      <ListGroup.Item as={Link} to={`/buckets/${userid}`} className={`text-muted p-3 ${window.location.pathname === `/buckets/${userid}` ? 'bg-light' : ''}`} action>
        <i className="bi bi-bookmarks-fill"></i> Buckets
      </ListGroup.Item>
      <ListGroup.Item as={Link} to={`/transactions/${userid}`} className={`text-muted p-3 ${window.location.pathname === `/transactions/${userid}` ? 'bg-light' : ''}`} action>
        <i className="bi bi-currency-exchange"></i> Transactions
      </ListGroup.Item>
      <ListGroup.Item as={Link} to={`/profile/${userid}`} className={`text-muted p-3 ${window.location.pathname === `/profile/${userid}` ? 'bg-light' : ''}`} action>
        <i className="bi bi-person-fill"></i> Profile
      </ListGroup.Item>




          {/* <NavLink to={`/dashboard/${userid}`}  className={`list-group-item text-muted p-3 ${isActive ? 'bg-light' : ''}`} onClick={handleToggleActive} >
            <i className="bi bi-house-fill"></i> Home
          </NavLink>

          <NavLink to={`/wallets/${userid}`}  className={`list-group-item text-muted p-3 ${isActive ? 'bg-light' : ''}`} onClick={handleToggleActive}  >
            <i className="bi bi-wallet-fill"></i> Wallets
          </NavLink>

          <NavLink to="/buckets" className="list-group-item text-muted p-3" >
            <i className="bi bi-bookmarks-fill"></i> Buckets
          </NavLink>

          <NavLink to="/transactions" className="list-group-item text-muted p-3" >
            <i className="bi bi-currency-exchange"></i> Transactions
          </NavLink>

          <NavLink to="/profile" className="list-group-item text-muted p-3" >
            <i className="bi bi-person-fill"></i> Profile
          </NavLink> */}
        </ListGroup>       

    </Container>
  );
}

export default NavComponent;