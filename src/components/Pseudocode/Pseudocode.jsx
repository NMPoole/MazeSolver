import React, { Component } from "react";
import "./Pseudocode.css";

class Pseudocode extends Component {


    // ATTRIBUTES (i.e., State):

    state = {
        selectedAlgorithm: null
    }


    // METHODS:

    // TODO: Add actual pseudocode text for each search algorithm.

    pseudocodeDijkstra = () => {

        return (
            "Dijkstra's Algorithm"
        );

    }

    pseudocodeAStar = () => {

        return (
            "A* Algorithm"
        );

    }

    pseudocodeGreedyBFS = () => {

        return (
            "Greedy Best First Algorithm"
        );

    }

    pseudocodeBidirGreedy = () => {

        return (
            "Bidirectional Greedy Algorithm"
        );

    }

    pseudocodeBFS = () => {

        return (
            "Breadth First Search Algorithm"
        );

    }

    pseudocodeDFS = () => {

        return (
            "Depth First Search Algorithm"
        );

    }

    pseudocodeRandomWalk = () => {

        return (
            "Random Walk Algorithm"
        );

    }

    handlePseudocode = (algorithm) => {

        switch (algorithm) {
            case "Dijkstra": return this.pseudocodeDijkstra();
            case "A*": return this.pseudocodeAStar();
            case "Greedy BFS": return this.pseudocodeGreedyBFS();
            case "Bidirectional Greedy": return this.pseudocodeBidirGreedy();
            case "Breadth First Search": return this.pseudocodeBFS();
            case "Depth First Search": return this.pseudocodeDFS();
            case "Random Walk": return this.pseudocodeRandomWalk();
        }

    }

    render() {

        const pseudoAlg =
            (this.props.algorithm === "Select an Algorithm!" || this.props.algorithm === "Visualize Algorithm") ?
                "" :
                this.props.algorithm.replace("Visualize ", "")

        return (
            <div className="pseudocode">
                <h4> Search Algorithm Pseudocode {(pseudoAlg === "") ? "" : " - " + pseudoAlg}</h4>
                <pre>{this.handlePseudocode(pseudoAlg)}</pre>
            </div>
        );

    }


}

export default Pseudocode;