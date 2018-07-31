import React from "react";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {organizeData, RandomInt} from "./GCalData";


require('../css/fullstack.css');
var $ = require('jquery');

class GetBody extends React.Component {
    renderEvents() {
        let data = [];
        if (Object.keys(this.props.data).length === 0) {
            return []
        } else {
            let keys = Object.keys(this.props.data);
            let firstRow = 0;
            let miniRow = 1;
            let secondRow = 2;
            let count = 0;
            let index = 0;
            keys.map(e => {
                count < this.props.data[e].length ? count = this.props.data[e].length : void 0;
            });
            for (let i = 0; i < count / 4; i++) {
                let row = [];
                let testData = [];
                keys.map(e => {
                        if (this.props.data[e][firstRow] && this.props.data[e][miniRow] && this.props.data[e][secondRow]) {
                            index += 1;
                            testData.push(
                                <td className="text-center table-primary" key={index} rowSpan={2}><h4
                                    className="font-weight-light">{this.props.data[e][firstRow]}</h4></td>
                            );
                            index += 1;
                            testData.push(
                                <td className="text-center table-success" key={index}><h5
                                    className="font-weight-light">Start</h5></td>
                            );
                            index += 1;
                            testData.push(
                                <td className="text-center table-success" key={index}><h5
                                    className="font-weight-light">{this.props.data[e][miniRow]}</h5></td>
                            );
                            index += 1;
                            row.push(
                                <td className="text-center table-warning" scope="row" key={index}><h5
                                    className="font-weight-light">End</h5></td>
                            );
                            index += 1;
                            row.push(
                                <td className="text-center table-warning" scope="row" key={index}><h5
                                    className="font-weight-light">{this.props.data[e][secondRow]}</h5></td>
                            );
                        } else {
                            index += 1;
                            testData.push(
                                <td key={index} rowSpan={2}></td>
                            );
                            index += 1;
                            testData.push(
                                <td key={index}></td>
                            );
                            index += 1;
                            testData.push(
                                <td key={index}></td>
                            );
                            index += 1;
                            row.push(
                                <td key={index}></td>
                            );
                            index += 1;
                            row.push(
                                <td key={index}></td>
                            )
                        }
                    }
                );
                data.push(
                    <tr key={RandomInt()}>{testData}</tr>
                );
                data.push(
                    <tr key={RandomInt()}>{row}</tr>
                );
            secondRow += 4;
            miniRow += 4;
            firstRow += 4;
        }
        return data;
        }

    }
    render() {
        return (
            this.renderEvents()
        )
    }
}

class GetDate extends React.Component {
    renderDate() {
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
            return (
                this.props.data.map(item =>
                    <th className="table-info text-center" key={item} colSpan={3}>
                        {item}
                    </th>
                )
            )
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
        this.state = {
            data: [],
            title: [],
            events: [],
            edit: false,
            editParam: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        $.post('http://localhost:8080/sendData', {summary: this.state.editParam}).then(data => {
            console.log(data)
        })
    }


    handleChange(event) {
        this.setState({editParam: event.target.value})
    }

    handleClick(i) {
        this.setState({edit: true});
        this.setState({editParam: i});
    }

    // google get data
    componentDidMount() {
        $.get('http://localhost:8080/getData').then(data => {
                if (data[0] === 'h') {
                    window.open(data)
                } else {
                    this.setState({title: Object.keys(data)});
                    this.setState({events: data});
                }
            }
        );
    }

    render() {
        if (!this.state.edit) {
            return (
                <div className="container">
                    <button type="button" className="btn btn-outline-primary btn-lg" onClick={() => this.componentDidMount()}>Google
                    </button>
                    <table className="table">
                        <thead>
                        <tr>
                            <Header
                                onClick={i => this.handleClick(i)}
                                data={this.state.title}
                                edit={this.state.edit}
                            />

                        </tr>
                        <tr>
                            <GetDate
                                data={this.state.title}
                            />
                        </tr>
                        </thead>
                        <tbody>
                            <GetBody
                            data={this.state.events}
                            />
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div className="container">
                <button type="button" className="btn btn-outline-primary btn-lg" onClick={this.hello}>Google</button>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Date:
                            <input type="text" value={this.state.editParam} onChange={this.handleChange} />
                        </label>
                        <input  value="Submit" type="submit"/>
                    </form>
            <table className="table">
                <thead>
                <tr>
                    <Header
                        onClick={i => this.handleClick(i)}
                        data={this.state.title}
                        edit={this.state.edit}
                    />

                </tr>
                <tr>
                    <GetDate
                        data={this.state.title}
                    />
                </tr>
                </thead>
                <tbody>
                <GetBody
                    data={this.state.events}
                />
                </tbody>
            </table>
            </div>
            )
        }
    }
}


// ========================================

