import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { PersonInfoCard } from "utils/interfaces"

const PersonCardContext = createContext({})

export const usePersonCardState = () => {
  return useContext(PersonCardContext)
}

export const PersonCardStateProvider = ({children}:{children: ReactNode} ) => {
  const items = [
    {
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
  ]

  const [participants, setParticipants] = useState(items);

  const colors = ['Blue', 'Green', 'Yellow', 'Red', 'Purple']

  const setNewParticipants = (dataArray: any) => {
    if(!dataArray) return

    const tempArray: any = []

    dataArray.map((item: PersonInfoCard) => {
      const { name, number, picture } = item
  
      tempArray.push({
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