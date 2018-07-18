import React from "react";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "reactstrap";
import { organizeData } from "./GCalData";


require('../css/fullstack.css');
var $ = require('jquery');


class Header extends React.Component {
    renderColumn() {
        let header = [];
        this.props.data.forEach(function(e) {
            header.push(
                <th key={e} colSpan={2} >{e}</th>
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

    //google login
    login() {
        $.get(window.location.href + 'authorize', (data) => {
            if (typeof data === 'object') {
                console.log(data);
            } else {
                window.open(data)
            }
        })
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
            <div>
                <Table size="sm" bordered>
                    <thead>
                    <tr>
                        <Header
                            data={this.state.title}
                        />
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.events}
                    </tbody>
                </Table>
            </div>
        )
    }
}


// ========================================



