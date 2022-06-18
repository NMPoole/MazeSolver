import React, {Component} from "react";
import "./NavBar.css"


class NavBar extends Component {


    // ATTRIBUTES (i.e., State):

    state = {
        maze: "Generate Maze", // Algorithm for maze generation.
        pathState: false, // State of found path.
        mazeState: false, // State of generated maze.
        speedState: "Speed", // State of animation update speed.
    };


    // METHODS:

    selectAlgorithm(selection) {

        if (this.props.visualizingAlgorithm) return;

        if (selection === this.props.algorithm ||
            this.props.algorithm === "Visualize Algorithm" ||
            this.props.algorithm === "Select an Algorithm!") {

            this.props.updateAlgorithm(selection);

        } else if (this.state.pathState) {

            this.clearPath();
            this.props.updateAlgorithm(selection);

        } else {

            this.props.updateAlgorithm(selection);

        }

    }

    selectMaze(selection) {

        if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;

        if (selection === this.state.maze ||
            this.state.maze === "Generate Maze" || this.state.maze === "Select a Maze!") {

            this.setState({maze: selection});

        } else if (!this.state.mazeState) {

            this.setState({maze: selection});

        } else {

            this.clearGrid();
            this.setState({maze: selection});

        }

    }

    visualizeAlgorithm() {
        if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;

        if (this.state.pathState) {
            this.clearTemp();
            return;
        }

        if (this.props.algorithm === "Visualize Algorithm" || this.props.algorithm === "Select an Algorithm!") {

            this.props.updateAlgorithm("Select an Algorithm!");

        } else {

            this.setState({pathState: true});

            if (this.props.algorithm === "Visualize Dijkstra") this.props.visualizeDijkstra();
            else if (this.props.algorithm === "Visualize A*") this.props.visualizeAStar();
            else if (this.props.algorithm === "Visualize Greedy BFS") this.props.visualizeGreedyBFS();
            else if (this.props.algorithm === "Visualize Bidirectional Greedy")  this.props.visualizeBidirectionalGreedySearch();
            else if (this.props.algorithm === "Visualize Breadth First Search") this.props.visualizeBFS();
            else if (this.props.algorithm === "Visualize Depth First Search") this.props.visualizeDFS();
            else if (this.props.algorithm === "Visualize Random Walk") this.props.visualizeRandomWalk();

        }

    }

    generateMaze() {

        if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;

        if (this.state.mazeState || this.state.pathState) this.clearTemp();

        if (this.state.maze === "Generate Maze" || this.state.maze === "Select a Maze!") {

            this.setState({maze: "Select a Maze!"});

        } else {

            this.setState({mazeState: true});

            if (this.state.maze === "Generate Random Maze") this.props.generateRandomMaze();
            else if (this.state.maze === "Generate Recursive Maze") this.props.generateRecursiveDivisionMaze();
            else if (this.state.maze === "Generate Vertical Maze") this.props.generateVerticalMaze();
            else if (this.state.maze === "Generate Horizontal Maze") this.props.generateHorizontalMaze();

        }

    }

    clearGrid() {

        if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;

        this.props.clearGrid();

        this.setState({
            algorithm: "Visualize Algorithm",
            maze: "Generate Maze",
            pathState: false,
            mazeState: false,
        });

    }

    clearPath() {

        if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;

        this.props.clearPath();

        this.setState({
            pathState: false,
            mazeState: false,
        });

    }

    clearTemp() {
        if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;

        this.props.clearGrid();

        this.setState({
            pathState: false,
            mazeState: false,
        });

    }

    changeSpeed(speed) {

        if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;

        let value = [10, 10];

        if (speed === "Slow") value = [50, 30];
        else if (speed === "Medium") value = [25, 20];
        else if (speed === "Fast") value = [10, 10];

        this.setState({speedState: speed});
        this.props.updateSpeed(value[0], value[1]);

    }

    render() {

        return (

            <nav className="navbar navbar-expand navbar-dark bg-dark">

                {/* Title of the page in the navigation bar. */}
                <a className="navbar-brand h1 mb-0" href="https://github.com/NMPoole/MazeSolver">
                    {window.innerWidth > 800 ? "Maze Solver by Nathan Poole" : "Maze Solver"}
                </a>

                {/* Navigation bar option and action elements. */}
                <div className="navbar-collapse" id="navbarNavDropdown">

                    <ul className="navbar-nav">

                        {/* Dropdown list of possible search algorithms to execute. */}
                        <li className="nav-item dropdown">

                            <div className="dropdown">

                                <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenu1"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Algorithms
                                </button>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.selectAlgorithm("Visualize Dijkstra")}>
                                        Dijkstra's Search
                                    </button>

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.selectAlgorithm("Visualize A*")}>
                                        A* Search
                                    </button>

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.selectAlgorithm("Visualize Greedy BFS")}>
                                        Greedy Best First Search
                                    </button>

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.selectAlgorithm("Visualize Bidirectional Greedy")}>
                                        Bidirectional Greedy Search
                                    </button>

                                    <div className="dropdown-divider"></div>

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.selectAlgorithm("Visualize Breadth First Search")}>
                                        Breadth First Search
                                    </button>

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.selectAlgorithm("Visualize Depth First Search")}>
                                        Depth First Search
                                    </button>

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.selectAlgorithm("Visualize Random Walk")}>
                                        Random Walk
                                    </button>

                                </div>

                            </div>{" "}



                        </li>

                        {/* Button to enact use of the search algorithm. */}
                        <li>

                            <button type="button" className="btn btn-success"
                                    onClick={() => this.visualizeAlgorithm()}>
                                {this.props.algorithm}
                            </button>

                        </li>

                        {/* Dropdown list of possible maze generation algorithms to execute. */}
                        <li className="nav-item dropdown">

                            <div className="dropdown">

                                <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenu1"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Mazes
                                </button>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.selectMaze("Generate Random Maze")}>
                                        Random Maze
                                    </button>

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.selectMaze("Generate Recursive Maze")}>
                                        Recursive Division Maze
                                    </button>

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.selectMaze("Generate Vertical Maze")}>
                                        Vertical Division Maze
                                    </button>

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.selectMaze("Generate Horizontal Maze")}>
                                        Horizontal Division Maze
                                    </button>

                                </div>

                            </div>{" "}

                        </li>

                        {/* Button to enact use of the maze generation algorithm. */}
                        <li>

                            <button type="button" className="btn btn-success"
                                    onClick={() => this.generateMaze()}>
                                {this.state.maze}
                            </button>

                        </li>

                        {/* Button to clear the current contents of the grid. */}
                        <li>

                            <button type="button" className="btn btn-danger"
                                    onClick={() => this.clearGrid()}>
                                Clear Grid
                            </button>

                        </li>

                        {/* Dropdown list of possible speeds of animation. */}
                        <li className="nav-item dropdown">

                            <div className="dropdown">

                                <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenu1"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.speedState}
                                </button>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.changeSpeed("Slow")}>
                                        Slow
                                    </button>

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.changeSpeed("Medium")}>
                                        Medium
                                    </button>

                                    <button className="dropdown-item btn-light" type="button"
                                            onClick={() => this.changeSpeed("Fast")}>
                                        Fast
                                    </button>

                                </div>

                            </div>{" "}

                        </li>

                    </ul>

                </div>

            </nav>

        );

    }


}

export default NavBar;