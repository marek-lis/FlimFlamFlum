import "./item.css";
import React, { Component } from "react";

class Item extends Component {
  state = {
    type: [
      { id: 0, label: "?", class: "item btn-secondary" },
      { id: 1, label: "*", class: "item btn-success" },
      { id: 2, label: "#", class: "item btn-danger" },
      { id: 3, label: "O", class: "item btn-primary" },
      { id: 4, label: "X", class: "item btn-warning" }
    ]
  };
  isSelected = () => {
    return this.props.selected !== 0;
  };
  updateState = newSelected => {
    this.setState({ selected: newSelected });
  };
  render() {
    return (
      <button
        className={this.state.type[this.props.selected].class}
        style={{ width: this.props.itemWidth, height: this.props.itemHeight }}
        onClick={() => this.props.onHandleItemClick(this)}
      >
        {this.state.type[this.props.selected].label}
      </button>
    );
  }
}

export default Item;
