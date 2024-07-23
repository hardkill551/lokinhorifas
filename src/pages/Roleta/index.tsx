import { RewardContextProvider } from 'contexts/RewardContext';
import LastEarnedPrizeGrid from './rolettaComponents/LastEarnedPrizeGrid';
import Hero from './rolettaComponents/Roleta';

import { PersonCardStateProvider } from 'contexts/PersonCardContext';
import { LastEarnedContextProvider } from 'contexts/LastEarnedContext';
import RoletaWinner from './rolettaComponents/WinnerPopup';

const TempRoleta = () => {
  return (
    <>
      <LastEarnedContextProvider>
        <RewardContextProvider>
        <PersonCardStateProvider>
          <Hero />
          <LastEarnedPrizeGrid />
          <RoletaWinner />
        </PersonCardStateProvider>
        </RewardContextProvider>
      </LastEarnedContextProvider>
    </>
  );
}
 
export default TempRoleta;