import React, { Component } from "react";
import "./Node.css";

class Node extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const {

            row,
            col,

            isStart,
            isFinish,
            isWall,
            isVisited,
            isShortest,

            onMouseEnter,
            onMouseDown,
            onMouseUp,

            width,
            height,
            numRows,
            numColumns,

        } = this.props;

        const extraClass = isStart
            ? "node node-start" : isFinish
            ? "node node-finish" : isWall
            ? "node-wall" : isShortest
            ? "node node-shortest-path" : isVisited
            ? "node node-visited" : "node";

        let cellWidth = Math.floor((width - 15) / numColumns);

        let cellHeight;
        if (width > 1500) cellHeight = Math.floor((height - 70) / numRows);
        else if (width > 1000) cellHeight = Math.floor((height - 70) / numRows);
        else if (width > 500) cellHeight = Math.floor((height - 60) / numRows);
        else if (width > 0) cellHeight = Math.floor((height - 50) / numRows);

        return (

            <div
                id={`node-${row}-${col}`} className={`${extraClass}`}
                style={{ "--width": `${cellWidth}px`, "--height": `${cellHeight}px` }}

                onPointerDown={() => onMouseDown(row, col)}
                onPointerUp={() => onMouseUp()}

                onMouseEnter={() => onMouseEnter(row, col)}
                onTouchMove={(event) => this.onTouchEnter(event)}
            >
            </div>

        );

    }


    prevElAltered = null; // Used for adding touch event accessibility.

    onTouchEnter(e) {

        // Get co-ordinates of the touch event.
        const touch = e.touches[0] || e.changedTouches[0];
        const x = touch.pageX;
        const y = touch.pageY;

        // Get element that the touch event is 'hovering' over.
        const currEl = document.elementFromPoint(x, y);

        // If the element is a node, then we run the logic to switch between wall and space.
        if (currEl.className === "node" || currEl.className === "node-wall") {

            // Guard Condition: Make sure to not repeatedly alter the same node.
            if (this.prevElAltered != null && this.prevElAltered === currEl) return;

            this.prevElAltered = currEl;

            const idSplit = currEl.id.split("-");
            const row = idSplit[1];
            const col = idSplit[2];

            this.props.onMouseEnter(row, col);

        }

    }

}

export default Node;