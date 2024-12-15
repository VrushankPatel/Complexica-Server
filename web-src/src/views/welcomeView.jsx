import { Component } from "react";

import Body from "../components/CBody";

class WelcomeView extends Component {
  componentDidMount() {
    document.title = "Colorizer : Home";
  }
  render() {
    return (
      <div>
        <Body />
      </div>
    );
  }
}

export default WelcomeView;
