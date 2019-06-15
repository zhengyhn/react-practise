import React from 'react';
import ReactDOM from 'react-dom';
import {Board} from './Board'
import './index.css';

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      currentStep: 0,
      selectedIndex: -1,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentStep + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const nextStep = history.length
    this.setState({
      history: history.concat([{squares}]),
      currentStep: nextStep,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(i) {
    this.setState({
      currentStep: i,
      selectedIndex: i,
      xIsNext: (i & 1) === 0
    });
  }

  playBack() {
    this.setState({
      currentStep: 0,
      selectedIndex: 0,
      xIsNext: true
    });
    var intervalID = setInterval(() => {
      this.setState({
        currentStep: this.state.currentStep + 1,
        selectedIndex: this.state.selectedIndex + 1,
        xIsNext: (this.state.currentStep & 1) === 0
      });     
      if (this.state.currentStep >= this.state.history.length - 1) {
        clearInterval(intervalID);
        this.setState({
          xIsNext: (this.state.currentStep & 1) === 0
        })
      }
    }, 1000)
  }

  render() {
    const history = this.state.history
    
    const moves = history.map((item, index) => {
      const desc = index > 0 ? `Go to move ${index}` : `Go to game start`
      const textHtml = this.state.selectedIndex === index ? (<b>{desc}</b>) : desc
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{textHtml}</button>
        </li>
      )
    })
    const current = history[this.state.currentStep]
    const winner = calculateWinner(current.squares);
    let status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    if (winner) {
      status = `Winner: ${winner}`
    } else if (history.length > 9) {
      status = `No Winner, it's draw`
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <div><button onClick={() => this.playBack()}>Play back</button></div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}