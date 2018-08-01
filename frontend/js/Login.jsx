import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

var $ = require('jquery');

const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Calendar</Link>
                </li>
                <li>
                    <Link to="/matrix">Matrix</Link>
                </li>
                <li>
                    <Link to="/topics">Topics</Link>
                </li>
            </ul>

            <hr />

            <Route exact path="/" component={Login} />
            <Route path="/matrix" component={Matrix}/>
            <Route path="/topics" component={Topics} />
        </div>
    </Router>
);

class Matrix extends React.Component {
    render() {
        return (
        <table>
            <tr>
                <th>Hi</th>
            </tr>
        </table>
        )
    }
}

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route
            exact
            path={match.url}
            render={() => <h3>Please select a topic.</h3>}
        />
    </div>
);

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);



class Login extends React.Component{
    login() {
        $.get(window.location.href + 'authorize', (data) => {
            window.location.replace(data);
        })
    }
    revoke() {
        $.get(window.location.href + 'revoke', (data) => {
            console.log(data)
        })
    }
    clear() {
        $.get(window.location.href+ 'clear', (data) => {
            console.log(data)
        })
    }
    render() {
        return (

            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="font-weight-bold text-info display-1">Google Calendar</h1>
                    <hr className="my-4"></hr>
                    <p className="lead">Welcome to my web-application! Please click the button below me to sign in :D</p>
                    <button type="button" className="btn btn-outline-primary btn-lg btn-block" onClick={this.login}>
                        Google Login
                    </button>
                    <button type="button" className="btn btn-outline-primary btn-lg btn-block" onClick={this.revoke}>
                        Revoke Login
                    </button>
                    <button type="button" className="btn btn-outline-primary btn-lg btn-block" onClick={this.clear}>
                        Clear Credential
                    </button>
                </div>
            </div>
        )
    }
}

export default BasicExample;

