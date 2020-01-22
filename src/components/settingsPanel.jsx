import "./settingsPanel.css";
import React, { Component } from "react";

class SettingsPanel extends Component {
  render() {
    return (
      <div className="settingsPanel">
        <div>
          <hr className="hr" />
          <h4 className="m-1" style={{ textAlign: "center" }}>
            {this.props.rows} rows, {this.props.cols} columns
          </h4>
          <hr className="hr" />
          <button
            className="btn btn-success btn-lg m-2"
            style={{ width: this.props.buttonWidthShort }}
            onClick={() => this.props.onHandleBtnSettingsSelectItemType("*")}
          >
            * = ANY
          </button>
          <button
            className="btn btn-secondary btn-lg m-2"
            style={{ width: this.props.buttonWidthShort }}
            onClick={() => this.props.onHandleBtnSettingsSelectItemType("?")}
          >
            ? = PLAYER
          </button>
          <button
            className="btn btn-danger btn-lg m-2"
            style={{ width: this.props.buttonWidthShort }}
            onClick={() => this.props.onHandleBtnSettingsSelectItemType("#")}
          >
            # = NONE
          </button>
          <hr className="hr" />
        </div>
        <div>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg m-1"
              style={{ width: this.props.buttonWidthLong }}
              onClick={this.props.onHandleBtnSettingsSmaller}
            >
              SMALLER
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg m-1"
              style={{ width: this.props.buttonWidthLong }}
              onClick={this.props.onHandleBtnSettingsBigger}
            >
              BIGGER
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg m-1"
              style={{ width: this.props.buttonWidthLong }}
              onClick={this.props.onHandleBtnSettingsRemoveColumn}
            >
              REMOVE COLUMN
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg m-1"
              style={{ width: this.props.buttonWidthLong }}
              onClick={this.props.onHandleBtnSettingsAddColumn}
            >
              ADD COLUMN
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg m-1"
              style={{ width: this.props.buttonWidthLong }}
              onClick={this.props.onHandleBtnSettingsRemoveRow}
            >
              REMOVE ROW
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg m-1"
              style={{ width: this.props.buttonWidthLong }}
              onClick={this.props.onHandleBtnSettingsAddRow}
            >
              ADD ROW
            </button>
          </div>
        </div>
        <div>
          <hr className="hr" />
          <button
            type="button"
            className="btn btn-secondary btn-lg m-1"
            style={{ width: this.props.buttonWidthLong }}
            onClick={this.props.onHandleBtnSettingsCancel}
          >
            CANCEL
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg m-1"
            style={{ width: this.props.buttonWidthLong }}
            onClick={this.props.onHandleBtnSettingsSave}
          >
            SAVE
          </button>
          <hr className="hr" />
        </div>
      </div>
    );
  }
}

export default SettingsPanel;
