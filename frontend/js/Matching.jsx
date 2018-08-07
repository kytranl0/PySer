import React from "react";
var $ = require('jquery');

class GenerateStudent extends React.Component {
    hospital() {
        let arr = [];
        for (let i = 0; i < parseInt(this.props.hospital); i++) {
            arr.push(
                <label>
                    Hospital {i + 1} Spot:
                    <input name="HSpot" size="3" onChange={this.props.onChange.bind(this, i)} />
                </label>
            )
        }
        return arr
    }

    student() {
        let arr = [];
        for (let i = 0; i < parseInt(this.props.student); i++) {
            arr.push(
                <label>
                    Student {i + 1} GPA :
                <input name="GPA" size="3" onChange={this.props.onChange.bind(this, i)} />
                    <br />
                    <label>
                        Desire Hospital:
                        <input name="HDesire" size="3" onChange={this.props.onChange.bind(this, i)} />
                    </label>
                </label>
            )
        }
        return arr
    }

    render() {
        return (
            <div>
                <div>
                    <form>
                        {this.student()}
                    </form>
                </div>
                <div>
                    <form>
                        {this.hospital()}
                    </form>
                </div>
            </div>
        )
    }
}

export default class Matching extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: [],
            hospital: [],
            studentInfo: {},
            hospitalInfo: {},
            edit: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleInput(i, event) {
        event.preventDefault();
        console.log(event);
        console.log(i)
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            edit: true
        })
    }

    render() {
        if (!this.state.edit) {
            return (
                <div>
                    <h3>National Residency Matching Program</h3>
                    <form>
                        <label>
                            How many students:
                            <input size="3" name="student" onChange={this.handleChange}></input>
                        </label>
                    </form>
                    <form>
                        <label>
                            How many school:
                            <input size="3" name="hospital" onChange={this.handleChange}></input>
                        </label>
                    </form>
                    <input type="submit" value="Submit" onClick={this.handleClick} />
                </div>
            )
        } else {
            return (
                <div>
                    <h3>National Residency Matching Program</h3>
                    <form>
                        <label>
                            How many students:
                            <input size="3" onChange={this.handleChange}></input>
                        </label>
                    </form>
                    <form>
                        <label>
                            How many school:
                            <input size="3" onChange={this.handleChange}></input>
                        </label>
                    </form>
                    <GenerateStudent
                        student = {this.state.student}
                        hospital = {this.state.hospital}
                        onChange = {(event, i) => this.handleInput(event, i)}
                    />
                    <input type="submit" value="Submit" />
                </div>
            )
        }
    }
}
