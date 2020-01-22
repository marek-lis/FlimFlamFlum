import "./gamePanel.css";
import React, { Component } from "react";

class GamePanel extends Component {
  state = {
    details: false
  };
  onToggleStats = () => {
    console.log("onHandlePressO");
    this.setState({ details: !this.state.details });
  };

  getStats = (player, detailed) => {
    let message = "";
    if (detailed === false) {
      message =
        player === 4
          ? "X = " + (this.props.scoreX > 0 ? this.props.scoreX : 0)
          : (message =
              "O = " + (this.props.scoreO > 0 ? this.props.scoreO : 0));
    } else {
      let p = player === 4 ? this.props.playerX : this.props.playerO;
      message = "V: " + p.v + " H: " + p.h + " LR: " + p.lr + "  RL: " + p.rl;
    }
    return message;
  };

  getMessage = () => {
    var message = "";
    if (this.props.finished === true) {
      if (this.props.scoreO > this.props.scoreX) {
        message = "O WINS!";
      } else if (this.props.scoreX > this.props.scoreO) {
        message = "X WINS!";
      } else {
        message = "NOBODY WINS!";
      }
    } else {
      if (this.props.player === 4) {
        message = "X";
      } else {
        message = "O";
      }
    }
    return message;
  };

  render() {
    return (
      <div className="gamePanel">
        <div>
          <hr className="hr" />
          <h4 className="m-1" style={{ textAlign: "center" }}>
            {this.props.rows} rows, {this.props.cols} columns
          </h4>
          <h3>{this.getMessage()}</h3>
          <hr className="hr" />
          <button
            className="btn btn-primary btn-lg m-2"
            selected={4}
            onClick={this.onToggleStats}
            style={{ width: this.props.buttonWidthLong }}
          >
            {this.getStats(3, this.state.details)}
          </button>
          <button
            className="btn btn-warning btn-lg m-2"
            selected={5}
            onClick={this.onToggleStats}
            style={{ width: this.props.buttonWidthLong }}
          >
            {this.getStats(4, this.state.details)}
          </button>
          <hr className="hr" />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-danger btn-lg m-2"
            style={{ width: this.props.buttonWidthShort }}
            onClick={this.props.onHandleReset}
          >
            RESET
          </button>
          <button
            type="button"
            className="btn btn-warning btn-lg m-2"
            style={{ width: this.props.buttonWidthShort }}
            onClick={this.props.onHandleRestart}
          >
            RESTART
          </button>
          <button
            type="button"
            className="btn btn-success btn-lg m-2"
            style={{ width: this.props.buttonWidthShort }}
            onClick={this.props.onHandleSettings}
          >
            SETTINGS
          </button>
          <hr className="hr" />
        </div>
      </div>
    );
  }
}

export default GamePanel;
