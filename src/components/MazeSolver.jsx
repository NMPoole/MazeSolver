import React, {Component} from "react";
import "./MazeSolver.css";

// Import components for creating the MazeSolver application.
import Node from "./Node/Node";
import NavBar from "./NavBar/NavBar";

// Import search algorithms for solving mazes.
import {randomWalk} from "../search_algorithms/randomWalk"
import {dijkstra, getOptPathNodes_Dijkstra,} from "../search_algorithms/dijkstra";
import {breadthFirstSearch, getOptPathNodes_BFS} from "../search_algorithms/breadthFirstSearch";
import {depthFirstSearch, getOptPathNodes_DFS} from "../search_algorithms/depthFirstSearch";
import {aStar, getOptPathNodes_AStar,} from "../search_algorithms/astar";
import {greedyBestFS, getOptPathNodes_GreedyBestFS} from "../search_algorithms/greedyBestFirstSearch";
import {bidirGreedySearch, getOptPathNodes_BidirGreedySearch} from "../search_algorithms/birdirGreedySearch";

// Import maze generation algorithms.
import {randomMaze} from "../maze_algorithms/randomMaze";
import {recursiveDivisionMaze} from "../maze_algorithms/recursiveDivisionMaze";
import {verticalMaze} from "../maze_algorithms/verticalMaze";
import {horizontalMaze} from "../maze_algorithms/horizontalMaze";

const initDims = getInitDimensions(window.innerWidth, window.innerHeight);
const initNumRows = initDims[0];
const initNumCols = initDims[1];

const startFinishNode = getStartFinishNodes(initNumRows, initNumCols);
const startNodeRow = startFinishNode[0];
const startNodeCol = startFinishNode[1];
const finishNodeRow = startFinishNode[2];
const finishNodeCol = startFinishNode[3];

class MazeSolver extends Component {


    // ATTRIBUTES (i.e., state):

    state = {
        grid: [],
        mouseIsPressed: false,
        visualizingAlgorithm: false,
        generatingMaze: false,
        width: window.innerWidth,
        height: window.innerHeight,
        numRows: initNumRows,
        numColumns: initNumCols,
        speed: 10,
        mazeSpeed: 10,
    };


    // UTILITY METHODS:

