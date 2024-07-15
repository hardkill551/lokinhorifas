import { RewardContextProvider } from 'contexts/RewardContext';
import style from './roletta.module.css'
import LastEarnedPrizeGrid from './rolettaComponents/LastEarnedPrizeGrid';
import Hero from './rolettaComponents/Roleta';

import { PersonCardStateProvider } from 'contexts/PersonCardContext';
import { LastEarnedContextProvider } from 'contexts/LastEarnedContext';

const TempRoleta = () => {
  return (
    <>
      <LastEarnedContextProvider>
      <RewardContextProvider>
      <PersonCardStateProvider>
        <Hero />
        <LastEarnedPrizeGrid />
      </PersonCardStateProvider>
      </RewardContextProvider>
      </LastEarnedContextProvider>
    </>
  );
}
 
export default TempRoleta;