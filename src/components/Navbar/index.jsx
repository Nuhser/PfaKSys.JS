import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { withTranslation } from "react-i18next";

import "./style.css"

class PfaksysNavbar extends React.Component {
    render() {
        const { t } = this.props;

        return (
            <div>
                <Navbar expand="md" fixed="top" sticky="top" className="navbar px-3">
                    <Navbar.Brand href="/">
                        PfaKSys
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">{t('common.home')}</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withTranslation() (PfaksysNavbar);