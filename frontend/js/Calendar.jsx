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
    renderColumn() {
        let header = [];
        this.props.data.forEach(function(e) {
            let date = new Date(e).getDay();
            console.log(date);
            header.push(
                <th className="table-danger" key={e} colSpan={3}><h1 className="text-center font-weight-bold">{e}</h1></th>
            )

        });
        return header;
    }

    render() {
        return (
            this.renderColumn()
        )
    }
}

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: [],
            events: []
        }
    }


    //google get data
    componentDidMount() {
        $.get('http://localhost:8080/getData').then(data => {
            console.log(data);
            this.setState({events: organizeData(data)});
            this.setState({title: Object.keys(data)});

        });
    }

    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <Header
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



