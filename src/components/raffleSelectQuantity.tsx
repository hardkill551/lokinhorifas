import { Dispatch, useEffect, useState } from "react";
import RaffleCartItem from "./raffleCartItem";

const RaffleSelectQuantity = ({setQuantity}: {setQuantity: {setTotal: Dispatch<React.SetStateAction<number>>}}) => {
  // Aqui devem ser recebidos:
  // todas as skins das armas
  // a rifa em q estão presentes
  // O valor da rifa

  const { setTotal } = setQuantity

  type raffleItem = {
    id: number,
    skins: string[],
    value: number,
    quantity: number
  }

  const [selectedItems, setSelectedItems] = useState<raffleItem[]>()

  useEffect(() => {
    setSelectedItems([
      {
        id: 0,
        skins: [ 'neon light', 'neon light', 'neon light', 'neon light', 'neon light', 'neon light' ],
        value: Math.random() * 500,
        quantity: 1
      },
      {
        id: 1,
        skins: [ 'neon light', 'confirmed kill', 'onyx', 'flyer' ],
        value: Math.random() * 500,
        quantity: 1
      }
    ])
  },[])

  useEffect(() => {
    changeTotal()
  }, [selectedItems])

  const handleChangeQuantity = (id:number, newQuantity: number) => {
    if(!selectedItems) return

    const item = selectedItems.filter(item => item.id == id)[0]
    newQuantity != 0 ? item.quantity = newQuantity : item.quantity = 1
    const restOfArray = selectedItems.filter(item => item.id != id)

    setSelectedItems(restOfArray.splice(id, 0, item))
  }

  const changeTotal = () => {
    if(!selectedItems) return

    let tempNumber = 0
    selectedItems.map(item => tempNumber += item.value * item.quantity)
    setTotal(tempNumber)
  }

  return (
    <div className="raffleBuyQuantity">
      <div className="sessionInfo">
        <h2>Compra de Rifa</h2>
        <p>Selecione a quantidade de rifas que gostaria de comprar</p>
      </div>
      <div className="cartGroup">
        <div className="cartGroupWrapper">
          {selectedItems && selectedItems.map(item => <RaffleCartItem key={item.id} props={{item, handleChangeQuantity}}/>)}
        </div>
      </div>
    </div>
  );
}
 
export default RaffleSelectQuantity;