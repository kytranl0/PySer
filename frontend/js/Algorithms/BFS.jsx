import Graph from 'react-graph-vis'
import React from "react"
var $ = require('jquery');

export default class BFS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            nodes: [],
            edges: [],
            numbers: [],
            y: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        if (event.target.value === 'Submit') {
            let t = run();
            console.log(t);
            this.setState({
                edit: true
            })
        } else {
            event.preventDefault();
            let edges = this.state.y.join();
            $.post('http://localhost:8080/BFS', {
                nodes: this.state.nodes,
                edges: edges
            }).then((data) => {
                console.log(data)
            })
        }
    }
    handleChange(event) {
        event.preventDefault();
        if (event.target.value === '1') {
            return
        }
        if (event.target.name === 'nodes') {
            let nodes = getNode(parseInt(event.target.value));
            let edges, numbers, edge;
            [edges, numbers, edge] = getEdge(parseInt(event.target.value));
            console.log(edge);
            this.setState({
                nodes: nodes,
                edges: edges,
                numbers: numbers,
                y: edge
            })
        }
    }
    render() {
        const getNum = this.state.numbers.map((e) =>  <li key={e}>{e.join()}</li>);
        const graph = {
            nodes: this.state.nodes,
            edges: this.state.edges
        };

        const options = {
            layout: {
                hierarchical: false
            },
            edges: {
                color: "#000000"
            }
        };

        const events = {
            select: function(event) {
                var { nodes, edges } = event;
                console.log("Selected nodes:");
                console.log(nodes);
                console.log("Selected edges:");
                console.log(edges);
            }
        };
        if (!this.state.edit) {
            return (
                <form>
                    <label>
                        How many nodes?
                        <input name='nodes' onChange={this.handleChange} />
                        <input type='submit' value='Submit' onClick={this.handleSubmit} />
                    </label>
                    <br />
                </form>
            )
        }
        else {
            return (
                <div>
                    <form>
                        <label>
                            How many nodes?
                            <input name='nodes' onChange={this.handleChange}></input>
                            <input type='submit' value='Send' onClick={this.handleSubmit} />
                        </label>
                        <br/>
                    </form>
                    {getNum}
                    <Graph graph={graph} options={options} events={events} style={{height: "640px"}}/>
                </div>
            )
        }
    }
}

function getNode(int) {
    let arr = [];
    for (let i = 1; i <= int; i++) {
        arr.push({id: i, label: 'Node ' + i, color: "#e04141"})
    }
    return arr
}

function getEdge(int) {
    let arr = [];
    let numbers = [];
    let edge = [];
    for (let i = 1; i <= int; i++) {
        let to = Math.ceil(Math.random() * int);
        let from  = Math.floor(Math.random() * int);
        if ((from !== 0) && (to !== from)) {
            let o = [to, from];
            edge.push(o);
            numbers.push(from, to);
            arr.push({from: from, to: to });
            arr.push({from: to, to: from});
        } else {
            i--
        }
    }
    for (let i = 1; i <= int; i++) {
        if (numbers.includes(i)) {
            continue
        } else {
            let rand = Math.ceil(Math.random() * int);
            edge.push([i, rand]);
            numbers.push(rand, i);
            arr.push({from: i, to: rand});
            arr.push({from: rand, to: i});
        }
    }
    return [arr, edge, numbers]
}

function testFunction() {
    return new Promise(function(resolve, reject) {
        resolve([ "test1", "test2"] );
    });
}

async function run() {

    const [firstRes, secondRes] = await testFunction();

    console.log(firstRes, secondRes);

}
