import { RewardContextProvider } from 'contexts/RewardContext';
import LastEarnedPrizeGrid from './rolettaComponents/LastEarnedPrizeGrid';
import Hero from './rolettaComponents/Roleta';

import { PersonCardStateProvider } from 'contexts/PersonCardContext';
import { LastEarnedContextProvider } from 'contexts/LastEarnedContext';
import RoletaWinner from './rolettaComponents/WinnerPopup';
import { RouletteProvider } from 'contexts/RouletteContext';

const TempRoleta = () => {
  return (
    <>
      <LastEarnedContextProvider>
        <RouletteProvider>
        <RewardContextProvider>
        <PersonCardStateProvider>
          <Hero />
          <LastEarnedPrizeGrid />
          <RoletaWinner />
        </PersonCardStateProvider>
        </RewardContextProvider>
        </RouletteProvider>
      </LastEarnedContextProvider>
    </>
  );
}
 
export default TempRoleta;