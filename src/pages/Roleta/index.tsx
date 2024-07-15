import style from './roletta.module.css'
import LastEarnedPrizeGrid from './rolettaComponents/LastEarnedPrizeGrid';
import Hero from './rolettaComponents/Roleta';

import { PersonCardStateProvider } from 'contexts/PersonCardContext';

const TempRoleta = () => {
  return (
    <>
      <PersonCardStateProvider>
        <Hero />
        <LastEarnedPrizeGrid />
      </PersonCardStateProvider>
    </>
  );
}
 
export default TempRoleta;