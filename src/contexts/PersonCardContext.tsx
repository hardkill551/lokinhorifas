import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { Participant, PersonInfoCard } from "utils/interfaces"

const PersonCardContext = createContext({})

export const usePersonCardState = () => {
  return useContext(PersonCardContext)
}

export const PersonCardStateProvider = ({children}:{children: ReactNode} ) => {
  const items = [
    {
      id: 0,
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 1,
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 2,
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 3,
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 4,
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 5,
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 6,
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 7,
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 8,
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 9,
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 10,
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 11,
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 12,
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 13,
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 14,
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 15,
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 16,
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 17,
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 18,
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      id: 19,
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
  ]

  const [participants, setParticipants] = useState(items);

  const colors = ['Blue', 'Green', 'Yellow', 'Red', 'Purple']

  const setNewParticipants = (dataArray: PersonInfoCard[]) => {
    if(!dataArray) return

    const tempArray: Participant[] = []

    dataArray.map((item: PersonInfoCard, index: number) => {
      const { name, number, picture } = item
  
      tempArray.push({
        id: index,
        color: colors[Math.floor(Math.random() * colors.length)],
        profilePicture: picture == 'default' ? '' : picture,
        personName: name,
        nickName: name + '_' + name + '_' + number
      })
    })

    setParticipants(tempArray)
  }

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