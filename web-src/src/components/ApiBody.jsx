import { Component } from "react";
import ApiAndTools from "./ApiAndTools";
import { Container, Row, Col } from "react-bootstrap";

class ApiBody extends Component {
  state = { showToast: false }
  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col
            lg={7}
            md={10}
            sm={12}
            xs={12}
            className="pt-5"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ApiAndTools />
          </Col>
        </Row>
      </Container >
    );
  }
}

export default ApiBody;
