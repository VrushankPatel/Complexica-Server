import { Component } from "react";
import CUploadPicture from "./CUploadPicture";
import animGif from "../assets/gifs/colorized.gif";
import { Container, Row, Col, Image } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import Util from "../utilities/Util"
class CBody extends Component {
  state = { showToast: false, showDurationToast: false, serverTime: 0, clientTime: 0 }
  render() {
    const updateImage = (encodedBase64) => {
      let fileName = localStorage.getItem("complFileName");
      fileName = fileName ? fileName : "compconv.png";
      this.imageElement.src = `data:image/png;base64, ${encodedBase64}`;
      localStorage.setItem("downloadMetaData", JSON.stringify({ contentType: 'png', data: encodedBase64, fileName: fileName }));

    }
    const downloadImage = (metaData) => {
      metaData = JSON.parse(metaData);
      const { contentType, data, fileName } = metaData;
      Util.downloadBase64File(contentType, data, fileName);
    }
    const showFormatError = () => this.setState({ showToast: true });
    const hideFormatError = () => this.setState({ showToast: false });
    const showDuration = (serverTime, clientTime) => {
      this.setState({ serverTime: serverTime, clientTime: clientTime, showDurationToast: true });
    };
    const hideDuration = () => this.setState({ showDurationToast: false });
    return (
      <Container>
        <Toast
          onClose={hideFormatError}
          show={this.state.showToast}
          delay={3000}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}
          autohide
        >
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto text-danger">Invalid Picture Format</strong>
            <small></small>
          </Toast.Header>
          <Toast.Body>Only jpg, jpeg and png formats are supported.</Toast.Body>
        </Toast>
        <Toast
          onClose={hideDuration}
          show={this.state.showDurationToast}
          delay={5000}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}
          autohide
        >
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto text-info">Time Duration</strong>
            <small></small>
          </Toast.Header>
          <Toast.Body>
            <p style={{ float: "left" }}>Response time : {this.state.clientTime} Second(s)</p><br />
            <p style={{ float: "left" }}>Image converted : {this.state.serverTime} Second(s)</p>
          </Toast.Body>
        </Toast>
        <Row className="justify-content-center">
          <Col
            lg={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col
              style={{
                textAlign: "left",
                fontFamily: "Arial",
              }}
            >
              <h2
                className="h2"
                style={{
                  fontSize: "xxx-large",
                  fontWeight: "900",
                  color: "#363634",
                }}
              >
                Colorize your b/w photo
              </h2>
              <h2>100% Automatic and Free</h2>
              <Image
                ref={imageElement => this.imageElement = imageElement}
                src={animGif} width={800}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "20px",
                  boxShadow:
                    "0 2px 3px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20)",
                }}
                className="w-5" fluid />
            </Col>
          </Col>
          <Col
            lg={4}
            className="pt-5"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CUploadPicture showToast={showFormatError} showDurationToast={showDuration} updateImage={updateImage} downloadImage={downloadImage} />
          </Col>
        </Row>
      </Container >
    );
  }
}

export default CBody;
