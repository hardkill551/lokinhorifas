import style from './roletta.module.css'
import LastEarnedPrizeGrid from './rolettaComponents/LastEarnedPrizeGrid';
import Hero from './rolettaComponents/Roleta';

const TempRoleta = () => {
  return (
    <>
      <Hero />
      <LastEarnedPrizeGrid />
    </>
  );
}
 
export default TempRoleta;