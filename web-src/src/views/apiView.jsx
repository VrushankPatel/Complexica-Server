import { Component } from "react";
import ApiBody from "../components/ApiBody";

class ApiView extends Component {
  state = {};
  componentDidMount() {
    document.title = "Colorizer : API & Tools";
  }
  render() {
    return (

      <ApiBody />

    );
  }
}

export default ApiView;
