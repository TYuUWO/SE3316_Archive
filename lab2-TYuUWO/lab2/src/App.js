import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: [["empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty"],["empty","empty","empty","empty","empty","empty","empty"]],
      yellowNext: true,
    };
  }
  calculateWinnerYellow(squares) {
    // horizontalCheck
      for (var i = 0; i<7-3 ; i++ ){
          for (var j = 0; j<6; j++){
              if ((squares[i])[j] === "yellow" && squares[i][j+1] === "yellow" && squares[i][j+2] === "yellow" && squares[i][j+3] === "yellow"){
                  return true;
              }
          }
      }
      // verticalCheck
      for (j = 0; j<7-3 ; j++ ){
          for (i = 0; i<6; i++){
              if (squares[i][j] === "yellow" && squares[i+1][j] === "yellow" && squares[i+2][j] === "yellow" && squares[i+3][j] === "yellow"){
                  return true;
              }
          }
      }
      // ascendingDiagonalCheck
      for (j=3; j<7; j++){
          for (i=0; i<6-3; i++){
              if (squares[i][j] === "yellow" && squares[i-1][j+1] === "yellow" && squares[i-2][j+2] === "yellow" && squares[i-3][j+3] === "yellow")
                  return true;
          }
      }
      // descendingDiagonalCheck
      for (j=3; j<7; j++){
          for (i=3; i<6; i++){
              if (squares[i][j] === "yellow" && squares[i-1][j-1] === "yellow" && squares[i-2][j-2] === "yellow" && squares[i-3][j-3] === "yellow")
                  return true;
          }
      }
      return false;
    }
  calculateWinnerRed(squares) {
    // horizontalCheck
      for (var j = 0; j<7-3 ; j++ ){
          for (var i = 0; i<6; i++){
              if (squares[i][j] === "red" && squares[i][j+1] === "red" && squares[i][j+2] === "red" && squares[i][j+3] === "red"){
                  return true;
              }
          }
      }
      // verticalCheck
      for (j = 0; j<7-3 ; j++ ){
          for (i = 0; i<6; i++){
              if (squares[i][j] === "red" && squares[i+1][j] === "red" && squares[i+2][j] === "red" && squares[i+3][j] === "red"){
                  return true;
              }
          }
      }
      // ascendingDiagonalCheck
      for (j=3; j<7; j++){
          for (i=0; i<6-3; i++){
              if (squares[i][j] === "red" && squares[i-1][j+1] === "red" && squares[i-2][j+2] === "red" && squares[i-3][j+3] === "red")
                  return true;
          }
      }
      // descendingDiagonalCheck
      for (j=3; j<7; j++){
          for (i=3; i<6; i++){
              if (squares[i][j] === "red" && squares[i-1][j-1] === "red" && squares[i-2][j-2] === "red" && squares[i-3][j-3] === "red")
                  return true;
          }
      }
      return false;
    }
    handleClick(i){
      var row = ~~(i/10); //row number equal to tens digit
      var column = (i%10); //column number equal to ones digit
      const squares = this.state.squares.slice();
      if (this.calculateWinnerYellow(squares) || this.calculateWinnerRed(squares) || squares[row][column] === "red" || squares[row][column] === "yellow") {
        return;
      }
      squares[row][column] = this.state.yellowNext ? 'yellow' : 'red';
      var className = this.state.yellowNext ? 'yellowSquare' : 'redSquare';
      document.getElementById(i).className = className;
      this.setState({
        squares: squares,
        yellowNext: !this.state.yellowNext,
      });
    }
    renderSquare(i) {
      return <button class="square" id={i}
      onClick={()=>this.handleClick(i)}
      />;
  }
  render() {
    const yellowWinner = this.calculateWinnerYellow(this.state.squares);
    const redWinner = this.calculateWinnerRed(this.state.squares);
    let status = "";
    if (yellowWinner) {
      status = 'Winner: Yellow';
    } else if (redWinner) {
      status = 'Winner: Red';
    }
    else {
      status = 'Next player: ' +  (this.state.yellowNext ? 'Yellow' : 'Red');
    }
    //7x6 board, 6 rows of 7 squares to be rendered
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
        </div>
        <div className="board-row">
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
        </div>
        <div className="board-row">
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
        </div>
        <div className="board-row">
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
          {this.renderSquare(45)}
          {this.renderSquare(46)}
        </div>
        <div className="board-row">
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
          {this.renderSquare(54)}
          {this.renderSquare(55)}
          {this.renderSquare(56)}
        </div>
        </div>
    );
  }
}

class Connect4Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


function App() {
  //displays the game
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Connect 4
        </h1>
        <Connect4Game/>
        <p>
          powered by React
        </p>
      </header>
    </div>
  );
}

export default App;
