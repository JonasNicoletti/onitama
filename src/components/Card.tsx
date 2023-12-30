import { Grid, GridItem } from "@chakra-ui/react";
import { Move } from "../types";

export function Card({ move, onClick }: { move?: Move, onClick: () => void }) {
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
  