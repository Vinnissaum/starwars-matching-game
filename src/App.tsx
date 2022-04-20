import { useEffect, useState, useTransition } from 'react';
import * as C from './App.styles';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import Logo from './svgs/main-logo.svg';
import RestartSvg from './svgs/restart.svg';
import { GridItemType } from './types/GridItemType';
import {items} from './data/items';
import { GridItem } from './components/GridItem';

const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => restartHandleClick, []);

  const restartHandleClick = () => {
    // Step 1 - game reset
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
    setGridItems([]);

    // Step 2 - grid create
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++){
      tmpGrid.push({item: null, shown: false, permanentShow: false});
    }
    for (let w = 0; w < 2; w++){
      for (let i = 0; i < items.length; i++){
        let position = -1;
        while (position < 0 || tmpGrid[position].item !== null){
          position = Math.floor(Math.random() * (items.length * 2)); 
        }
        tmpGrid[position].item = i;
      }
    }

    setGridItems(tmpGrid);

    // Step 3 - start the game
    setPlaying(true);
  }

  const handleItemClick = (index: number) =>{

  }

  return(
    <C.Container>
      <C.Info>
        <C.Logo>
          <img src={Logo} alt="" width='200'/>
          <span>MATCHING GAME</span>
        </C.Logo>
        <C.InfoArea>
          <InfoItem label='Tempo:' value='00:00'/>
          <InfoItem label='Movimentos:' value='0'/>
        </C.InfoArea>
        <Button label='Restart' icon={RestartSvg} onClick={restartHandleClick}/>
      </C.Info>
      <C.GameArea>
        <C.Grid>
          {gridItems.map((item, index)=>(
            <GridItem key={index} item={item} onClick={()=> handleItemClick(index)}/>
          ))}
        </C.Grid>
      </C.GameArea>
    </C.Container>
  );
}

export default App;