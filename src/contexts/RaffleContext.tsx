import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import style from '../pages/admin/admin.module.css'

const RaffleContext = createContext({})

export const useRaffleContext = () => {
  return useContext(RaffleContext)
}


export const RaffleProvider = ({children} : {children: ReactNode}) =>{
  const [ unitValue, setUnitValue ] = useState<number>(0)
  const [ addedItemList, setAddedItemList ] = useState<[string, string, number][]>([])

  const submitNewRaffle = () => {
    // TODO enviar para o back os dados da rifa para criar novas rifas
    console.log(addedItemList)
    // ? dados presentes serão: [nome: string, qualidade: string e valor: número (float)]
  }

  const addItem = (item: [string, string, number]) => {
    if(!item) return
    setAddedItemList(oldArray => [...(oldArray || []), item])
  }

  const removeItem = (item: [string, string, number]) => {
    if(!item) return
    setAddedItemList(oldArray => oldArray?.filter(itemArray => itemArray.join() !== item.join() ))
  }

  const formatReceipt = () => {
    if(!addedItemList) return

    const max_width = 31
    return addedItemList.map(([item, quality, price], index) => {
      const itemPriceStr = `${item} (${quality}) ${Number(price).toFixed(2).toString().replace('.', ',')}`
      const numPeriods = max_width - itemPriceStr.length
      const periods = '.'.repeat(numPeriods)
      return (
        <p key={index} className={style.item} onClick={() => removeItem([item, quality, price])}>
          {item} ({quality}){periods}R$ {Number(price).toFixed(2).toString().replace('.', ',')}
        </p>
      )
    })
  }

  return (
      <RaffleContext.Provider value={{submitNewRaffle, addItem, formatReceipt, addedItemList, unitValue, setUnitValue}}>{children}</RaffleContext.Provider>
  )
}