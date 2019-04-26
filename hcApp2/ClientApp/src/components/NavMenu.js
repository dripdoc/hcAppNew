import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
    displayName = NavMenu.name

    render() {
        return (
            <Navbar inverse fixedTop fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>hcApp2</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={'/'} exact>
                            <NavItem>
                                <Glyphicon glyph='home' /> Home
              </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/searchnames'}>
                            <NavItem>
                                <Glyphicon glyph='filter' /> Search Persons
              </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/AddPerson'}>
                            <NavItem>
                                <Glyphicon glyph='plus' /> Add person
              </NavItem>
                        </LinkContainer>

                        <LinkContainer to={'/fetchpersons'}>
                            <NavItem>
                                <Glyphicon glyph='th-list' /> Fetch Persons
              </NavItem>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