    updateDimensions = () => {

        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        });

    };

    updateSpeed = (path, maze) => {

        this.setState({
            speed: path, mazeSpeed: maze
        });

    };

    componentDidMount() {

        window.addEventListener("resize", this.updateDimensions);
        const grid = getInitialGrid(this.state.numRows, this.state.numColumns);
        this.setState({ grid });

    }

    handleMouseDown(row, col) {

        const newGrid = getNewGridWithWalls(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });

    }

    handleMouseEnter(row, col) {

        if (this.state.mouseIsPressed) {
            const newGrid = getNewGridWithWalls(this.state.grid, row, col);
            this.setState({ grid: newGrid, mouseIsPressed: true });
        }

    }

    handleMouseUp() {

        this.setState({
            mouseIsPressed: false
        });

    }

    clearGrid() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        for (let row = 0; row < this.state.grid.length; row++) {
            for (let col = 0; col < this.state.grid[0].length; col++) {
                if (!((row === startNodeRow && col === startNodeCol) || (row === finishNodeRow && col === finishNodeCol))) {
                    document.getElementById(`node-${row}-${col}`).className = "node";
                }
            }
        }

        const newGrid = getInitialGrid(this.state.numRows, this.state.numColumns);

        this.setState({
            grid: newGrid,
            visualizingAlgorithm: false,
            generatingMaze: false,
        });

    }

    clearPath() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        for (let row = 0; row < this.state.grid.length; row++) {
            for (let col = 0; col < this.state.grid[0].length; col++) {
                if (document.getElementById(`node-${row}-${col}`).className === "node node-shortest-path") {
                    document.getElementById(`node-${row}-${col}`).className = "node";
                }
            }
        }

        const newGrid = getGridWithoutPath(this.state.grid);

        this.setState({
            grid: newGrid,
            visualizingAlgorithm: false,
            generatingMaze: false,
        });

    }


    // SEARCH ALGORITHM METHODS:

    animateShortestPath = (nodesOptPathOrdered, nodesVisitedOrdered) => {

        if (nodesOptPathOrdered.length === 1) this.setState({ visualizingAlgorithm: false });

        for (let i = 1; i < nodesOptPathOrdered.length; i++) {

            if (i === nodesOptPathOrdered.length - 1) {

                setTimeout(() => {

                    let newGrid = updateNodesForRender(
                        this.state.grid,
                        nodesOptPathOrdered,
                        nodesVisitedOrdered
                    );

                    this.setState({
                        grid: newGrid, visualizingAlgorithm: false
                    });

                }, i * (3 * this.state.speed));

                return;

            }

            let node = nodesOptPathOrdered[i];

            setTimeout(() => {
                // Shortest path node.
                document.getElementById(`node-${node.row}-${node.col}`).className = "node node-shortest-path";
            }, i * (3 * this.state.speed));

        }

    };

    animateAlgorithm = (nodesVisitedOrdered, nodesOptPathOrdered) => {

        let newGrid = this.state.grid.slice();

        for (let row of newGrid) {
            for (let node of row) {

                let newNode = {
                    ...node,
                    isVisited: false,
                };

                newGrid[node.row][node.col] = newNode;

            }
        }

        this.setState({
            grid: newGrid
        });

        for (let i = 1; i <= nodesVisitedOrdered.length; i++) {

            let node = nodesVisitedOrdered[i];

            if (i === nodesVisitedOrdered.length) {

                setTimeout(() => {
                    this.animateShortestPath(nodesOptPathOrdered, nodesVisitedOrdered);
                }, i * this.state.speed);

                return;

            }

            setTimeout(() => {
                // Visited node.
                document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
            }, i * this.state.speed);

        }

    };

    animateRandomWalk = (nodesVisitedOrdered) => {

        for (let i = 1; i <= nodesVisitedOrdered.length; i++) {

            if (i === nodesVisitedOrdered.length) {

                setTimeout(() => {
                    this.setState({
                        visualizingAlgorithm: false
                    });
                }, i * this.state.speed);

                return;

            }

            let node = nodesVisitedOrdered[i];

            if (i === nodesVisitedOrdered.length - 1) {

                setTimeout(() => {
                    // Finish node.
                    document.getElementById(`node-${node.row}-${node.col}`).className = "node node-finish-reached";
                }, i * this.state.speed);

                continue;

            }

            setTimeout(() => {
                // Visited node.
                document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
            }, i * this.state.speed);

        }

    };

    animateBidirectionalAlgorithm(nodesVisitedOrderedStart, nodesVisitedOrderedFinish, nodesOptPathOrdered, isShortedPath) {

        let len = Math.max(nodesVisitedOrderedStart.length, nodesVisitedOrderedFinish.length);

        for (let i = 1; i <= len; i++) {

            let nodeA = nodesVisitedOrderedStart[i];
            let nodeB = nodesVisitedOrderedFinish[i];

            if (i === nodesVisitedOrderedStart.length) {

                setTimeout(() => {
                    let visitedNodesInOrder = getVisitedNodesInOrder(nodesVisitedOrderedStart, nodesVisitedOrderedFinish);

                    if (isShortedPath) {
                        this.animateShortestPath(nodesOptPathOrdered, visitedNodesInOrder);
                    } else {
                        this.setState({
                            visualizingAlgorithm: false
                        });
                    }

                }, i * this.state.speed);

                return;

            }

            setTimeout(() => {

                // Visited nodes.
                if (nodeA !== undefined) {
                    document.getElementById(`node-${nodeA.row}-${nodeA.col}`).className = "node node-visited";
                }

                if (nodeB !== undefined) {
                    document.getElementById(`node-${nodeB.row}-${nodeB.col}`).className = "node node-visited";
                }

            }, i * this.state.speed);

        }

    }

    visualizeDijkstra() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        this.setState({
            visualizingAlgorithm: true
        });

        setTimeout(() => {

            const {grid} = this.state;
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];

            const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getOptPathNodes_Dijkstra(finishNode);

            this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);

        }, this.state.speed);

    }

    visualizeAStar() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        this.setState({
            visualizingAlgorithm: true
        });

        setTimeout(() => {

            const {grid} = this.state;
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];

            const visitedNodesInOrder = aStar(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getOptPathNodes_AStar(finishNode);

            this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);

        }, this.state.speed);

    }

    visualizeBFS() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        this.setState({
            visualizingAlgorithm: true
        });

        setTimeout(() => {

            const {grid} = this.state;

            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];

            const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getOptPathNodes_BFS(finishNode);

            this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);

        }, this.state.speed);

    }

    visualizeDFS() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        this.setState({
            visualizingAlgorithm: true
        });

        setTimeout(() => {

            const {grid} = this.state;
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];

            const visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getOptPathNodes_DFS(finishNode);

            this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);

        }, this.state.speed);

    }

    visualizeRandomWalk() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        this.setState({
            visualizingAlgorithm: true
        });

        setTimeout(() => {

            const {grid} = this.state;
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];

            const visitedNodesInOrder = randomWalk(grid, startNode, finishNode);

            this.animateRandomWalk(visitedNodesInOrder);

        }, this.state.speed);

    }

    visualizeGreedyBFS() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        this.setState({
            visualizingAlgorithm: true
        });

        setTimeout(() => {

            const {grid} = this.state;
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];

            const visitedNodesInOrder = greedyBestFS(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getOptPathNodes_GreedyBestFS(finishNode);

            this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);

        }, this.state.speed);

    }

    visualizeBidirectionalGreedySearch() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        this.setState({
            visualizingAlgorithm: true
        });

        setTimeout(() => {

            const {grid} = this.state;
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];

            const visitedNodesInOrder = bidirGreedySearch(grid, startNode, finishNode);
            const visitedNodesInOrderStart = visitedNodesInOrder[0];
            const visitedNodesInOrderFinish = visitedNodesInOrder[1];
            const isShortedPath = visitedNodesInOrder[2];
            const nodesInShortestPathOrder = getOptPathNodes_BidirGreedySearch(
                visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1],
                visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]
            );

            this.animateBidirectionalAlgorithm(visitedNodesInOrderStart, visitedNodesInOrderFinish,
                nodesInShortestPathOrder, isShortedPath);

        }, this.state.speed);

    }


    // MAZE METHODS:

    animateMaze = (walls) => {

        for (let i = 0; i <= walls.length; i++) {

            if (i === walls.length) {

                setTimeout(() => {

                    this.clearGrid();
                    let newGrid = getNewGridWithMaze(this.state.grid, walls);
                    this.setState({
                        grid: newGrid,
                        generatingMaze: false
                    });

                }, i * this.state.mazeSpeed);

                return;

            }

            let wall = walls[i];
            let node = this.state.grid[wall[0]][wall[1]];

            setTimeout(() => {
                // Walls.
                document.getElementById(`node-${node.row}-${node.col}`).className = "node node-wall-animated";
            }, i * this.state.mazeSpeed);

        }

    };

    generateRandomMaze() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        this.setState({
            generatingMaze: true
        });

        setTimeout(() => {

            const { grid } = this.state;
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];

            const walls = randomMaze(grid, startNode, finishNode);

            this.animateMaze(walls);

        }, this.state.mazeSpeed);

    }

    generateRecursiveDivisionMaze() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        this.setState({
            generatingMaze: true
        });

        setTimeout(() => {

            const { grid } = this.state;
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];

            const walls = recursiveDivisionMaze(grid, startNode, finishNode);

            this.animateMaze(walls);

        }, this.state.mazeSpeed);

    }

    generateVerticalMaze() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        this.setState({
            generatingMaze: true
        });

        setTimeout(() => {

            const { grid } = this.state;
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];

            const walls = verticalMaze(grid, startNode, finishNode);

            this.animateMaze(walls);

        }, this.state.mazeSpeed);

    }

    generateHorizontalMaze() {

        if (this.state.visualizingAlgorithm || this.state.generatingMaze) return;

        this.setState({
            generatingMaze: true
        });

        setTimeout(() => {

            const {grid} = this.state;
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];

            const walls = horizontalMaze(grid, startNode, finishNode);

            this.animateMaze(walls);

        }, this.state.mazeSpeed);

    }


    // MAIN RENDER METHOD:
    // Required for components.

    render() {

        let {grid} = this.state;

        return (

            <React.Fragment>

                {/* The navigation bar with interaction options. */}
                <NavBar

                    visualizingAlgorithm={this.state.visualizingAlgorithm}
                    generatingMaze={this.state.generatingMaze}

                    visualizeDijkstra={this.visualizeDijkstra.bind(this)}
                    visualizeAStar={this.visualizeAStar.bind(this)}
                    visualizeGreedyBFS={this.visualizeGreedyBFS.bind(this)}
                    visualizeBidirectionalGreedySearch={this.visualizeBidirectionalGreedySearch.bind(this)}
                    visualizeBFS={this.visualizeBFS.bind(this)}
                    visualizeDFS={this.visualizeDFS.bind(this)}
                    visualizeRandomWalk={this.visualizeRandomWalk.bind(this)}

                    generateRandomMaze={this.generateRandomMaze.bind(this)}
                    generateRecursiveDivisionMaze={this.generateRecursiveDivisionMaze.bind(this)}
                    generateVerticalMaze={this.generateVerticalMaze.bind(this)}
                    generateHorizontalMaze={this.generateHorizontalMaze.bind(this)}

                    clearGrid={this.clearGrid.bind(this)}
                    clearPath={this.clearPath.bind(this)}
                    updateSpeed={this.updateSpeed.bind(this)}

                />

                {/* The key for the grid. */}
                <div className="gridKey">

                    <div className="keyItem">
                        <div className="keyIcon">

                        <Node

                            key="key-node-start"

                            row={-1}
                            col={-1}

                            isStart={true}
                            isFinish={false}
                            isVisited={false}
                            isShortest={false}
                            isWall={false}

                            width={this.state.width * 1.3}
                            height={this.state.height * 1.3}
                            numRows={this.state.numRows}
                            numColumns={this.state.numColumns}

                        />
                    </div>
                        <div className="keyLabel">Start Node</div>
                    </div>

                    <div className="keyItem">
                        <div className="keyIcon">
                        <Node

                            key="key-node-finish"

                            row={-1}
                            col={-1}

                            isStart={false}
                            isFinish={true}
                            isVisited={false}
                            isShortest={false}
                            isWall={false}

                            width={this.state.width * 1.3}
                            height={this.state.height * 1.3}
                            numRows={this.state.numRows}
                            numColumns={this.state.numColumns}

                        />
                    </div>
                        <div className="keyLabel">Goal Node</div>
                    </div>

                    <div className="keyItem">
                        <div className="keyIcon">
                        <Node

                            key="key-node-wall"

                            row={-1}
                            col={-1}

                            isStart={false}
                            isFinish={false}
                            isVisited={false}
                            isShortest={false}
                            isWall={true}

                            width={this.state.width * 1.3}
                            height={this.state.height * 1.3}
                            numRows={this.state.numRows}
                            numColumns={this.state.numColumns}

                        />
                    </div>
                        <div className="keyLabel">Wall Node</div>
                    </div>

                </div>

                {/* The grid. */}
                <div className={this.state.visualizingAlgorithm || this.state.generatingMaze ? "grid-visualizing" : "grid"}>

                    {/* Map every row and column (# determined by the screen dimensions) to Node component. */}
                    {grid.map((row, rowId) => {

                        return (

                            <div key={rowId}>

                                {row.map((node, nodeId) => {

                                    const {
                                        row,
                                        col,
                                        isStart,
                                        isFinish,
                                        isVisited,
                                        isShortest,
                                        isWall,
                                    } = node;

                                    return (

                                        <Node

                                            key={nodeId}

                                            row={row}
                                            col={col}

                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isVisited={isVisited}
                                            isShortest={isShortest}
                                            isWall={isWall}

                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}

                                            width={this.state.width}
                                            height={this.state.height}
                                            numRows={this.state.numRows}
                                            numColumns={this.state.numColumns}

                                        ></Node>
                                    );

                                })}

                            </div>
                        );

                    })}

                </div>

                {/* TODO: Add a pseudocode for selected algorithm component. */}

            </React.Fragment>

        );

    }


} // MazeSolver{}.


