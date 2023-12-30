import { Center, Flex, Grid, GridItem, HStack, Button, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, VStack, Spinner, Heading, Divider, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { functions, client } from './lib/appwrite';
import { Piece, Coordinate, Turn, Cards, Move } from './types';
import { Card } from './components/Card';
import { Board } from './components/Board';

function App() {
  const [userColor, setUserColor] = useState<Turn | undefined>();
  const [gameId, setGameId] = useState<string | undefined>();
  const [gameIdToJoin, setGameIdToJoin] = useState<string | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isFindGameLoading, setIsFingGameLoading] = useState(false);
  const [turn, setTurn] = useState<Turn>('blue');
  const [pieces, setPieces] = useState(new Map<string, Piece>());
  const [selectedPieceKey, setSelectedPieceKey] = useState<string | undefined>();
  const [possibileMoves, setPossibileMoves] = useState([] as Coordinate[]);

  const [cards, setCards] = useState<Cards>();

  function onCardClicked(move?: Move) {
    if (!move || !cards || turn !== userColor) {
      return
    }

    if (turn == 'blue') {
      if (cards.blue[0].id == move.id) {
        cards.blue[0].isSelected = true;
        cards.blue[1].isSelected = false;

      }
      if (cards.blue[1].id == move.id) {
        cards.blue[1].isSelected = true;
        cards.blue[0].isSelected = false;
      }
    }
    if (turn == 'red') {
      if (cards.red[0].id == move.id) {
        cards.red[0].isSelected = true;
        cards.red[1].isSelected = false;

      }
      if (cards.red[1].id == move.id) {
        cards.red[1].isSelected = true;
        cards.red[0].isSelected = false;
      }
    }
    setCards({ ...cards })
    if (selectedPieceKey) {
      onCellClicked(selectedPieceKey)
    }
  }

  async function onCellClicked(key: string) {
    if (pieces.get(key)?.endsWith(turn) && cards) {
      let moves = [] as Coordinate[]
      if (turn == 'blue') {
        moves = cards.blue[0].isSelected ? cards.blue[0].coords : cards.blue[1].isSelected ? cards.blue[1].coords : [];
      } else {
        moves = cards.red[0].isSelected ? cards.red[0].coords : cards.red[1].isSelected ? cards.red[1].coords : [];
      }
      setSelectedPieceKey(key);
      const newPossibileMoves = [] as Coordinate[];
      const [x, y] = key.split("")
      moves.forEach((c) => {
        const newX = parseInt(x, 10) + c.x;
        const newY = parseInt(y, 10) + c.y;
        if (!pieces.get(`${newX}${newY}`)?.endsWith(turn)) {
          newPossibileMoves.push({ x: newX, y: newY })
        }
      })
      setPossibileMoves(newPossibileMoves)
    }
    else {
      if (possibileMoves.some(c => `${c.x}${c.y}` == key) && selectedPieceKey) {
        const piece = pieces.get(selectedPieceKey)!
        pieces.delete(selectedPieceKey)
        pieces.set(key, piece)
        setPieces(new Map([...pieces]))
        setPossibileMoves([])
        if (cards) {
          cards.blue[0].isSelected = false
          cards.blue[1].isSelected = false
          cards.red[0].isSelected = false
          cards.red[1].isSelected = false
        }

        const gameState = {
          cards: cards,
          turn: turn == 'blue' ? 'red' : 'blue',
          board: [...pieces.entries()]
        }
        await makeMove(gameState);
      }

    }

  }

  useEffect(() => {
    if (gameId) {
      const _sub = client.subscribe(`databases.658e8b7a8f023b55d21f.collections.658e8b9c6ca95d637a2f.documents.${gameId}`, (p) => {
        const state = JSON.parse((p.payload as any)['state']);
        console.log(state);

        setCards(state['cards'])
        setPieces(new Map(state['board']))
        setTurn(state['turn'])
        setSelectedPieceKey(undefined)
        setPossibileMoves([])
        onClose()
      });
      return () => {
        console.log("unsub");
        _sub()
      };
    }
  }, [gameId])

  async function createGame() {
    try {
      const res = await functions.createExecution(
        '658e8d1df272d9ffccba',
        JSON.stringify({ "player_1": "blue" }),
        false,
        '/',
        'POST',
        { 'Content-Type': 'application/json' }
      );
      const gID = JSON.parse(res.responseBody)['$id'];
      setGameId(gID);
      setUserColor('blue');
      onOpen();
    } catch (e) {
      console.warn(e);
    }
  }

  async function joinGame() {
    setIsFingGameLoading(true)
    try {
      if (gameIdToJoin) {
        const res = await functions.createExecution(
          '65903006d447844ec727',
          JSON.stringify({ "id": gameIdToJoin, "player_2": "red" }),
          false,
          '/',
          'POST',
          { 'Content-Type': 'application/json' }
        );
        const state = JSON.parse(JSON.parse(res.responseBody)['state']);
        setGameId(JSON.parse(res.responseBody)['$id']);
        setCards(state['cards'])
        setPieces(new Map(state['board']))
        setTurn(state['turn'])
        setUserColor('red');
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsFingGameLoading(false)
    }
  }

  async function makeMove(gameState: any) {
    try {
      const res = await functions.createExecution(
        '6590622751127c913e58',
        JSON.stringify({ "id": gameId, state: JSON.stringify(gameState) }),
        false,
        '/',
        'POST',
        { 'Content-Type': 'application/json' }
      );
      const state = JSON.parse(JSON.parse(res.responseBody)['state']);
      setGameId(JSON.parse(res.responseBody)['$id']);
      setCards(state['cards'])
      setPieces(new Map(state['board']))
      setTurn(state['turn'])

    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading p={2} as='h5' size='md'> Game {gameId}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack>

              <Heading p={2} as='h5' size='md'>Waiting for opponent to join</Heading>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                p={2}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal >
      <Grid h='100vh'
        templateRows='1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr'
        templateColumns='1fr 4fr 1fr'
        gap={2}
        bg='gray.100'>
        <GridItem rowSpan={1} colSpan={9} bg='gray.300' boxShadow='base' p='6' rounded='md' >
          <HStack>
            <Button onClick={createGame} colorScheme='teal'>New Game</Button>
            <Input placeholder='Game ID' onChange={(e) => setGameIdToJoin(e.target.value)} value={gameIdToJoin} bg='whitesmoke' width={300} marginLeft='auto' />
            <Button
              isLoading={isFindGameLoading}
              loadingText='Loading'
              colorScheme='teal'
              variant='outline'
              onClick={joinGame}
            >
              Join Game
            </Button>
          </HStack>
        </GridItem>
        <GridItem rowSpan={1} colStart={2} bg='gray.500' boxShadow='base' p='6' rounded='md' >
          <HStack spacing={8} h='100%' w='100%'>
            {
              cards ?
                <Flex h='100%' w='100%' alignItems='center' justifyContent='space-evenly' >
                  {/* opponent cards */}
                  <Card move={cards.red[0]} onClick={() => onCardClicked(cards.red[0])} />
                  <Card move={cards.red[1]} onClick={() => onCardClicked(cards.red[1])} />
                </Flex>
                : undefined
            }

          </HStack>
        </GridItem>
        <GridItem rowStart={4} rowSpan={3} bg='gray.500' boxShadow='base' p='6' rounded='md' >
          {
            cards ?
              <Center h='100%'>
                {/* left card */}
                <Card move={cards.left} onClick={() => onCardClicked(cards.left)} />
              </Center>
              : undefined
          }

        </GridItem>
        <GridItem rowSpan={7} colStart={2}>
          <Grid
            h='100%'
            templateRows='repeat(5, 1fr)'
            templateColumns='repeat(5, 1fr)'
            gap={1}
          >
            <Board pieces={pieces} selectedPiece={selectedPieceKey} possibileMoves={possibileMoves} turn={turn} onCellClicked={onCellClicked} />
          </Grid>
        </GridItem>
        <GridItem rowStart={4} rowSpan={3} colStart={3} bg='gray.500' boxShadow='base' p='6' rounded='md' >
          {
            cards ?
              <Center h='100%'>
                {/* right card */}
                <Card move={cards.right} onClick={() => onCardClicked(cards.right)} />
              </Center>
              : undefined
          }
        </GridItem>
        <GridItem rowSpan={1} colStart={2} bg='gray.500' boxShadow='base' p='6' rounded='md' >
          <HStack spacing={8} h='100%' w='100%'>
            {
              cards ?
                <Flex h='100%' w='100%' alignItems='center' justifyContent='space-evenly' >
                  {/* my cards */}
                  <Card move={cards.blue[0]} onClick={() => onCardClicked(cards.blue[0])} />
                  <Card move={cards.blue[1]} onClick={() => onCardClicked(cards.blue[1])} />
                </Flex>
                : undefined
            }
          </HStack>
        </GridItem>
      </Grid>
    </>
  )
}

export default App
