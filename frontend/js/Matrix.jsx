import React from "react";
var $ = require('jquery');
import {RandomInt} from "./GCalData";

class GenerateSquare extends React.Component {
    squareA() {
        var row = [];
        var square = [];
        var count = 0;
        while (count < this.props.ACol) {
            row.push(
                <input key={RandomInt()} type="text" size="3" onChange={this.props.onChange.bind(this, count)}/>
            );
            count++
        }
        let i = 0;
        while (i < this.props.ARow) {
            square.push(
                <div>
                    <label>
                        {row}
                    </label>
                </div>
            );
            i++
        }
        return square
    }
    squareB() {
        var row = [];
        var square = [];
        let i = 0;
        while (i < this.props.BCol) {
            row.push(
                <input key={RandomInt()} type="text" size="3" name="B"/>
            );
            i++
        }
        let g = 0;
        while (g < this.props.BRow) {
            square.push(
                <div>
                    <label>
                        {row}
                    </label>
                </div>
            );
            g++
        }
        return square
    }
    render() {
        return (
            <div>
                <form>
                    <h1>A</h1>
                    {this.squareA()}
                    <h1>B</h1>
                    {this.squareB()}
                    <input type="submit" value="Calculate" onClick={() => this.props.onClick()}/>
                </form>
            </div>
        )
    }
}

export default class Matrix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squareA: {
                rows: {},
                columns: {},
            },
            squareB: {
                rows: {},
                columns: {},
            },
            xRow: [],
            xCol: [],
            yRow: [],
            yCol: [],
            edit: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.edit) {
            this.setState({edit: true})
        } else {
            $.get('http://localhost:8080/matrixCal', (data) => {
                    console.log(data)
                }
            )
        }
    }

    handleInput(event, i) {
        console.log(event.target.value);
        console.log(i);
    }
    render() {
        if (!this.state.edit) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        A :
                        <input type="text" value={this.state.xRow} name="xRow" size="4" onChange={this.handleChange}/>
                        <input type="text" value={this.state.xCol} name="xCol" size="4" onChange={this.handleChange}/>
                    </label>
                    <label>
                        B :
                        <input type="text" value={this.state.yRow} name="yRow" size="4" onChange={this.handleChange}/>
                        <input type="text" value={this.state.yCol} name="yCol" size="4" onChange={this.handleChange}/>
                    </label>
                    <input value="Generate" name="generate" type="submit"/>
                </form>
            )
        } else {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            A :
                            <input type="text" value={this.state.xRow} name="xRow" size="4" onChange={this.handleChange}/>
                            <input type="text" value={this.state.xCol} name="xCol" size="4" onChange={this.handleChange}/>
                        </label>
                        <label>
                            B :
                            <input type="text" value={this.state.yRow} name="yRow" size="4" onChange={this.handleChange}/>
                            <input type="text" value={this.state.yCol} name="yCol" size="4" onChange={this.handleChange}/>
                        </label>
                    </form>
                <GenerateSquare
                    ARow = {this.state.xRow}
                    ACol = {this.state.xCol}
                    BRow = {this.state.yRow}
                    BCol = {this.state.yCol}
                    onChange = {(i, j) => this.handleInput(j, i)}
                    onClick = {() => this.handleClick()}
                />
                </div>
            )
        }
    }
}
