import { useRaffleContext } from 'contexts/RaffleContext';
import style from '../admin.module.css'
import { Dispatch, useEffect } from 'react';

const Receipt = () => {
  const { addedItemList, formatReceipt, unitValue, setUnitValue, numberOfParticipants } = useRaffleContext() as {
    addedItemList: [string, string, number][], formatReceipt: Function, unitValue: number, setUnitValue: Dispatch<React.SetStateAction<number>>, numberOfParticipants: React.RefObject<HTMLInputElement>
  }

  useEffect(() => {
    calculateUnitCost()
  }, [addedItemList])

  const calculateUnitCost = () => {
    if(addedItemList) {
      let value = 0
  
      addedItemList.map(item => value += Number(item[2]))
  
      if(numberOfParticipants.current && Number(numberOfParticipants.current.value) != 0) {
        value = value / Number(numberOfParticipants.current.value)
      }
  
      return setUnitValue(Number(value))
    }
    
  }

  return (
    <div className={style.receipt}>
      <div className={style.receiptWrapper}>
        <h2>
          Criar/Editar rifa
          <hr />
        </h2>
        <div className={style.tableOfItems}>
          {addedItemList && addedItemList.length > 0 ? formatReceipt() : <p style={{ textAlign: 'center' }}>Adicione itens ao lado!</p>}
          <hr />
          <p><input type="number" ref={numberOfParticipants} onChange={() => calculateUnitCost()}/> x números</p>
        </div>
        <h3 className={style.price}>R$ {Number(unitValue).toFixed(2).toString().replace('.', ',')}</h3>
      </div>
    </div>
  );
}
 
export default Receipt;