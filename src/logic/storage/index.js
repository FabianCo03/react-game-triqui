const saveGameToStorage = ({ board, turn }) => {
  //guardar partida
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

const resetGameToStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};

export { saveGameToStorage, resetGameToStorage };
