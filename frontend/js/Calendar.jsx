import React from "react";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { organizeData } from "./GCalData";


require('../css/fullstack.css');
var $ = require('jquery');


class GetDate extends React.Component {
    renderDate() {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let header = [];
        this.props.data.forEach(function(e) {
            let date = new Date(e).getDay();
            header.push(
                <th className="table-info text-center" key={days[date]} colSpan={3}>{days[date]}</th>
            )
        });
        return header;
    }
    render() {
        return (
            this.renderDate()
        )
    }
}


class Header extends React.Component {
    renderTitle() {
        if (this.props.data.length !== 0 || this.props.data === undefined) {
            return (
                this.props.data.map(item =>
                    <th className="table-info text-center" key={item} colSpan={3}>
                        <button onClick={this.props.onClick}>{item}</button>
                    </th>
                )
            )
        } else {
            return [];
        }
    }

    render() {
       return (
           this.renderTitle()
       )
    }
}

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            title: [],
            events: [],
            test: []
        }
    }
    getCalendarId() {
        $.get('http://localhost:8080/getCalendarId').then(data => {
            console.log(data);
        })
    }

    handleClick(i) {
        this.setState({
            test: new Date()
        })
    }
    // google get data
    componentDidMount() {
        $.get('http://localhost:8080/getData').then(data => {this.handleChange(data)});
    }

    handleChange(data) {
        this.setState({title: Object.keys(data)});
        this.setState({events: organizeData(data)});
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-outline-primary btn-lg" onClick={this.hello}>Google</button>
                <table className="table">
                    <thead>
                    <tr>
                        <Header
                            onClick={(i) => this.handleClick(i)}
                            data={this.state.title}
                        />

                    </tr>
                    <tr>
                        <GetDate
                            data={this.state.title}
                        />
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.events}
                    </tbody>
                </table>
            </div>
        )
    }
}


// ========================================



