import React, { Component } from "react";
import facade from "./apiFacade";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Route,
  NavLink,
  Switch,
  Link,
  useRouteMatch,
  useParams,
  Prompt
} from "react-router-dom";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  login = evt => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };
  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.login} onChange={this.onChange}>
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          <button>Login</button>
        </form>
      </div>
    );
  }
}
const Header = ({ isLoggedIn }) => {
  if (facade.getRole() === "admin") {
    return (
      <ul className="header">
        <li>
          <NavLink activeClassName="active" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/people">
            People
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/company">
            Company
          </NavLink>
        </li>

        <li>
          <NavLink activeClassName="active" to="/log-out">
            Log out
          </NavLink>
        </li>
      </ul>
    );
  }
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/home">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink activeClassName="active" to="/company">
          Company
        </NavLink>
      </li>

      <li>
        <NavLink activeClassName="active" to="/log-out">
          Log out
        </NavLink>
      </li>
    </ul>
  );
};
const Content = props => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/products">
        <Products />
      </Route>
      <Route path="/company">
        <Company />
      </Route>

      <Route path="/">
        <App />
      </Route>

      <Route path="/log-out">
        <Logout />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};
const LoggedIn1 = () => {
  return (
    <div>
      <Router>
        <Header />
      </Router>
    </div>
  );
};

class LoggedIn extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
        </Router>
      </div>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  };
  login = (user, pass) => {
    facade.login(user, pass).then(res => this.setState({ loggedIn: true }));
  };

  render() {
    return (
      <div>
        {!this.state.loggedIn ? (
          <LogIn login={this.login} />
        ) : (
          <div>
            <LoggedIn1 />
            <button onClick={this.logout}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }
  componentDidMount() {
    facade.fetchData().then(res => this.setState({ dataFromServer: res.msg }));
    facade.fetchPeople().then(res => console.log(res));
  }
  render() {
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
      </div>
    );
  }
}
const NoMatch = () => <div>No match for path</div>;
const Products = () => (
  <div>
    <h2>Products</h2>
  </div>
);
const Company = () => (
  <div>
    <h2>Company</h2>
  </div>
);
const Logout = () => {};
export default App;
