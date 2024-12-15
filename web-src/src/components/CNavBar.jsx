import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/imgs/logo.png";
import util from "../utilities/Util";

class CNavBar extends Component {
  state = { page: this.props.page };

  getActiveLabelBold = (activeLabel) => {
    return `font-weight-${this.state.page === activeLabel ? "bold" : "normal"}`;
  };

  componentDidMount() {
    this.setState({ page: util.getUrlEndPoint() });
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="md">
          <img src={logo} width="80" height="50" alt="" />
          <Navbar.Brand
            href="/"
            style={{
              fontFamily: "Exo",
              fontSize: "XX-Large",
              color: "#2b2b2a",
            }}
          >
            Complexica
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                className={this.getActiveLabelBold("Home")}
                href="/ui"
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/ui/api"
                className={this.getActiveLabelBold("Api")}
              >
                Tools & API
              </Nav.Link>

              <Nav.Link
                href="/ui/about"
                className={this.getActiveLabelBold("About")}
              >
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default CNavBar;