function getInitDimensions(width, height) {

    let numCols;

    if (width > 1500) numCols = Math.floor(width / 25);
    else if (width > 1250) numCols = Math.floor(width / 22.5);
    else if (width > 1000) numCols = Math.floor(width / 20);
    else if (width > 750) numCols = Math.floor(width / 17.5);
    else if (width > 500) numCols = Math.floor(width / 15);
    else if (width > 250) numCols = Math.floor(width / 12.5);
    else if (width > 0) numCols = Math.floor(width / 10);

    let cellWidth = Math.floor(width / numCols);

    let numRows = Math.floor(height / cellWidth);

    return [numRows, numCols];

}

function getRandomNums(num) {

    let randomNums1 = [];
    let temp = 2;
    for (let i = 5; i < num / 2; i += 2) {
        randomNums1.push(temp);
        temp += 2;
    }

    let randomNums2 = [];
    temp = -2;
    for (let i = num / 2; i < num - 5; i += 2) {
        randomNums2.push(temp);
        temp -= 2;
    }

    return [randomNums1, randomNums2];

}

function getStartFinishNodes(numRows, numColumns) {

    let randNums;

    let x;
    let y;

    let startNodeRow;
    let startNodeCol;

    let finishNodeRow;
    let finishNodeCol;

    if (numRows < numColumns) {

        randNums = getRandomNums(numRows);
        x = Math.floor(numRows / 2);
        y = Math.floor(numColumns / 4);

        if (x % 2 !== 0) x -= 1;
        if (y % 2 !== 0) y += 1;

        startNodeRow = x + randNums[1][Math.floor(Math.random() * randNums[1].length)];
        startNodeCol = y + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];

        finishNodeRow = x + randNums[0][Math.floor(Math.random() * randNums[0].length)];
        finishNodeCol = numColumns - y + [0, 2, 4, 6][Math.floor(Math.random() * 4)];

    } else {

        randNums = getRandomNums(numColumns);
        x = Math.floor(numRows / 4);
        y = Math.floor(numColumns / 2);

        if (x % 2 !== 0) x -= 1;
        if (y % 2 !== 0) y += 1;

        startNodeRow = x + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];
        startNodeCol = y + randNums[1][Math.floor(Math.random() * randNums[1].length)];

        finishNodeRow = numRows - x + [0, 2, 4, 6][Math.floor(Math.random() * 4)];
        finishNodeCol = y + randNums[0][Math.floor(Math.random() * randNums[0].length)];

    }

    return [startNodeRow, startNodeCol, finishNodeRow, finishNodeCol];

}

