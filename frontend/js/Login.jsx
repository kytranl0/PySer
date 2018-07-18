import React from 'react';

var $ = require('jquery');


export default class Login extends React.Component{
    login() {
        $.get(window.location.href + 'authorize', (data) => {
            if (typeof data === 'object') {
                console.log(data);
            } else {
                window.location.replace(data);
            }

        })
    }
// <div>
// <button type="button" className="btn btn-primary btn-lg btn-block">
// Google Calendar
// </button>
// <button type="button" className="btn btn-outline-secondary btn-lg btn-block" onClick={this.login}>
// Google Login
// </button>
// </div>
    render() {
        return (

        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="font-weight-bold text-info display-1">Google Calendar</h1>
                <hr class="my-4"></hr>
                <p className="lead">Welcome to my web-application! Please click the button below me to sign in :D</p>
                <button type="button" className="btn btn-outline-primary btn-lg btn-block" onClick={this.login}>
                Google Login
                </button>
            </div>
        </div>
        )
    }
}
