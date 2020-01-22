import React, { Component } from "react";

class Background extends Component {
  render() {
    return (
      <svg width="100%" height="100%">
        {/*</svg>Let's define the pattern
        The width and height should be double the size of a single checker*/}
        <pattern
          id="pattern-checkers"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          {/*Two instances of the same checker, only positioned apart on the `x` and `y` axis
          We will define the `fill` in the CSS for flexible use */}
          <rect
            style={{ fill: "#dddddd" }}
            x="0"
            width="50"
            height="50"
            y="0"
          />
          <rect
            style={{ fill: "#dddddd" }}
            x="50"
            width="50"
            height="50"
            y="50"
          />
        </pattern>

        {/* Define the shape that will contain our pattern as the fill */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#pattern-checkers)"
        />
      </svg>
    );
  }
}

export default Background;
