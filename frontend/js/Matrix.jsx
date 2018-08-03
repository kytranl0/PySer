import React from "react";

class GenerateSquare extends React.Component {
    squareA() {
        var row = [];
        var square = [];
        for (let i = 0; i < this.props.ACol; i++) {
            row.push(
                <input type="text" size="3" name="row"/>
            )
        }
        for (let i = 0; i < this.props.ARow; i++) {
            square.push(
                <div>
                    <label>
                        {row}
                    </label>
                </div>
            )
        }
        return square
    }
    squareB() {
        var col = [];
        var square = [];
        for (let i = 0; i < this.props.BCol; i++) {
            col.push(
                <input type="text" size="3" name="row"/>
            )
        }
        for (let i = 0; i < this.props.BRow; i++) {
            square.push(
                <div>
                    <label>
                        {col}
                    </label>
                </div>
            )
        }
        return square
    }
    render() {
        return (
            <div>
                <form onSubmit={() => this.props.onClick()}>
                    <h1>A</h1>
                    {this.squareA()}
                    <h1>B</h1>
                    {this.squareB()}
                    <input type="submit" value="Calculate"/>
                </form>
            </div>
        )
    }
}

export default class Matrix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: [],
            xRow: [],
            xCol: [],
            yRow: [],
            yCol: [],
            edit: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleClick() {

    }

    render() {
        if (!this.state.edit) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        A :
                        <input type="text" name="xRow" size="4" onChange={this.handleChange}/>
                        <input type="text" name="xCol" size="4" onChange={this.handleChange}/>
                    </label>
                    <label>
                        B :
                        <input type="text" name="yRow" size="4" onChange={this.handleChange}/>
                        <input type="text" name="yCol" size="4" onChange={this.handleChange}/>
                    </label>
                    <input value="Generate" name="generate" type="submit"/>
                </form>
            )
        } else {
            return (
                <GenerateSquare
                    ARow = {this.state.xRow}
                    ACol = {this.state.xCol}
                    BRow = {this.state.yRow}
                    BCol = {this.state.yCol}
                    onClick = {() => this.handleClick()}
                />
            )
        }
    }
}
