
export type Piece = 'blue' | 'red' | 'king_blue' | 'king_red' | 'move'

export type Coordinate = { x: number, y: number }

export type Move = {
  id: number
  coords: Coordinate[]
  isSelected: boolean
}

export interface Cards {
  red: Move[]
  left?: Move
  right: Move
  blue: Move[]
}

export type Turn = 'blue' | 'red'