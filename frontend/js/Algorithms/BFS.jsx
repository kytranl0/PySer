import Graph from 'react-graph-vis'
import React from "react"

export default class BFS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            nodes: [],
            edges: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.state.edges)
    }
    handleSubmit(event) {
        this.setState({
            edit: true
        })
    }
    handleChange(event) {
        event.preventDefault();
        if (event.target.value === '1') {
            return
        }
        if (event.target.name === 'nodes') {
            let nodes = getNode(parseInt(event.target.value));
            let edges = getEdge(parseInt(event.target.value));
            this.setState({
                nodes: nodes,
                edges: edges
            })
        }
    }
    render() {
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
                        </label>
                        <br/>
                    </form>
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
    for (let i = 1; i <= int; i++) {
        let to = Math.ceil(Math.random() * int);
        let from  = Math.floor(Math.random() * int);
        numbers.push(to);
        numbers.push(from);
        if ((from !== 0) && (to !== from)) {
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
            arr.push({from: i, to: rand});
            arr.push({from: rand, to: i});
        }
    }
    return arr
}
