import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AuthBar from './AuthBar';
import NavBrand from './NavBrand';

const Header = props => {
    const { userData } = useContext(UserContext);
    const { location } = props;

    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <NavBrand />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" activeKey={location.pathname}>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/search">Search</Nav.Link>
                    <Nav.Link href="/posts">Posts</Nav.Link>
                    {userData.user ? (
                        <Nav.Link href="/notification">Notification</Nav.Link>
                    ) : (
                        ''
                    )}
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Nav className="ml-auto">
                <AuthBar />
            </Nav>
        </Navbar>
    );
};

export default Header;
