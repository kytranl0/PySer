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
        let arr = organizeData(Object.entries(this.props.data));
        return getRows(arr);
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

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        getEvents((data) => {
            this.setState({data});
        })
    }

    test() {
        $.get(window.location.href + 'authorize', (data) => {
            console.log(data)
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.test}>Test</button>
                <Table size="sm" bordered>
                    <thead>
                    <tr>
                        <Header
                            data={this.state.data}
                        />
                    </tr>
                    </thead>
                    <tbody>
                    <HeaderBody
                        data={this.state.data}
                    />
                    </tbody>
                </Table>
            </div>
        )
    }
}


// ========================================




