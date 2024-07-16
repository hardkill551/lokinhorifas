import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { LastEarnedPrizeType, LastEarnedWinnerType } from "utils/interfaces"

const LastEarnedContext = createContext({})

export const useLastEarnedState = () => {
  return useContext(LastEarnedContext)
}

export const LastEarnedContextProvider = ({children}:{children: ReactNode} ) => {
  //! ATENÇÃO TODAS AS IMAGENS DAS ARMAS DEVEM ESTAR NA SEGUINTE RESOLUÇÃO: 165x135!
  const items: LastEarnedPrizeType[] = [
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000',
      WinnerID: 1,
      WinnerName: 'Alison Sousa',
      WinnerPicture: '',
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000',
      WinnerID: 1,
      WinnerName: 'Alison Sousa',
      WinnerPicture: '',
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000',
      WinnerID: 1,
      WinnerName: 'Alison Sousa',
      WinnerPicture: '',
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000',
      WinnerID: 1,
      WinnerName: 'Alison Sousa',
      WinnerPicture: '',
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000',
      WinnerID: 1,
      WinnerName: 'Alison Sousa',
      WinnerPicture: '',
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000',
      WinnerID: 1,
      WinnerName: 'Alison Sousa',
      WinnerPicture: '',
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000',
      WinnerID: 1,
      WinnerName: 'Alison Sousa',
      WinnerPicture: '',
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000',
      WinnerID: 1,
      WinnerName: 'Alison Sousa',
      WinnerPicture: '',
    },
  ]

  const [ lastEarnedList, setLastEarnedList ] = useState(items)

  const setNewLastEarnedList = (dataArray: LastEarnedWinnerType[]) => {
    if(!dataArray) return
    
    const tempArray: LastEarnedPrizeType[] = []
    
    dataArray.map((item: LastEarnedWinnerType) => {
      const { raffle, winner } = item

      const newItem = {
        itemImageUrl: '',
        TimeOfEarning: '21 horas',
        ChanceOfEarning: '25%',
        PoolType: raffle.skin.value >= 1500 ? 'Gold' : 'Silver',
        ItemName: raffle.skin.name,
        ItemType: raffle.skin.name,
        ItemValue: String(raffle.skin.value),
        WinnerID: winner.id,
        WinnerName: winner.name,
        WinnerPicture: winner.picture,
      }

      tempArray.push(newItem)
    })

    setLastEarnedList(tempArray)

  }

  const value = {
    lastEarnedList,
    setNewLastEarnedList
  }

  // ! PARA DEBUGGING
  // useEffect(() => {
  //   console.log('Debugging LastEarnedState: ', participants)
  // })
  // ! PARA DEBUGGING

  return (
    <LastEarnedContext.Provider value={value} >
      {children}
    </LastEarnedContext.Provider>
  )
}