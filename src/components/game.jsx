import "./game.css";
import React, { Component } from "react";
import Header from "./header";
import Board from "./board";
import SettingsPanel from "./settingsPanel";
import GamePanel from "./gamePanel";

class Game extends Component {
  state = {
    mode: 1,
    backup: { playfield: [], rows: 0, cols: 0 },
    playfield: [],
    finished: false,
    player: 4,
    scoreX: 0,
    playerX: { h: 0, v: 0, lr: 0, rl: 0 },
    scoreO: 0,
    playerO: { h: 0, v: 0, lr: 0, rl: 0 },
    rows: 4,
    cols: 4,
    minRows: 3,
    minCols: 3,
    maxRows: 10,
    maxCols: 10,
    selectedType: 0,
    itemWidth: 50,
    itemHeight: 50,
    boardWidth: 600,
    boardHeight: 600,
    buttonWidthLong: 220,
    buttonWidthShort: 150
  };

  componentDidMount = () => {
    this.resetGame();
  };

  restartGame = (rows, cols) => {
    let value = null;
    let newPlayfield = Array(rows).fill([]);
    let curRows = this.state.playfield.length;
    let curCols = curRows > 0 ? this.state.playfield[0].length : 0;
    console.log(curRows + " vs " + rows + " " + curCols + " vs " + cols);
    for (var r = 0; r < rows; r++) {
      newPlayfield[r] = Array(cols).fill(0);
      for (var c = 0; c < cols; c++) {
        value = r < curRows && c < curCols ? this.state.playfield[r][c] : 0;
        newPlayfield[r][c] = value > 2 ? 0 : value;
      }
    }
    this.resetStats(newPlayfield, rows, cols);
  };

  resetGame = () => {
    let newPlayfield = Array(this.state.rows).fill([]);
    for (var r = 0; r < this.state.rows; r++) {
      newPlayfield[r] = Array(this.state.cols).fill(0);
    }
    this.resetStats(newPlayfield, this.state.rows, this.state.cols);
  };

  resetStats = (newPlayfield, rows, cols) => {
    this.setState({
      finished: false,
      scoreX: 0,
      playerX: { h: 0, v: 0, lr: 0, rl: 0 },
      scoreO: 0,
      playerO: { h: 0, v: 0, lr: 0, rl: 0 },
      itemWidth: this.state.boardWidth / cols,
      itemHeight: this.state.boardHeight / rows,
      rows: rows,
      cols: cols,
      playfield: newPlayfield
    });
  };

  calulcateItemSize = (rows, cols) => {
    this.setState({
      itemWidth: this.state.boardWidth / cols,
      itemHeight: this.state.boardHeight / rows
    });
  };

  calculateScore = player => {
    let h = 0;
    let v = 0;
    let lr = 0;
    let rl = 0;
    let score = 0;
    let ok = player === 4 ? [1, 4] : [1, 3];
    for (var r = 0; r < this.state.rows; r++) {
      for (var c = 0; c < this.state.cols; c++) {
        if (r > 0 && r < this.state.rows - 1) {
          let m = this.state.playfield[r][c];
          let left = this.state.playfield[r - 1][c];
          let right = this.state.playfield[r + 1][c];
          // check for COLUMNS
          if (
            ok.includes(m) &&
            ok.includes(left) &&
            ok.includes(right) &&
            [m, left, right].includes(player)
          ) {
            score++;
            v++;
          }
        }
        if (c > 0 && c < this.state.cols - 1) {
          let m = this.state.playfield[r][c];
          let top = this.state.playfield[r][c - 1];
          let bottom = this.state.playfield[r][c + 1];
          // check for ROWS
          if (
            ok.includes(m) &&
            ok.includes(top) &&
            ok.includes(bottom) &&
            [m, top, bottom].includes(player)
          ) {
            score++;
            h++;
          }
        }
        if (
          r > 0 &&
          c > 0 &&
          r < this.state.rows - 1 &&
          c < this.state.cols - 1
        ) {
          let m = this.state.playfield[r][c];
          let tl = this.state.playfield[r - 1][c - 1];
          let br = this.state.playfield[r + 1][c + 1];
          // check for DIAGONAL L->R
          if (
            ok.includes(tl) &&
            ok.includes(m) &&
            ok.includes(br) &&
            [m, tl, br].includes(player)
          ) {
            score++;
            lr++;
          }
        }
        if (
          r > 0 &&
          c > 0 &&
          r < this.state.rows - 1 &&
          c < this.state.cols - 1
        ) {
          let m = this.state.playfield[r][c];
          let tr = this.state.playfield[r - 1][c + 1];
          let bl = this.state.playfield[r + 1][c - 1];
          // check for DIAGONAL R->L
          if (
            ok.includes(tr) &&
            ok.includes(m) &&
            ok.includes(bl) &&
            [m, tr, bl].includes(player)
          ) {
            score++;
            rl++;
          }
        }
      }
    }
    player === 4
      ? this.setState({
          scoreX: score,
          playerX: { h: h, v: v, lr: lr, rl: rl }
        })
      : this.setState({
          scoreO: score,
          playerO: { h: h, v: v, lr: lr, rl: rl }
        });
    return score;
  };