const getInitialGrid = (numRows, numColumns) => {

    let grid = [];

    for (let row = 0; row < numRows; row++) {

        let currentRow = [];
        for (let col = 0; col < numColumns; col++) currentRow.push(createNode(row, col));
        grid.push(currentRow);

    }

    return grid;

};

const createNode = (row, col) => {

    return {

        row,
        col,

        isStart: row === startNodeRow && col === startNodeCol,
        isFinish: row === finishNodeRow && col === finishNodeCol,

        distance: Infinity,
        totalDistance: Infinity,

        isVisited: false,
        isShortest: false,
        isWall: false,

        previousNode: null,

    };

};

const getNewGridWithWalls = (grid, row, col) => {

    let newGrid = grid.slice();

    let node = grid[row][col];
    let newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;

    return newGrid;

};

const getNewGridWithMaze = (grid, walls) => {

    let newGrid = grid.slice();

    for (let wall of walls) {

        let node = grid[wall[0]][wall[1]];
        let newNode = {
            ...node,
            isWall: true,
        };
        newGrid[wall[0]][wall[1]] = newNode;

    }

    return newGrid;

};

const getGridWithoutPath = (grid) => {

    let newGrid = grid.slice();

    for (let row of grid) {
        for (let node of row) {

            let newNode = {
                ...node,
                distance: Infinity,
                totalDistance: Infinity,
                isVisited: false,
                isShortest: false,
                previousNode: null,
            };
            newGrid[node.row][node.col] = newNode;

        }
    }

    return newGrid;

};

