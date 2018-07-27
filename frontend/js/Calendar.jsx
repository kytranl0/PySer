import React from "react";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { organizeData } from "./GCalData";


require('../css/fullstack.css');
var $ = require('jquery');


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
                        <button onClick={() => this.props.onClick(item)}>{item}</button>
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
                    this.setState({events: organizeData(data)});
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
                        {this.state.events}
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
                {this.state.events}
                </tbody>
            </table>
            </div>
            )
        }
    }
}


// ========================================

