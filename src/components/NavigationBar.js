import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Styles = styled.div`
  .nav {
    padding-top: 20px;
  }
`;

export default function NavigationBar() {
  return (
    <Styles>
      <Nav variant="pills" className="justify-content-center" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link as={Link} to="/" eventKey="link-0">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/sets" eventKey="link-1">
            Sets
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Styles>
  );
}
