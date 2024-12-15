import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "../App.css";

class ApiAndTools extends Component {
  state = { iconColor: "lightGrey" };

  render() {
    const uploadPictureBoxStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "15px",
      boxShadow:
        "0 2px 3px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20)",
    };

    return (
      <div>
        <div>
          <Card style={uploadPictureBoxStyle}>
            <Card.Header style={{ width: "100%" }}>
              Complexica Open API
            </Card.Header>
            <Card.Body>
              <Card.Title className="pl-4" style={{ textJustify: 'left', textAlign: 'left' }}>
                <code>
                  curl --location --request POST <br /> 'api-complexica.herokuapp.com/complexica/upload_image' <br></br>
                  --header 'Content-Type: image/png' <br />
                  --form 'image=@"<i>{"{Image Path}"}</i>'

                </code>
              </Card.Title>
            </Card.Body>
          </Card >
        </div>
        <div className="pt-4">
          <Card style={uploadPictureBoxStyle}>
            <Card.Header style={{ width: "100%" }}>
              Photoshop Plugin
            </Card.Header>
            <Card.Body>
              <Card.Title>
                Coming Soon
              </Card.Title>
            </Card.Body>
          </Card >
        </div>
      </div>
    );
  }
}

export default ApiAndTools;
