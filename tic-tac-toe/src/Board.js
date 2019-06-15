import React from 'react';

const Square = (props) => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

export class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    let board = []
    for (let i = 0; i < 3; ++i) {
      board.push(
        <div className="board-row">
        {[0, 1, 2].map((j) => this.renderSquare(i * 3 + j))}
        </div>
      )
    }
    return (
      <div>
        {board}
      </div>
    );
  }
}
