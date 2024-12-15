import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class About extends Component {
  render() {
    const txtStyle = {
      fontSize: "xxx-large",
      fontWeight: "90",
      color: "#363634",
      fontFamily: "Exo",
    };
    const subTxtStyle = {
      fontSize: "xx-large",
      fontWeight: "90",
      color: "#363634",
      fontFamily: "Exo",
    };
    const colStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }

    return (
      <Container>
        <Row className="justify-content-center">
          <Col
            lg={12}
            style={colStyle}
          >
            <Row>
              <h3
                className="pt-5"
                style={txtStyle}
              >
                Complexica v1.0.0
              </h3>
            </Row>
          </Col>
          <Col
            lg={12}
            style={colStyle}
          >
            <Row>
              <h3 style={subTxtStyle}>
                Developer : Vrushank Patel
              </h3>
            </Row>
          </Col>
          {/* <Col
            lg={4}
            className="pt-5"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CUploadPicture />
          </Col> */}
        </Row>
      </Container >
    );
  }
}

export default About;
