import { Component } from "react";
import About from "../components/About";

class AboutView extends Component {
  state = {};
  componentDidMount() {
    document.title = "Colorizer : About";
  }
  render() {
    return <About />;
  }
}

export default AboutView;
