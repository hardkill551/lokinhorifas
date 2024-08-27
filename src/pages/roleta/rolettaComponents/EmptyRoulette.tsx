import style from '../roletta.module.css';

const EmptyRoulette = () => {
  return (
    <div className={style.emptyRoulette}><h1>Rifa sem participantes ainda!</h1></div>
  );
}
 
export default EmptyRoulette;