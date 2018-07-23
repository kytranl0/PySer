import React from 'react';

var $ = require('jquery');


export default class Login extends React.Component{
    login() {
        $.get(window.location.href + 'authorize', (data) => {
                window.location.replace(data);
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
            </div>
        </div>
        )
    }
}
