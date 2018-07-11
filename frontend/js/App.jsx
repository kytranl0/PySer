import React from "react";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getEvents } from "./gcal";
import { Table } from "reactstrap";

var $ = require('jquery');
var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var integers = "0123456789";
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

    render() {
        return (
            <div>
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


function organizeData(arr) {
    let data = [];
    let sorted = [];
    arr.forEach(function (e) {
        let sort = [];
        let j = Object.entries(e[1]);
        j.forEach(function (x) {
            sort.push({
                name: x[0],
                start: x[1][0],
                end: x[1][1]
            });
        });
        sorted.push(sort);
    });
    let rr = [];
    sorted.forEach(function (e) {
        let t = e.sort(function (a, b) {
            return a.start.slice(0, 2) - b.start.slice(0, 2);
        });
        rr.push(t)
    });
    let maxRow = 0;
    rr.forEach(function (e, index) {
        if (index === 0) {
            maxRow = e.length
        } else if (index !== 0 && maxRow < e.length) {
            maxRow = e.length
        }
    });
    for (let i = 0; i < maxRow ; i++) {
        let row = [];
        rr.map(function (e) {
            if (e[i] !== undefined) {
                row.push(
                    e[i].name,
                    e[i].start,
                    e[i].end
                )
            } else {
                let randomString = RandomString();
                let randomInt = RandomInt();

                row.push(
                    "zfi" + randomString,
                    "983" + randomInt,
                    "981" + randomInt
                )
            }
        });
        data.push(row)
    }
    return data;
}
// title.length array: [event, start, end]
function getRows(array) {
    let hbody = [];
    let keyInt = 0;
    array.forEach(function(e, inc) {
        keyInt++;
        let title = [];
        let tbody =[];
        let count = 2;
        e.forEach((i, index) => {

            if (i.slice(0,3) === "zfi")  {
                title.push(<td key={i} rowSpan={2}></td>);
                index++;
                title.push(<td key={array[inc][index]}></td>);
            } else if (isNaN(parseInt(i, 10))) {
                title.push(<td key={i} rowSpan={2}>{i}</td>);
                index++;
                title.push(<td key={array[inc][index]}>{array[inc][index]}</td>)
            } else if (i.slice(0,3) === "981") {
                tbody.push(<td key={array[inc][count]}></td>);
                count += 3;
            } else if ((count <= index || index === 1) && (i.slice(0,3) !== "983")) {
                tbody.push(<td key={array[inc][count]}>{array[inc][count]}</td>);
                count += 3;
            }
        });
        hbody.push(<tr key={keyInt}>{title}</tr>);
        keyInt++;
        hbody.push(<tr key={keyInt}>{tbody}</tr>);
    });

    return hbody;
}

function RandomString() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function RandomInt() {
    let text = "";
    let possible = "0123456789";
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

