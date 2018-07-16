import React from 'react';

var $ = require('jquery');


export default class Login extends React.Component{
    login() {
        $.get(window.location.href + 'authorize', (data) => {
            if (typeof data === 'object') {
                console.log(data);
            } else {
                window.open(data)
            }
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.login}>Google Login</button>
            </div>
        )
    }
}
