import Piece from "./piece.js";

/** Clase que representa a un jugador. */
class Player {

  /**
   * Crear un jugador.
   * @param x {number} - Posición en eje x.
   * @param y {number} - Posición en eje y.
   */
  constructor(x, y) {
    this.piece = new Piece();
    this.next_piece = new Piece();
    this.x = x;
    this.y = y;
    this.start_x = x;
    this.start_y = y;
    this.score = 0;
  }

  /**
   * Devuelve el jugador con mayor puntaje guardado en el almacenamiento local del navegador.
   * @return p {?Object} - Jugador con mayor puntaje.
   */
  static best() {
    let player_json = localStorage.getItem("player");
    let p;
    try {
      p = JSON.parse(player_json);
    } catch (error) {
      p = null;
    };
    return p;
  }

  /**
   * Dibuja la pieza actual en el tablero y la siguiente pieza en el "HUD".
   * @param context {CanvasRenderingContext2D}
   */
  draw(context) {
    this.piece.draw(context, this.x, this.y);
    this.next_piece.draw(context, 360, 125);
  }

  /**
   * Desplazar al jugador una celda hacia abajo.
   * @param cell_size {number} Tamaño de la celda.
   */
  drop(cell_size) {
    this.y += cell_size;
  }

  /**
   * Desplazar al jugador horizontalmente.
   * @param offset {number} Cantidad a desplazar.
   */
  move(offset) {
    this.x += offset;
  }

  /**
   * Volver al jugador a una posición inicial y crea una nueva pieza.
   */
  reset() {
    this.piece = this.next_piece;
    this.next_piece = new Piece();
    this.x = this.start_x;
    this.y = this.start_y;
  }

  /**
   * Volver al jugador a una posición inicial, crea dos nuevas piezas y vuelve
   * el puntaje del jugador a 0.
   */
  restart() {
    this.piece = new Piece();
    this.next_piece = new Piece();
    this.x = this.start_x;
    this.y = this.start_y;
    this.score = 0;
  }

  /**
   * Rotar la pieza actual del jugador.
   * @param dir {number} Dirección.
   */
  rotate(dir) {
    this.piece.rotate(dir);
  }

  /**
   * Guarda los datos del jugador actual en el almacenamiento local del
   * navegador en caso de superar el récord anterior.
   * @param username {string} Nombre de usuario actual.
   * @param best {Player} Jugador en el récord.
   */
  store(username, best) {
    const p = {
      score: this.score,
      username: username,
    }
    let player_json = JSON.stringify(p);
    if (best !== null) {
      if (this.score > best.score) {
        localStorage.setItem("player", player_json);
      }
    } else {
      localStorage.setItem("player", player_json);
    }
  }

}

export default Player;
