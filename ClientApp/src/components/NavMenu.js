import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
    displayName = NavMenu.name;

    render() {
        return <Navbar inverse collapseOnSelect className="green-svg" />;
    }
}

/* 
<Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>mattstates</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={'/'} exact>
                            <NavItem>Home</NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/about'}>
                            <NavItem>About</NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/contact'}>
                            <NavItem>Contact</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>*/
