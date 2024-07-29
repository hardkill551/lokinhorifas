import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { RewardItemType, SkinType } from "utils/interfaces"

const RewardContext = createContext({})

export const useRewardState = () => {
  return useContext(RewardContext)
}

export const RewardContextProvider = ({ children }: { children: ReactNode }) => {
  const items = [
    {
      type: 'Silver',
      itemImageUrl: '',
      itemName: 'Nome da Skin',
      itemType: 'Tipo de Skin',
      itemValue: '1000'
    },
    {
      type: 'Gold',
      itemImageUrl: '',
      itemName: 'Nome da Skin',
      itemType: 'Tipo de Skin',
      itemValue: '4000'
    },
    {
      type: 'Gold',
      itemImageUrl: '',
      itemName: 'Nome da Skin',
      itemType: 'Tipo de Skin',
      itemValue: '3000'
    },
    {
      type: 'Gold',
      itemImageUrl: '',
      itemName: 'Nome da Skin',
      itemType: 'Tipo de Skin',
      itemValue: '2000'
    },
  ]

  const [rewards, setRewards] = useState(items)

  const removeReward = () => {
    const newRewards = [...rewards] // Cria uma cópia do array atual de rewards
    newRewards.splice(0, 1) // Remove o primeiro elemento da cópia do array
    setRewards(newRewards) // Atualiza o estado com o novo array modificado
  }

  const setNewRewards = (dataArray: SkinType[]) => {
    if (!dataArray) return

    const tempArray: RewardItemType[] = []

    dataArray.map((item: SkinType) => {
      const newItem = {
        type: item.value >= 1500 ? 'Gold' : 'Silver',
        itemImageUrl: '',
        itemName: item.name,
        itemType: item.name,
        itemValue: String(item.value)
      }

      tempArray.push(newItem)
    })

    // ! Comentar o código abaixo para ter mais de 4 prêmios, opção para DEBUGGING
    tempArray.splice(4, 1000)

    setRewards(tempArray)
  }

  const value = {
    rewards,
    setNewRewards,
    removeReward
  }

  // ! PARA DEBUGGING
  // useEffect(() => {
  //   console.log('Debugging RewardState: ', participants)
  // })
  // ! PARA DEBUGGING

  return (
    <RewardContext.Provider value={value} >
      {children}
    </RewardContext.Provider>
  )
}
