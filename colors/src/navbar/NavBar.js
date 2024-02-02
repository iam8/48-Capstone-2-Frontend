import React, {useContext} from "react";
import {NavLink, Link} from "react-router-dom";
import {Navbar, Nav, NavItem} from "reactstrap";

import UserContext from "../auth/UserContext";


/**
 * Render a site-wide navigation bar at the top of the screen.
 *  - When user is logged in: displays links to main pages of the site.
 *  - When no user is logged in: displays links to only login and signup pages.
 *
 * Props:
 *  - logout(): log out the current user
 */
function NavBar({logout}) {
    const {currentUser} = useContext(UserContext);
    console.log("Current user:", currentUser);

    /** Logged-out appearance for navbar */
    function loggedOutNavbar() {
        return <>
            <NavItem>
                <NavLink to="/signup">Sign up</NavLink>
            </NavItem>

            <NavItem>
                <NavLink to="/login">Log in</NavLink>
            </NavItem>
        </>
    }

    /** Logged-in appearance for navbar */
    function loggedInNavbar() {
        return <>
            <NavItem>
                <NavLink to="/collections">My collections</NavLink>
            </NavItem>

            <NavItem>
                <NavLink to="/profile">Profile ({currentUser.username})</NavLink>
            </NavItem>

            <NavItem>
                <NavLink to="/" onClick={logout}>Log out</NavLink>
            </NavItem>
        </>
    }

    return (
        <>
            <div className="NavBar">
                <Navbar>
                    <NavLink exact to="/" className="navbar-brand">
                        Home
                    </NavLink>

                    <Nav>
                        <NavItem>
                            <NavLink to="/colors">Color search</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink to="/schemes">Scheme search</NavLink>
                        </NavItem>

                        {currentUser ? loggedInNavbar() : loggedOutNavbar()}
                    </Nav>
                </Navbar>
            </div>
        </>
    );
}


export default NavBar;
