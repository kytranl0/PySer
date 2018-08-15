import React from 'react'
var $ = require('jquery');

export default class SortedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange() {

    }
    handleSubmit() {

    }
    render() {
        return (
            <h1>test</h1>
        )
    }
}