const updateNodesForRender = (grid, nodesOptimalPathOrdered, nodesVisitedOrdered) => {

    let newGrid = grid.slice();

    for (let node of nodesVisitedOrdered) {

        if ((node.row === startNodeRow && node.col === startNodeCol) ||
            (node.row === finishNodeRow && node.col === finishNodeCol)) continue;

        let newNode = {
            ...node,
            isVisited: true,
        };

        newGrid[node.row][node.col] = newNode;

    }

    for (let node of nodesOptimalPathOrdered) {

        if (node.row === finishNodeRow && node.col === finishNodeCol) return newGrid;

        let newNode = {
            ...node,
            isVisited: false,
            isShortest: true,
        };

        newGrid[node.row][node.col] = newNode;
    }

};

const getVisitedNodesInOrder = (nodesVisitedOrderedStart, nodesVisitedOrderedFinish) => {

    let visitedNodesInOrder = [];

    let n = Math.max(nodesVisitedOrderedStart.length, nodesVisitedOrderedFinish.length);

    for (let i = 0; i < n; i++) {

        if (nodesVisitedOrderedStart[i] !== undefined) visitedNodesInOrder.push(nodesVisitedOrderedStart[i]);

        if (nodesVisitedOrderedFinish[i] !== undefined) visitedNodesInOrder.push(nodesVisitedOrderedFinish[i]);

    }

    return visitedNodesInOrder;

};

export default MazeSolver;