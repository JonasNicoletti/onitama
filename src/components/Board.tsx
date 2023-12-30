import { Piece, Coordinate, Turn } from "../types";
import { Cell } from "./Cell";

export function Board({ pieces, selectedPiece, possibileMoves, turn, onCellClicked }: { pieces: Map<string, Piece>, selectedPiece?: string, possibileMoves: Coordinate[], turn: Turn, onCellClicked: (key: string) => void }) {

  return (
    Array(5).fill(null).map((_, x) => Array(5).fill(null).map((_, y) => <Cell onClick={onCellClicked} isSelected={selectedPiece == `${x}${y}`} key={`${x}${y}`} x={x} y={y} isPossibileMove={possibileMoves.some(c => c.x == x && c.y == y)} turn={turn} pieceType={pieces.get(`${x}${y}`)} />))
  )
}