  checkFinished = () => {
    var result = true;
    for (var r = 0; r < this.state.rows; r++) {
      for (var c = 0; c < this.state.cols; c++) {
        if (this.state.playfield[r][c] === 0) {
          result = false;
          break;
        }
      }
    }
    this.setState({ finished: result });
    return result;
  };

  togglePlayer = () => {
    this.state.player === 3
      ? this.setState({ player: 4 })
      : this.setState({ player: 3 });
  };

  makeMove = (row, col, player) => {
    this.state.playfield[row][col] = player;
    this.calculateScore(player);
    this.checkFinished();
    this.togglePlayer();
  };

  onHandleItemClick = item => {
    console.log("Item Click " + item);
    if (this.state.mode == 1) {
      // settings
      if (!item.isSelected()) {
        item.updateState(this.state.player);
        this.makeMove(item.props.row, item.props.col, this.state.player);
      }
    } else {
      // game
      let newPlayfield = this.state.playfield;
      newPlayfield[item.props.row][item.props.col] = this.state.selectedType;
      this.setState({ playfield: newPlayfield });
    }
  };

  onHandleBtnGameReset = () => {
    console.log("Reset Game Click");
    this.resetGame(this.state.rows, this.state.cols);
  };

  onHandleBtnGameRestart = () => {
    console.log("Restart Game Click");
    this.restartGame(this.state.rows, this.state.cols);
  };

  onHandleBtnGameSettings = () => {
    console.log("Open Settings Click");
    let oldPlayfield = JSON.parse(JSON.stringify(this.state.playfield));
    let oldRows = this.state.rows;
    let oldCols = this.state.cols;
    this.setState({
      mode: 2,
      backup: {
        playfield: oldPlayfield,
        rows: oldRows,
        cols: oldCols
      }
    });
  };

  onHandleBtnSettingsSelectItemType = type => {
    console.log("Item Type " + type);
    let newType = 0;
    switch (type) {
      case "*":
        newType = 1;
        break;
      case "#":
        newType = 2;
        break;
      default:
        newType = 0;
    }
    this.setState({ selectedType: newType });
  };

  onHandleBtnSettingsSmaller = () => {
    if (
      this.state.rows > this.state.minRows &&
      this.state.cols > this.state.minCols
    ) {
      this.restartGame(this.state.rows - 1, this.state.cols - 1);
    }
  };

  onHandleBtnSettingsBigger = () => {
    if (
      this.state.rows < this.state.maxRows &&
      this.state.cols < this.state.maxCols
    ) {
      this.restartGame(this.state.rows + 1, this.state.cols + 1);
    }
  };

  onHandleBtnSettingsAddRow = () => {
    if (this.state.rows < this.state.maxRows) {
      this.restartGame(this.state.rows + 1, this.state.cols);
    }
  };

  onHandleBtnSettingsRemoveRow = () => {
    if (this.state.rows > this.state.minRows) {
      this.restartGame(this.state.rows - 1, this.state.cols);
    }
  };

  onHandleBtnSettingsAddColumn = () => {
    if (this.state.cols < this.state.maxCols) {
      this.restartGame(this.state.rows, this.state.cols + 1);
    }
  };

  onHandleBtnSettingsRemoveColumn = () => {
    if (this.state.cols > this.state.minCols) {
      this.restartGame(this.state.rows, this.state.cols - 1);
    }
  };

