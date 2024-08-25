import axios from "axios"
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

      // * alterar TimeOfEarning
      // TODO alterar imagem do item

      const date = new Date(raffle.updatedAt)

      const earnedDateHours = Math.floor(Math.abs(Date.now() - Number(date)) / (1000 * 60 * 60))
      const earnedDateDays = Math.floor(Math.abs(Date.now() - Number(date)) / (1000 * 60 * 60 * 24))

      let time = ''

      if(earnedDateHours < 24) time = `${earnedDateHours} hora${earnedDateHours == 1 ? '' : 's'}`
      else if(earnedDateDays) time = `${earnedDateDays} dia${earnedDateDays == 1 ? '' : 's'}`

      const newItem = {
        itemImageUrl: raffle.skin.picture.includes('url_to_picture') ? '' : raffle.skin.picture,
        TimeOfEarning: time,
        ChanceOfEarning: raffle.item_chance,
        PoolType: raffle.skin.value >= 1500 ? 'Gold' : 'Silver',
        ItemName: raffle.skin.name,
        ItemType: raffle.skin.type,
        ItemValue: String(raffle.skin.value),
        WinnerID: winner.id,
        WinnerName: winner.name,
        WinnerPicture: winner.picture,
      }

      tempArray.push(newItem)
    })

    setLastEarnedList(tempArray)

  }

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/winners", { params: { page: 1 } })
      .then((res: any) => { 
        console.log(res.data);
        setNewLastEarnedList(res.data);
      })
      .catch((err: any) => console.error(err));
  }, []);

  const value = {
    lastEarnedList,
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