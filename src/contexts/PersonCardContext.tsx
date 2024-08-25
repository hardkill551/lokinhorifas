import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { Participant, PersonInfoCard, RewardItemType, UserInfoType } from "utils/interfaces"
import { useRewardState } from "./RewardContext"
import { useUserStateContext } from './UserContext'
import axios from "axios"
import RouletteItem from "../pages/roleta/rolettaComponents/RouletteItem"

const PersonCardContext = createContext({})

export const usePersonCardState = () => {
  return useContext(PersonCardContext)
}

export const PersonCardStateProvider = ({children}:{children: ReactNode} ) => {
  // ? Default/Fallback values used to keep operations
  // const items: Participant[] = [
  //   {
  //     id: 0,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 0,
  //     isWinner: false
  //   },
  //   {
  //     id: 1,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 1,
  //     isWinner: false
  //   },
  //   {
  //     id: 2,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 2,
  //     isWinner: false
  //   },
  //   {
  //     id: 3,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 3,
  //     isWinner: false
  //   },
  //   {
  //     id: 4,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 4,
  //     isWinner: false
  //   },
  //   {
  //     id: 5,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 5,
  //     isWinner: false
  //   },
  //   {
  //     id: 6,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 6,
  //     isWinner: false
  //   },
  //   {
  //     id: 7,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 7,
  //     isWinner: false
  //   },
  //   {
  //     id: 8,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  //   {
  //     id: 9,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  //   {
  //     id: 10,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  //   {
  //     id: 11,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  //   {
  //     id: 12,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  //   {
  //     id: 13,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  //   {
  //     id: 14,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  //   {
  //     id: 15,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  //   {
  //     id: 16,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  //   {
  //     id: 17,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  //   {
  //     id: 18,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  //   {
  //     id: 19,
  //     profilePicture: '',
  //     personName: 'Alison Sousa',
  //     nickName: 'nome_de_usuário',
  //     number: 8,
  //     isWinner: false
  //   },
  // ]

  const { userInfo } = useUserStateContext() as { userInfo: UserInfoType }
  const items: Participant[] = []

  const [ participants, setParticipants ] = useState(items);
  const [ winner, setWinner ] = useState() as  [ winner: HTMLElement, setWinner: Function ]
  const [ isButtonActive, setIsButtonActive ] = useState(false)
  const { rewards, removeReward } = useRewardState() as { rewards: RewardItemType[], removeReward: Function }
  const [ winnerPopupVisible, setWinnerPopupVisible ] = useState(false)
  const [ animationState, setAnimationState ] = useState() as [ animationState: Animation, setAnimationState: Function ]
  const [ isMockWin, setIsMockWin ] = useState(false)

  // useEffect(() => {
  //   console.log(userInfo)
  // }, [userInfo])

  
  
  const toggleIsButtonActive = () => setIsButtonActive(oldValue => !oldValue)

  const shuffleArray = (array: Participant[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]]
    }
    return array;
  }

  const loadUniqueWinners = (participantsArray: Participant[]) => {
    if(!participantsArray) return

    const winnersTempArray: Participant[] = []

    let tempParticipantArray = participantsArray
    
    const winnersLeft = tempParticipantArray.filter(item => item.isWinner)

    if(!winnersLeft.length) {
      for(let i = 0; i < rewards.length; i++) {
        let random = Math.floor(Math.random() * tempParticipantArray.length)
        // ? Selects a random Participant from participants array
        const tempParticipant = tempParticipantArray[random]
        
        
        if(!tempParticipant) return
        
        
        const finalParticipant = {...tempParticipant, isWinner: true}
        
        
        // ? Loads choosen participant to winnersTempArray
        if(winnersTempArray.filter(item => item.number == tempParticipant.number).length == 0) {
          winnersTempArray.push(finalParticipant)
        }
        
        
        // ? Removes all duplicate raffle numbers of winner
        tempParticipantArray = tempParticipantArray.filter(item => item.number != tempParticipant.number)
      }
      
      // ? In case there are more winners than rewards available, it shortens the array of winner to the size of the Rewards array
      if(winnersTempArray.length > rewards.length) winnersTempArray.splice(rewards.length, winnersTempArray.length - rewards.length)
    }
      
    // ? Creates a single array with both winners and the rest of participants
    const finalArray = participantsArray.filter(item => !winnersTempArray.some(originalItem => originalItem.id == item.id)).concat(winnersTempArray)

    setParticipants(shuffleArray(finalArray))
  }

  const setNewParticipants = (dataArray: PersonInfoCard[]) => {
    if(!dataArray) return

    const tempArray: Participant[] = []

    // ? Defaults every new entry object-like structure to the one used within the site
    dataArray.map((item: PersonInfoCard) => {
      const { name, number, picture, id } = item

      // ? Dados do usuário
  
      tempArray.push({
        id: id,
        isWinner: false,
        profilePicture: picture == 'default' ? '' : picture,
        personName: name,
        nickName: (name).toLowerCase() + '#' + number,
        number: number,
      })
    })

    loadUniqueWinners(tempArray)
  }

  const manageWinner = () => {
    if(!winner) return

    setIsMockWin(false)

    addLatestWinnerToTable()
    
    setAnimationState(playAnimation())
  }

  const manageMockWinner = () => {
    if(!winner) return

    setIsMockWin(true)
    
    setAnimationState(playAnimation())
  }

  const removeWinnerAndRaffleFromRoulette = () => {
    const participantWinner = participants.filter(item => item.number != Number(winner.dataset.number))

    removeReward()
    loadUniqueWinners(participantWinner)
  }

  const manageCloseResult = () => {
    if(!winner) return

    animationState.cancel()

    toggleWinnerPopupVisibility()

    if(isMockWin) return
    removeWinnerAndRaffleFromRoulette()
  }

  const addLatestWinnerToTable = async () => {
    const participantWinner = participants.filter(item => item.number == Number(winner.dataset.number))[0]

    const token = localStorage.getItem('token')
    
    // console.log('winner raffle number: ', participantWinner.number, '\nfrom the following winner user id: ' , participantWinner.id, '\nand its prize of the following name: ', rewards[0].itemName)

    try {
      axios.post(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users/winners`, {
        "id": participantWinner.id,
        "number": participantWinner.number
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(res => console.log(res.data))
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const loadFillerCards = (position: number) => {
    const numberOfParticipants = participants.length

    const numberOfFillerCards = (600 - numberOfParticipants) / 2

    if(numberOfFillerCards <= 0) return
    
    const winnerlessCards = participants.filter(item => item.isWinner == false)

    let tempArray: Participant[] = []

    for(let i = 0; i < numberOfFillerCards; i += winnerlessCards.length) {
        tempArray = tempArray.concat(winnerlessCards)
    }

    tempArray.splice(numberOfFillerCards, tempArray.length - numberOfFillerCards)

    tempArray = shuffleArray(tempArray)

    return tempArray.map((item, index) => <RouletteItem key={(index + participants.length) * position} props={item}/>)
  }

  const toggleWinnerPopupVisibility = () => {
    setWinnerPopupVisible(oldValue => !oldValue)
  }

  const playAnimation = () => {
    if(!winner) return
    toggleIsButtonActive()

    const roulette = document.getElementById('Roulette')

    const winnerCardCenter = (Math.round(winner.getBoundingClientRect().right) - Math.round(winner.getBoundingClientRect().left)) / 2 + Math.round(winner.getBoundingClientRect().left) - (window.innerWidth / 2)

    const timing = 30000
    // const timing = 300
    
    
    const randomSide = Math.floor(Math.random() * 2) == 1 ? -1 : 1
    
    setTimeout(() => {
      toggleIsButtonActive()
      toggleWinnerPopupVisibility()
    }, timing);

    if(randomSide == -1) {
      // * Variável que segura animação
      const random = Math.floor(Math.random() * 105)

      const spinAnimation = new Animation(new KeyframeEffect(roulette, [
        { transform: `translateX(0px)`, offset: 0 },
        { transform: `translateX(80px)`, offset: 0.009 },
        { transform: `translateX(-${winnerCardCenter + random}px)`, offset: 1 }
      ], 
      {
        duration: timing,
        easing: "cubic-bezier(.04,.81,.48,1)",
        fill: 'forwards'
      }), document.timeline)

      
      // * Função que roda a animação
      spinAnimation.play()

      return spinAnimation
    } else {
      // * Variável que segura animação
      const random = Math.floor(Math.random() * 110)

      const spinAnimation = new Animation(new KeyframeEffect(roulette, [
        { transform: `translateX(0px)`, offset: 0 },
        { transform: `translateX(80px)`, offset: 0.009 },
        { transform: `translateX(-${winnerCardCenter - random}px)`, offset: 1 }
      ], 
      {
        duration: timing,
        easing: "cubic-bezier(.04,.81,.48,1)",
        fill: 'forwards'
      }), document.timeline)
      
      // * Função que roda a animação
      spinAnimation.play()

      return spinAnimation
    }
  }

  const getNewParticipants = () => {
    axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/roulette/participants", {}).then((res: any) => setNewParticipants(res.data))
    .catch((err: any) => console.error(err.response))
  }



  const value = {
    participants,
    getNewParticipants,
    setWinner,
    winner,
    loadFillerCards,
    shuffleArray,
    manageMockWinner,
    isButtonActive,
    manageWinner,
    manageCloseResult,
    winnerPopupVisible,
    toggleWinnerPopupVisibility,
    isMockWin
  }

  // ! PARA DEBUGGING
  // useEffect(() => {
  // }, [])
  // ! PARA DEBUGGING

  return (
    <PersonCardContext.Provider value={value} >
      {children}
    </PersonCardContext.Provider>
  )
}
