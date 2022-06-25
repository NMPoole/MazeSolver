import React, { Component } from "react";
import "./Pseudocode.css";

class Pseudocode extends Component {


    // ATTRIBUTES (i.e., State):

    state = {
        selectedAlgorithm: null
    }


    // METHODS:

    pseudocodeDijkstra = () => {

        return (

            <>

                <p>
                    Dijkstra’s algorithm tries to find the shortest path from the starting node to every node.
                    Hence, we can get the shortest path from the starting node to the goal.
                </p>

                <code>

                    <ol>
                        <li>Assign dis[v] for all nodes, v, as INT_MAX (distance from root node to every other node).</li>
                        <li>Assign dis[root] as 0 (distance from root node to itself).</li>
                        <li>Add all nodes to a priority queue.</li>
                        <li>Loop on the queue as long as it's not empty:</li>

                        <ol>
                            <li>In every loop, choose the node with the minimum distance from the root node in the queue (root node will be selected first).</li>
                            <li>Remove the current chosen node from the queue (vis[current] = true).</li>
                            <li>If the current chosen node is the goal node, then return it.</li>
                            <li>For every child of the current node, do the following:</li>

                            <ol>
                                <li>If child node is not already in the queue (already visited), then skip this iteration.</li>
                                <li>Assign temp = (dist[current] + distance from current to child node).</li>
                                <li>If temp {"<"} dist[child], then assign dist[child] = temp. This denotes a shorter path to the child node has been found.</li>
                            </ol>

                        </ol>

                        <li>If the priority queue is empty, then the goal node was not found!</li>
                    </ol>

                </code>

            </>

        );

    }

