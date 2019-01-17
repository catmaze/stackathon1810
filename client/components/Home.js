import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <canvas id="tetris" />
        Score:
        <div id="score">0</div>
      </div>
    );
  }
}
