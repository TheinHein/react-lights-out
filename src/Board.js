import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";
class Board extends Component {
  static defaultProps = {
    nrows: 3,
    ncols: 3,
    chanceLightStartsOn: 50, // ? 50% probability of light starts on
  };
  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      hasWon: false,
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  createBoard() {
    let board = [];

    board = Array.from({ length: this.props.ncols }).map((ele) =>
      Array.from({ length: this.props.nrows }).map(
        (ele) => Math.random() < this.props.chanceLightStartsOn / 100
      )
    );

    return board;
  }

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    // 0[0,1,2] 00 01 02
    // 1[0,1,2] 10 11 12
    // 2[0,1,2] 20 21 22
    let total = 0;
    for (let arr of board) {
      if (arr.includes(true)) {
        total += 1;
      }
    }

    this.setState({ board }, () => {
      if (total === 0) {
        this.setState({ hasWon: true });
      } else {
        this.setState({ hasWon: false });
      }
    });
  }

  render() {
    const isPlaying = !this.state.hasWon;
    const hasWon = this.state.hasWon;
    return (
      <div className="Board">
        {isPlaying && (
          <div className="Board-section">
            <div className="Board-title">
              <p>
                <span className="Board-neonText1">Light </span>
                <span className="Board-neonText2">Out</span>
              </p>
            </div>
            <table>
              <tbody>
                {this.state.board.map((ele, i) => (
                  <tr key={i}>
                    {this.state.board[i].map((ele, j) => (
                      <Cell
                        isLit={this.state.board[i][j]}
                        key={`${i}-${j}`}
                        flipCellsAround={this.flipCellsAround}
                        coord={`${i}-${j}`}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {hasWon && (
          <div className="Board-section">
            <p className="Board-win">YOU WIN!!!</p>
          </div>
        )}
      </div>
    );
  }
}
export default Board;
