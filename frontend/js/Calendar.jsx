import React from "react";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getEvents } from "./gcal";
import { Table } from "reactstrap";
import { organizeData, getRows } from "./GCalData";


require('../css/fullstack.css');
var $ = require('jquery');



class HeaderBody extends React.Component {
    renderRow() {
        // let arr = organizeData(Object.entries(this.props.data));
        // return getRows(arr);
        return [];
    }

    render() {
        return (
            this.renderRow()
        )
    }
}

class Header extends React.Component {
    renderColumn() {
        let header = [];
        let key = Object.keys(this.props.data);
        key.forEach(function(e) {
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
            organizeData(data);
            this.setState({title:data});

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
                    <HeaderBody
                        data={this.state}
                    />
                    </tbody>
                </Table>
            </div>
        )
    }
}


// ========================================



