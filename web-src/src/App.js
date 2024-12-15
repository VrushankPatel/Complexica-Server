import WelcomeView from "./views/welcomeView";
import AboutView from "./views/aboutView";
import ApiView from "./views/apiView";
import CFooter from "./components/CFooter";

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import CNavBar from "./components/CNavBar";
import {
  React,
  useEffect
} from 'react';
import util from "./utilities/Util";

function App() {
  useEffect(() => {
    document.title = `Complexica : ${util.getUrlEndPoint()}`
  })
  return (
    < Router >
      <div className="App" >
        <CNavBar page="home" />
        <Route exact path="/ui" >
          <WelcomeView />
        </Route>
        <Route path="/ui/about" >
          <AboutView />
        </Route>
        <Route path="/ui/api" >
          <ApiView />
        </Route>
        <CFooter />
      </div>
    </Router>
  );
}

export default App;