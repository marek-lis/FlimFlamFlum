import "./board.css";
import React, { Component } from "react";
import Item from "./item";
import Background from "./background";

class Board extends Component {
  render() {
    var row = 0;
    var col = 0;
    return (
      <div className="board border border-dark">
        <div className="boardItems">
          {this.props.items.map((row, r) => (
            <div key={"r" + r}>
              {row.map((col, c) => (
                <Item
                  row={r}
                  col={c}
                  key={"r" + r + "c" + c}
                  selected={this.props.items[r][c]}
                  itemWidth={this.props.itemWidth}
                  itemHeight={this.props.itemHeight}
                  onHandleItemClick={this.props.onHandleItemClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
