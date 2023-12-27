import { Center, Icon, Flex, Grid, GridItem, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

function Card({ move, onClick }: { move?: Move, onClick: () => void }) {
  if (!move) {
    return;
  }
  return (
    <Grid
      h={120}
      templateRows='repeat(5, 1fr)'
      templateColumns='repeat(5, 1fr)'
      w={120}
      boxShadow={move.isSelected ? 'selected' : 'dark-lg'}
      rounded='md'
      bg='gray.200'
      onClick={onClick}
    >
      {Array(5).fill(null).map((_, x) => Array(5).fill(null).map((_, y) => {
        let bgColor;
        if (x == 2 && y == 2) {
          bgColor = 'black'
        }
        if (move?.coords.some(coord => 2 + coord.x == x && 2 + coord.y == y)) {
          bgColor = 'gray.500'
        }
        return (
          <GridItem key={`${x}${y}`} border='1px' borderColor='gray.300' bg={bgColor} />
        )
      }))
      }
    </Grid>

  )

}

function Cell({ x, y, isSelected, isPossibileMove, pieceType, onClick }: { x: number, y: number, isSelected: boolean, isPossibileMove: boolean, pieceType?: Piece, onClick: (key: string) => void }) {
  let color = 'orange.300'
  if (x == 0 && y == 2) {
    color = 'red.300'
  }
  if (x == 4 && y == 2) {
    color = 'blue.300'
  }
  if (isPossibileMove) {
    color = 'blue.200'
  }
  let icon;
  let iconColor;
  switch (pieceType) {
    case 'blue':
      iconColor = '#0026FC'
      icon =
        <path d="M312.07 194.46A56.07 56.07 0 1 1 256 138.39a56.07 56.07 0 0 1 56.07 56.07zM406 418.01H106v60h300v-60zM282.33 261.52a71.81 71.81 0 0 1-52.15.2c-.73 58.91-62.35 114.06-96.75 140.28H378.9c-34.09-26.33-95.44-81.78-96.57-140.48z" fill="#0026FC" fillOpacity="1"></path>
      break;
    case 'king_blue':
      iconColor = '#0026FC'
      icon =  <path d="M356.1 32.57l50 25c-2.2 8.68-9.2 22.47-20.1 37.29C372.7 113 354.4 133.3 335.6 152c-18.7 18.8-38.1 36.2-53.5 48.7-7.7 6.2-14.5 11.3-19.6 14.6-2.5 1.6-4.6 2.9-6 3.6-.3.1-.3.1-.5.1s-.2 0-.5-.1c-1.4-.7-3.5-2-6-3.6-5.1-3.3-11.9-8.4-19.6-14.6-15.4-12.5-34.8-29.9-53.5-48.7-18.8-18.7-37.1-39-50.4-57.13-10.9-14.83-17.9-28.62-20.1-37.3l50-25c14.6 29.73 29.3 62.14 44.2 90.03 16.2 30.5 31.6 55.7 51.9 65.9l4 2 4-2c20.3-10.2 35.7-35.4 51.9-65.9 14.9-27.89 29.6-60.31 44.2-90.03zM256 141.4c7.9 0 15.5.7 22.7 1.9-8.2 12.2-16 21.5-22.7 26.5-6.7-5-14.5-14.3-22.7-26.5 7.2-1.2 14.8-1.9 22.7-1.9zm83.1 32.5c23.3 22.7 35.9 54.6 35.9 86.5v.6c-33-12-75.9-17.6-119-17.6-43.1 0-86 5.6-119 17.6v-.6c0-31.9 12.6-63.8 35.9-86.5 16.2 15.6 32.2 29.8 45.7 40.7 8 6.5 15.1 11.9 21 15.7 2.9 2 5.5 3.5 8 4.7 2.5 1.2 4.4 2.4 8.4 2.4s5.9-1.2 8.4-2.4 5.1-2.7 8-4.7c5.9-3.8 13-9.2 21-15.7 13.5-10.9 29.5-25.1 45.7-40.7zm64.3 38.3c20.6 20 31.5 26.2 63.8 37.3-12.6 24.9-25.9 47.1-57 61.2l-17.3-52c-.1-5.7-.5-11.4-1.3-17.1zm-294.8 0l11.8 29.4c-.8 5.7-1.2 11.4-1.3 17.1l-17.3 52c-31.11-14.1-44.41-36.3-57.01-61.2 32.3-11.1 43.2-17.3 63.81-37.3zM265 261.5c45.1.9 89.3 8.7 117.2 22.2l28.4 85-43.3-19.8c-3.9-23.6-6.3-46.3-6.3-58.5v-14.6l-13 6.5c-27.9 14-55.5 21.6-83 23zm-18 0v43.8c-27.5-1.4-55.1-9-83-23l-13-6.5v14.6c0 12.2-2.4 34.9-6.3 58.5l-43.3 19.8 28.4-85c27.9-13.5 72.1-21.3 117.2-22.2zm96.6 42.8c1.3 18.6 4.8 43.5 9.6 67.6 3 15.4 6.6 30.2 10.5 42.4 3.9 12.3 7.3 21.8 13.9 28.5l2.7 2.6h3.7c14.1 0 38.9 1.2 52.7 9.6-1.8 1.4-4.8 3.2-8.7 4.9-9.4 4-23.9 7.7-41.5 10.6-35.2 5.9-82.9 8.9-130.5 8.9-47.6 0-95.3-3-130.5-8.9-17.6-2.9-32.11-6.6-41.51-10.6-3.9-1.7-6.9-3.5-8.7-4.9 13.7-8.4 38.61-9.6 52.71-9.6h3.7l2.7-2.6c6.6-6.7 10-16.2 13.9-28.5 3.9-12.2 7.5-27 10.5-42.4 4.8-24.1 8.3-49 9.6-67.6 58 25.3 117.2 25.3 175.2 0zm-202.8 66.2c-2.9 14.1-6.2 27.6-9.6 38.4-2.9 9.1-6.1 15.3-8.1 18.5-11.2-.1-27.71 0-43.01 5.1l13.5-40.4zm230.4 0l47.2 21.6 13.5 40.4c-15.3-5.1-31.8-5.2-43-5.1-2-3.2-5.2-9.4-8.1-18.5-3.4-10.8-6.7-24.3-9.6-38.4z" fill="#0026FC" fillOpacity="1"></path>
      break;
    case 'red':
      iconColor = '#D0021B'
      icon =  <path d="M312.07 194.46A56.07 56.07 0 1 1 256 138.39a56.07 56.07 0 0 1 56.07 56.07zM406 418.01H106v60h300v-60zM282.33 261.52a71.81 71.81 0 0 1-52.15.2c-.73 58.91-62.35 114.06-96.75 140.28H378.9c-34.09-26.33-95.44-81.78-96.57-140.48z" fill="#D0021B" fillOpacity="1"></path>
      break;
    case 'king_red':
      iconColor = '#D0021B'
      icon =  <path d="M356.1 32.57l50 25c-2.2 8.68-9.2 22.47-20.1 37.29C372.7 113 354.4 133.3 335.6 152c-18.7 18.8-38.1 36.2-53.5 48.7-7.7 6.2-14.5 11.3-19.6 14.6-2.5 1.6-4.6 2.9-6 3.6-.3.1-.3.1-.5.1s-.2 0-.5-.1c-1.4-.7-3.5-2-6-3.6-5.1-3.3-11.9-8.4-19.6-14.6-15.4-12.5-34.8-29.9-53.5-48.7-18.8-18.7-37.1-39-50.4-57.13-10.9-14.83-17.9-28.62-20.1-37.3l50-25c14.6 29.73 29.3 62.14 44.2 90.03 16.2 30.5 31.6 55.7 51.9 65.9l4 2 4-2c20.3-10.2 35.7-35.4 51.9-65.9 14.9-27.89 29.6-60.31 44.2-90.03zM256 141.4c7.9 0 15.5.7 22.7 1.9-8.2 12.2-16 21.5-22.7 26.5-6.7-5-14.5-14.3-22.7-26.5 7.2-1.2 14.8-1.9 22.7-1.9zm83.1 32.5c23.3 22.7 35.9 54.6 35.9 86.5v.6c-33-12-75.9-17.6-119-17.6-43.1 0-86 5.6-119 17.6v-.6c0-31.9 12.6-63.8 35.9-86.5 16.2 15.6 32.2 29.8 45.7 40.7 8 6.5 15.1 11.9 21 15.7 2.9 2 5.5 3.5 8 4.7 2.5 1.2 4.4 2.4 8.4 2.4s5.9-1.2 8.4-2.4 5.1-2.7 8-4.7c5.9-3.8 13-9.2 21-15.7 13.5-10.9 29.5-25.1 45.7-40.7zm64.3 38.3c20.6 20 31.5 26.2 63.8 37.3-12.6 24.9-25.9 47.1-57 61.2l-17.3-52c-.1-5.7-.5-11.4-1.3-17.1zm-294.8 0l11.8 29.4c-.8 5.7-1.2 11.4-1.3 17.1l-17.3 52c-31.11-14.1-44.41-36.3-57.01-61.2 32.3-11.1 43.2-17.3 63.81-37.3zM265 261.5c45.1.9 89.3 8.7 117.2 22.2l28.4 85-43.3-19.8c-3.9-23.6-6.3-46.3-6.3-58.5v-14.6l-13 6.5c-27.9 14-55.5 21.6-83 23zm-18 0v43.8c-27.5-1.4-55.1-9-83-23l-13-6.5v14.6c0 12.2-2.4 34.9-6.3 58.5l-43.3 19.8 28.4-85c27.9-13.5 72.1-21.3 117.2-22.2zm96.6 42.8c1.3 18.6 4.8 43.5 9.6 67.6 3 15.4 6.6 30.2 10.5 42.4 3.9 12.3 7.3 21.8 13.9 28.5l2.7 2.6h3.7c14.1 0 38.9 1.2 52.7 9.6-1.8 1.4-4.8 3.2-8.7 4.9-9.4 4-23.9 7.7-41.5 10.6-35.2 5.9-82.9 8.9-130.5 8.9-47.6 0-95.3-3-130.5-8.9-17.6-2.9-32.11-6.6-41.51-10.6-3.9-1.7-6.9-3.5-8.7-4.9 13.7-8.4 38.61-9.6 52.71-9.6h3.7l2.7-2.6c6.6-6.7 10-16.2 13.9-28.5 3.9-12.2 7.5-27 10.5-42.4 4.8-24.1 8.3-49 9.6-67.6 58 25.3 117.2 25.3 175.2 0zm-202.8 66.2c-2.9 14.1-6.2 27.6-9.6 38.4-2.9 9.1-6.1 15.3-8.1 18.5-11.2-.1-27.71 0-43.01 5.1l13.5-40.4zm230.4 0l47.2 21.6 13.5 40.4c-15.3-5.1-31.8-5.2-43-5.1-2-3.2-5.2-9.4-8.1-18.5-3.4-10.8-6.7-24.3-9.6-38.4z" fill="#d0021b" fillOpacity="1"></path>
      break;
    default:
      break;
  }
  return (
    <GridItem boxShadow='inner' p='4' rounded='md' bg={color} >
      <Center >
        <Icon color={iconColor} viewBox='0 0 512 512' onClick={() => onClick(`${x}${y}`)} boxSize={16} transform={isSelected ? 'scale(1.5)' : undefined} >
          {icon}
        </Icon>
      </Center>
    </GridItem>
  )
}

function Board({ pieces, selectedPiece, possibileMoves, onCellClicked }: { pieces: Map<string, Piece>, selectedPiece?: string, possibileMoves: Coordinate[], onCellClicked: (key: string) => void }) {
  return (
    Array(5).fill(null).map((_, x) => Array(5).fill(null).map((_, y) => <Cell onClick={onCellClicked} isSelected={selectedPiece == `${x}${y}`} key={`${x}${y}`} x={x} y={y} isPossibileMove={possibileMoves.some(c => c.x == x && c.y == y)} pieceType={pieces.get(`${x}${y}`)} />))
  )
}

type Piece = 'blue' | 'red' | 'king_blue' | 'king_red' | 'move'

type Coordinate = { x: number, y: number }
type Move = {
  id: number
  coords: Coordinate[]
  isSelected: boolean
}
interface Cards {
  opponent: Move[]
  left?: Move
  right: Move
  mine: Move[]
}
type Turn = 'Opponent' | 'Hero'
function App() {
  const [turn, setTurn] = useState<Turn>('Hero');
  const [pieces, setPieces] = useState(new Map<string, Piece>());
  const [selectedPieceKey, setSelectedPieceKey] = useState<string | undefined>();
  const [possibileMoves, setPossibileMoves] = useState([] as Coordinate[]);

  const [cards, setCards] = useState(
    {
      opponent: [
        { id: 1, coords: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: -1, y: -1 }, { x: -2, y: -2 }], isSelected: false },
        { id: 2, coords: [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }], isSelected: false }
      ],
      mine: [
        { id: 3, coords: [{ x: -1, y: 0 }, { x: 0, y: 2 }, { x: 0, y: -2 }], isSelected: false },
        { id: 4, coords: [{ x: -1, y: -1 }, { x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: 1 }], isSelected: false }
      ],
      right: { id: 5, coords: [{ x: 1, y: 1 }, { x: -1, y: -1 }, { x: -1, y: 0 }, { x: 1, y: 0 }], isSelected: false }
    } as Cards);

  useEffect(() => {
    setPieces(new Map(pieces.set("40", 'blue')))
    setPieces(new Map(pieces.set("41", 'blue')))
    setPieces(new Map(pieces.set("42", 'king_blue')))
    setPieces(new Map(pieces.set("43", 'blue')))
    setPieces(new Map(pieces.set("44", 'blue')))


    setPieces(new Map(pieces.set("00", 'red')))
    setPieces(new Map(pieces.set("01", 'red')))
    setPieces(new Map(pieces.set("02", 'king_red')))
    setPieces(new Map(pieces.set("03", 'red')))
    setPieces(new Map(pieces.set("04", 'red')))
  }, [])

  function onCardClicked(move?: Move) {
    if (!move) {
      return
    }

    if (turn == 'Hero') {
      if (cards.mine[0].id == move.id) {
        cards.mine[0].isSelected = true;
        cards.mine[1].isSelected = false;

      }
      if (cards.mine[1].id == move.id) {
        cards.mine[1].isSelected = true;
        cards.mine[0].isSelected = false;
      }
    }
    setCards({ ...cards })
    if (selectedPieceKey) {
      onCellClicked(selectedPieceKey)
    }
  }

  function onCellClicked(key: string) {
    if (turn == 'Hero') {
      if (pieces.get(key)?.endsWith("blue")) {
        const moves = cards.mine[0].isSelected ? cards.mine[0].coords : cards.mine[1].coords;
        setSelectedPieceKey(key);
        const newPossibileMoves = [] as Coordinate[];
        const [x, y] = key.split("")
        moves.forEach((c) => {
          const newX = parseInt(x, 10) + c.x;
          const newY = parseInt(y, 10) + c.y;
          if (!pieces.get(`${newX}${newY}`)?.endsWith("blue")) {
            newPossibileMoves.push({ x: newX, y: newY })
          }
        })
        setPossibileMoves(newPossibileMoves)
      }
      else {
        console.log(possibileMoves, selectedPieceKey);

        if (possibileMoves.some(c => `${c.x}${c.y}` == key) && selectedPieceKey) {
          const piece = pieces.get(selectedPieceKey)!
          pieces.delete(selectedPieceKey)
          pieces.set(key, piece)
          setPieces(new Map([...pieces]))
          setPossibileMoves([])
        }
      }
    }

  }

  return (
    <Grid h='100vh'
      templateRows='1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr'
      templateColumns='1fr 4fr 1fr'
      gap={2}
      bg='gray.100'>
      <GridItem rowSpan={1} colSpan={9} bg='gray.300' boxShadow='base' p='6' rounded='md' >
      </GridItem>
      <GridItem rowSpan={1} colStart={2} bg='gray.500' boxShadow='base' p='6' rounded='md' >
        <HStack spacing={8} h='100%' w='100%'>
          <Flex h='100%' w='100%' alignItems='center' justifyContent='space-evenly' >
            {/* opponent cards */}
            <Card move={cards.opponent[0]} onClick={() => onCardClicked(cards.opponent[0])} />
            <Card move={cards.opponent[1]} onClick={() => onCardClicked(cards.opponent[0])} />
          </Flex>
        </HStack>
      </GridItem>
      <GridItem rowStart={4} rowSpan={3} bg='gray.500' boxShadow='base' p='6' rounded='md' >
        <Center h='100%'>
          {/* left card */}
          <Card move={cards.left} onClick={() => onCardClicked(cards.left)} />
        </Center>
      </GridItem>
      <GridItem rowSpan={7} colStart={2}>
        <Grid
          h='100%'
          templateRows='repeat(5, 1fr)'
          templateColumns='repeat(5, 1fr)'
          gap={1}
        >
          <Board pieces={pieces} selectedPiece={selectedPieceKey} possibileMoves={possibileMoves} onCellClicked={onCellClicked} />
        </Grid>
      </GridItem>
      <GridItem rowStart={4} rowSpan={3} colStart={3} bg='gray.500' boxShadow='base' p='6' rounded='md' >
        <Center h='100%'>
          {/* right card */}
          <Card move={cards.right} onClick={() => onCardClicked(cards.right)} />
        </Center>
      </GridItem>
      <GridItem rowSpan={1} colStart={2} bg='gray.500' boxShadow='base' p='6' rounded='md' >
        <HStack spacing={8} h='100%' w='100%'>
          <Flex h='100%' w='100%' alignItems='center' justifyContent='space-evenly' >
            {/* my cards */}
            <Card move={cards.mine[0]} onClick={() => onCardClicked(cards.mine[0])} />
            <Card move={cards.mine[1]} onClick={() => onCardClicked(cards.mine[1])} />
          </Flex>
        </HStack>
      </GridItem>
    </Grid>
  )
}

export default App