  onHandleBtnSettingsCancel = () => {
    console.log("Settings Cancel Click");
    this.setState({
      mode: 1,
      playfield: this.state.backup.playfield,
      rows: this.state.backup.rows,
      cols: this.state.backup.cols
    });
    this.calulcateItemSize(this.state.backup.rows, this.state.backup.cols);
  };

  onHandleBtnSettingsSave = () => {
    console.log("Settings Save Click");
    this.setState({ mode: 1 });
    this.calculateScore(3);
    this.calculateScore(4);
    this.checkFinished();
  };

  render() {
    function Panel(props) {
      if (props.mode == 1) {
        return (
          <GamePanel
            rows={props.rows}
            cols={props.cols}
            finished={props.finished}
            buttonWidthLong={220}
            buttonWidthShort={150}
            scoreO={props.scoreO}
            playerO={props.playerO}
            scoreX={props.scoreX}
            playerX={props.playerX}
            player={props.player}
            onHandleReset={props.onHandleBtnGameReset}
            onHandleRestart={props.onHandleBtnGameRestart}
            onHandleSettings={props.onHandleBtnGameSettings}
          />
        );
      }
      return (
        <SettingsPanel
          rows={props.rows}
          cols={props.cols}
          buttonWidthLong={220}
          buttonWidthShort={150}
          onHandleBtnSettingsBigger={props.onHandleBtnSettingsBigger}
          onHandleBtnSettingsSmaller={props.onHandleBtnSettingsSmaller}
          onHandleBtnSettingsAddRow={props.onHandleBtnSettingsAddRow}
          onHandleBtnSettingsRemoveRow={props.onHandleBtnSettingsRemoveRow}
          onHandleBtnSettingsAddColumn={props.onHandleBtnSettingsAddColumn}
          onHandleBtnSettingsRemoveColumn={
            props.onHandleBtnSettingsRemoveColumn
          }
          onHandleBtnSettingsSelectItemType={
            props.onHandleBtnSettingsSelectItemType
          }
          onHandleBtnSettingsCancel={props.onHandleBtnSettingsCancel}
          onHandleBtnSettingsSave={props.onHandleBtnSettingsSave}
        />
      );
    }
    return (
      <div className="game border border-dark">
        <Header title="Flim Flam Flum" />
        <Board
          mode={this.state.mode}
          rows={this.state.rows}
          cols={this.state.cols}
          minRows={this.state.minRows}
          minCols={this.state.minCols}
          maxRows={this.state.maxRows}
          maxCols={this.state.maxCols}
          itemWidth={this.state.itemWidth}
          itemHeight={this.state.itemHeight}
          boardWidth={this.state.boardWidth}
          boardHeight={this.state.boardHeight}
          items={this.state.playfield}
          onHandleItemClick={this.onHandleItemClick}
        />
        <div>
          <Panel
            mode={this.state.mode}
            rows={this.state.rows}
            cols={this.state.cols}
            buttonWidthLong={220}
            buttonWidthShort={150}
            finished={this.state.finished}
            player={this.state.player}
            scoreO={this.state.scoreO}
            playerO={this.state.playerO}
            scoreX={this.state.scoreX}
            playerX={this.state.playerX}
            onHandleBtnGameReset={this.onHandleBtnGameReset}
            onHandleBtnGameRestart={this.onHandleBtnGameRestart}
            onHandleBtnGameSettings={this.onHandleBtnGameSettings}
            onHandleBtnSettingsBigger={this.onHandleBtnSettingsBigger}
            onHandleBtnSettingsSmaller={this.onHandleBtnSettingsSmaller}
            onHandleBtnSettingsAddRow={this.onHandleBtnSettingsAddRow}
            onHandleBtnSettingsRemoveRow={this.onHandleBtnSettingsRemoveRow}
            onHandleBtnSettingsAddColumn={this.onHandleBtnSettingsAddColumn}
            onHandleBtnSettingsRemoveColumn={
              this.onHandleBtnSettingsRemoveColumn
            }
            onHandleBtnSettingsSelectItemType={
              this.onHandleBtnSettingsSelectItemType
            }
            onHandleBtnSettingsCancel={this.onHandleBtnSettingsCancel}
            onHandleBtnSettingsSave={this.onHandleBtnSettingsSave}
          />
        </div>
      </div>
    );
  }
}

export default Game;
