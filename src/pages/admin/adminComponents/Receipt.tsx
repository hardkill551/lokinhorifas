import { useRaffleContext } from 'contexts/RaffleContext';
import style from '../admin.module.css'
import { Dispatch, useEffect, useRef } from 'react';

const Receipt = () => {
  const { addedItemList, formatReceipt, unitValue, setUnitValue } = useRaffleContext() as {
    addedItemList: [string, string, number][], formatReceipt: Function, unitValue: number, setUnitValue: Dispatch<React.SetStateAction<number>>
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    calculateUnitCost()
  }, [addedItemList])

  const calculateUnitCost = () => {
    if(!addedItemList) return
    
    let value = 0

    addedItemList.map(item => value += Number(item[2]))

    if(inputRef.current && Number(inputRef.current.value) != 0) {
      value = value / Number(inputRef.current.value)
    }

    return setUnitValue(Number(value))
  }

  return (
    <div className={style.receipt}>
      <div className={style.receiptWrapper}>
        <h2>
          Criar/Editar rifa
          <hr />
        </h2>
        <div className={style.tableOfItems}>
          {addedItemList.length ? formatReceipt() : <p style={{ textAlign: 'center' }}>Adicione itens ao lado!</p>}
          <hr />
          <p><input type="number" ref={inputRef} onChange={() => calculateUnitCost()}/> x números</p>
        </div>
        <h3 className={style.price}>R$ {unitValue.toFixed(2).toString().replace('.', ',')}</h3>
      </div>
    </div>
  );
}
 
export default Receipt;