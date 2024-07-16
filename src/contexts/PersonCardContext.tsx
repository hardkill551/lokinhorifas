import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { Participant, PersonInfoCard, RewardItemType } from "utils/interfaces"
import { useRewardState } from "./RewardContext"

const PersonCardContext = createContext({})

export const usePersonCardState = () => {
  return useContext(PersonCardContext)
}

export const PersonCardStateProvider = ({children}:{children: ReactNode} ) => {
  const items: Participant[] = [
    {
      id: 0,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 0,
      isWinner: false
    },
    {
      id: 1,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 1,
      isWinner: false
    },
    {
      id: 2,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 2,
      isWinner: false
    },
    {
      id: 3,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 3,
      isWinner: false
    },
    {
      id: 4,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 4,
      isWinner: false
    },
    {
      id: 5,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 5,
      isWinner: false
    },
    {
      id: 6,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 6,
      isWinner: false
    },
    {
      id: 7,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 7,
      isWinner: false
    },
    {
      id: 8,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
    {
      id: 9,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
    {
      id: 10,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
    {
      id: 11,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
    {
      id: 12,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
    {
      id: 13,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
    {
      id: 14,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
    {
      id: 15,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
    {
      id: 16,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
    {
      id: 17,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
    {
      id: 18,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
    {
      id: 19,
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário',
      number: 8,
      isWinner: false
    },
  ]

  const [participants, setParticipants] = useState(items);
  const { rewards } = useRewardState() as { rewards: RewardItemType[] }

  const shuffleArray = (array: Participant[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]]
    }
    return array;
  }

  const getUniqueWinners = (participantsArray: Participant[]) => {
    if(!participantsArray) return

    const tempArray: Participant[] = []

    let tempParticipantArray = participantsArray

    for(let i = 0; i < rewards.length; i++) {
      let random = Math.floor(Math.random() * tempParticipantArray.length)
      const tempParticipant = tempParticipantArray[random]

      if(!tempParticipant) return

      
      const finalParticipant = {...tempParticipant, isWinner: true}

      if(tempArray.filter(item => item.number == tempParticipant.number).length == 0) {
        tempArray.push(finalParticipant)
      }
      

      tempParticipantArray = tempParticipantArray.filter(item => item.number != tempParticipant.number)
    }

    if(tempArray.length > 7) tempArray.splice(7, 2)

    const finalArray = tempArray.concat(participantsArray.filter(item => !tempArray.some(originalItem => originalItem.id == item.id)))

    setParticipants(shuffleArray(finalArray))
  }

  const setNewParticipants = (dataArray: PersonInfoCard[]) => {
    if(!dataArray) return

    const tempArray: Participant[] = []

    dataArray.map((item: PersonInfoCard, index: number) => {
      const { name, number, picture } = item
  
      tempArray.push({
        id: index,
        profilePicture: picture == 'default' ? '' : picture,
        personName: name,
        nickName: (name).toLowerCase() + '#' + number,
        number: number,
        isWinner: false
      })
    })

    getUniqueWinners(tempArray)
  }

  useEffect(() => {
    // console.log(participants)
  }, [participants])

  const value = {
    participants,
    setNewParticipants
  }

  // ! PARA DEBUGGING
  // useEffect(() => {
  //   console.log('Debugging PersonCardState: ', participants)
  // })
  // ! PARA DEBUGGING

  return (
    <PersonCardContext.Provider value={value} >
      {children}
    </PersonCardContext.Provider>
  )
}