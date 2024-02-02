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

    /** Logged-out appearance for navbar */
    function loggedOutNavbar() {

    }

    /** Logged-in appearance for navbar */
    function loggedInNavbar() {

    }

    return (
        <div className="NavBar">
            <NavBar>
                <NavLink exact to="/" className="navbar-brand">
                    Colors
                </NavLink>

                <Nav>
                    {currentUser ? loggedInNavbar() : loggedOutNavbar()}
                </Nav>
            </NavBar>
        </div>
    )
}


export default NavBar;