    pseudocodeAStar = () => {

        return (

            <>

                <p>
                    A* is a combination of Dijkstra and Greedy BFS.
                    The algorithm uses distance from the root node plus heuristic distance to the goal.
                    The algorithm terminates when the goal node is found.
                </p>

                <code>

                    <ol>
                        <li>Assign dis[v] for all nodes, v, as INT_MAX (distance from root node + heuristics of every node).</li>
                        <li>Assign dis[root] = 0 + heuristic(root, goal) (distance from root node to itself + heuristics).</li>
                        <li>Add the root node to priority queue.</li>
                        <li>Loop on the queue as long as it's not empty.</li>

                        <ol>
                            <li>In every loop, choose the node with the minimum distance from the root node in the queue + heuristic (root node will be selected first).</li>
                            <li>Remove the current chosen node from the queue (vis[current] = true).</li>
                            <li>If the current node is the goal node, then return it.</li>
                            <li>For every child of the current node, do the following:</li>

                            <ol>
                                <li>Assign temp = distance(root, current) + distance(current, child) + heuristic(child, goal).</li>
                                <li>If temp {"<"} dis[child], then assign dist[child] = temp. This denotes a shorter path to child node has been found.</li>
                                <li>Add child node to the queue if not already in the queue (thus, it's now marked as not visited again).</li>
                            </ol>

                        </ol>

                        <li>If the priority queue is empty, then the goal node was not found!</li>
                    </ol>

                </code>

            </>

        );

    }

    pseudocodeGreedyBFS = () => {

        return (

            <>

                <p>
                    Greedy Best-First Search is an algorithm which makes a choice based on educated guesses (i.e., heuristics) at each stage.
                    The node with shortest heuristic distance from the goal node will be explored next.
                </p>

                <code>

                    <ol>
                        <li>Assign dis[v] for all nodes, v, as INT_MAX (distance from every node to goal node).</li>
                        <li>Assign dis[root] = heuristics(root, goal) (estimated distance from root node to the goal).</li>
                        <li>Add the root node to priority queue.</li>
                        <li>Loop on the queue as long as it's not empty:</li>

                        <ol>
                            <li>In every loop, choose the node with the minimum heuristic distance from the goal node in the queue (root node will be selected first).</li>
                            <li>Remove the current chosen node from the queue (vis[current] = true).</li>
                            <li>If the current chosen node is the goal node, then return it.</li>
                            <li>For every child of the current node, do the following:</li>

                            <ol>
                                <li>If child node is already visited (previously removed from the queue), then skip this iteration.</li>
                                <li>Assign dist[current] = heuristics(current, goal).</li>
                                <li>Add child node to the queue.</li>
                            </ol>

                        </ol>

                        <li>If the priority queue is empty, then goal node was not found!</li>
                    </ol>

                </code>

            </>

        );

    }

    pseudocodeBidirGreedy = () => {

        return (

            <>

                <p>
                    Bidirectional Greedy Search finds the smallest path from a source to a goal node. It runs two simultaneous searches:
                        <ol>
                            <li>Forward search from the source node toward the goal node.</li>
                            <li>Backward search from the goal node toward the source node.</li>
                        </ol>
                    Bidirectional Greedy Search replaces single search graphs, which are likely to grow exponentially, with two smaller sub graphs.
                    The search terminates when the two graphs intersect.
                    As with the A* algorithm, bidirectional greedy search is guided by a heuristic estimate of remaining distance from the source to the goal, and vice versa, for finding the optimal path.
                </p>

            </>


        );

    }

    pseudocodeBFS = () => {

        return (

            <>
                <p>
                    Breadth-First Search starts at the root (i.e., start node) and explores all of it’s neighbours before
                    moving to each of the root children.
                    Then, it explores the children of the root children, and so on.
                    The algorithm uses a queue to perform the BFS.
                </p>

                <code>
                    <ol>
                        <li>Add the start node to the queue and mark it as visited (i.e., already explored).</li>
                        <li>Loop on the queue as long as it's not empty:</li>
                        <ol>
                            <li>Get and remove the node at the front of the queue as the current node.</li>
                            <li>For every non-visited child of the current node, do the following:</li>
                            <ol>
                                <li>Mark it as visited.</li>
                                <li>Check if it's the goal node. If so, then return it.</li>
                                <li>Otherwise, push it to the queue.</li>
                            </ol>
                        </ol>
                        <li>If queue is empty, then goal node was not found!</li>
                    </ol>
                </code>
            </>

        );

    }

    pseudocodeDFS = () => {

        return (
            <>

                <p>
                    Depth-First Search starts at the root and explores one of it’s children’s sub tree, and then moves to the next child’s sub tree, and so on.
                    It uses a stack, or recursion, to perform the search algorithm. The following is the iterative (i.e., stack) approach.
                </p>

                <code>

                    <ol>
                        <li>Add the start node to the stack.</li>
                        <li>Loop on the stack as long as it's not empty.</li>
                        <ol>
                            <li>Get the node at the top of the stack as the current node and mark it as visited.</li>
                            <li>For every non-visited child of the current node, do the following:</li>
                            <ol>
                                <li>Check if it's the goal node. If so, then return this child node.</li>
                                <li>Otherwise, push it to the stack.</li>
                            </ol>
                        </ol>
                        <li>If the stack is empty, then the goal node was not found!</li>

                    </ol>

                </code>

            </>

        );

    }

    pseudocodeRandomWalk = () => {

        return (
            <>

                <p>
                    Random walk, as the name suggests, entails starting from the initial node and exploring all other nodes at random until the goal node is found.
                </p>

                <code>
                    <ol>
                        <li>Add the start node to the queue and mark it as visited (i.e., already explored).</li>
                        <li>Loop on the queue as long as it's not empty.</li>
                            <ol>
                                <li>Get and remove the node at the front of the queue as the current node.</li>
                                <li>Randomly select a non-visited neighbour of the current node and do the following:</li>
                                    <ol>
                                        <li>Mark it as visited.</li>
                                        <li>Check if it's the goal node. If so, then return it.</li>
                                        <li>Otherwise, push it to the queue.</li>
                                    </ol>
                            </ol>
                        <li>If the queue is empty, then the goal node was not found!</li>
                    </ol>
                </code>

            </>
        );

    }

    pseudocodeDefault() {

        return (

            <>

                <p>
                    <i>Select</i> a pathfinding algorithm from above to get pseudocode.
                </p>

            </>

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
            default: return this.pseudocodeDefault();
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
                {this.handlePseudocode(pseudoAlg)}
            </div>
        );

    }


}

export default Pseudocode;