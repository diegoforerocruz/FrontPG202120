import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GroupManage from "./components/groupManage";
import VariableManage from "./components/variableManage";
import TemasManage from "./components/TemasManage";
import Inicio from "./components/inicio";
import "./assets/index.less";


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">FC</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/groupManage">
                    Gestión de grupos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/variableManage">
                    Gestión de variables
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route exact path="/groupManage" component={GroupManage} />
        <Route exact path="/variableManage" component={VariableManage} />
        <Route exact path="/TemasManage" component={TemasManage} />
      </Switch>
    </Router>
  );
}

export default App;
