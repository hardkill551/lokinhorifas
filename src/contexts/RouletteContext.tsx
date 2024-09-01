import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Participant,
  Raffle,
  raffleItem,
  RaffleParticipant,
  RaffleReward,
  RaffleSkin,
  WinnerProperties,
} from "utils/interfaces";

export const RouletteStateContext = createContext({});

export const useRouletteContext = () => {
  return useContext(RouletteStateContext);
};

export const RouletteProvider = ({ children }: { children: ReactNode }) => {
  // ? Init variables
  const [availableRaffles, setAvailableRaffles] = useState<Raffle[]>([]);
  const [purchasableRaffles, setPurchasableRaffles] = useState<raffleItem[]>(
    []
  );
  const [raffle, setRaffle] = useState<Raffle>();
  // ? Init variables

  // ? Necessary variables
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [fillerParticipants, setFillerParticipants] = useState<Participant[]>([]);
  const [winnerProperties, setWinnerProperties] = useState<WinnerProperties>();
  const [rewards, setRewards] = useState<RaffleReward[]>([]);

  const [animationState, setAnimationState] = useState<Animation>();
  const [isMockWin, setIsMockWin] = useState<boolean>(false);
  // ? Necessary variables

  // ? Component variables
  const [winner, setWinner] = useState<number>();
  const [winnerPopupVisible, setWinnerPopupVisible] = useState<boolean>(false);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  // ? Component variables

  // ? Functions
  const toggleIsButtonActive = () => setIsButtonActive((oldValue) => !oldValue);
  const toggleWinnerPopupVisibility = () => setWinnerPopupVisible((oldValue) => !oldValue);

  const loadFillerCards = () => {
    const winnerlessCards = participants.map((item) => ({ ...item, isWinner: false }));

    let tempArray: Participant[] = []

    if(winnerlessCards.length != Infinity &&  winnerlessCards.length > 0) {
      while (tempArray.length < 600) {
        tempArray = tempArray.concat(winnerlessCards)
      }
    }

    setFillerParticipants(tempArray);
  };

  const playAnimation = () => {
    if (!winnerProperties) return;

    toggleIsButtonActive();

    const roulette = document.getElementById("Roulette");

    const timing = 5000;

    const randomSide = Math.floor(Math.random() * 2) == 1 ? -1 : 1;

    setTimeout(() => {
      toggleIsButtonActive();
      toggleWinnerPopupVisibility();
    }, timing);

    if (randomSide == -1) {
      // * Variável que segura animação
      const random = Math.floor(Math.random() * 105);

      const spinAnimation = new Animation(
        new KeyframeEffect(
          roulette,
          [
            { transform: `translateX(0px)`, offset: 0 },
            { transform: `translateX(80px)`, offset: 0.009 },
            {
              transform: `translateX(-${winnerProperties.distanceFromCenter + random}px)`,
              offset: 1,
            },
          ],
          {
            duration: timing,
            easing: "cubic-bezier(.04,.81,.48,1)",
            fill: "forwards",
          }
        ),
        document.timeline
      );

      // * Função que roda a animação
      spinAnimation.play();

      return spinAnimation;
    } else {
      // * Variável que segura animação
      const random = Math.floor(Math.random() * 110);

      const spinAnimation = new Animation(
        new KeyframeEffect(
          roulette,
          [
            { transform: `translateX(0px)`, offset: 0 },
            { transform: `translateX(80px)`, offset: 0.009 },
            {
              transform: `translateX(-${winnerProperties.distanceFromCenter - random}px)`,
              offset: 1,
            },
          ],
          {
            duration: timing,
            easing: "cubic-bezier(.04,.81,.48,1)",
            fill: "forwards",
          }
        ),
        document.timeline
      );

      // * Função que roda a animação
      spinAnimation.play();

      return spinAnimation;
    }
  };

  const manageWinner = () => {
    if (!winner) return;

    setIsMockWin(false);

    setAnimationState(playAnimation());
  };

  const manageMockWinner = () => {
    if (!winner) return;

    setIsMockWin(true);

    setAnimationState(playAnimation());
  };

  const manageCloseResult = () => {
    if (!winner) return;
    if (!animationState) return;

    animationState.cancel();

    toggleWinnerPopupVisibility();

    if (isMockWin) return;
    setIsButtonActive(false)

    addLatestWinnerToTable();
    removeWinnerAndRaffleFromRoulette();

    setTimeout(() => {
      setIsButtonActive(true)
    }, 600);
  };

  const selectRaffle = (id: number) => {
    localStorage.setItem('activeItem', id.toString())

    if(!availableRaffles.filter((raffle) => raffle.id == id)[0]) return

    setRaffle(availableRaffles.filter((raffle) => raffle.id == id)[0]);
  };

  const toggleSelection = (id: number) => {
    const newRaffles = purchasableRaffles.map((raffle) => {
      if (raffle.id == id) return { ...raffle, isSelected: !raffle.isSelected };
      return raffle;
    });

    setPurchasableRaffles(newRaffles);
  };

  const handleChangeQuantity = (id: number, newQuantity: number) => {
    const newRaffles = purchasableRaffles.map((raffle) => {
      if (raffle.id == id) return { ...raffle, quantity: newQuantity };
      return raffle;
    });

    setPurchasableRaffles(newRaffles);
  };
  // ? Functions

  // * Setting new winner
  const addLatestWinnerToTable = async () => {
    if (!participants) return;
    if (!winner) return;
    if (!raffle) return;

    const participantWinner = participants.filter(
      (item) => item.number == winner
    )[0];

    const token = localStorage.getItem("token");

    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users/winners`,
          {
            id: participantWinner.id,
            number: participantWinner.number,
            raffle_id: raffle.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => console.log(res.data));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const removeWinnerAndRaffleFromRoulette = () => {
    if (!participants) return;
    if (!winner) return;
    if (!rewards) return;

    setParticipants(participants.filter(item => item.number != winner))
    setRewards(rewards.filter(reward => reward != rewards[0]))

    loadUniqueWinners(participants)
  };
  // * Setting new winner

  // * Sanitize Participants
  const shuffleArray = (array: Participant[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const loadUniqueWinners = (participantsArray: Participant[]) => {
    if (!participantsArray) return;
    if (participantsArray.length == 0) return setParticipants([]);

    const randomId = participantsArray[Math.floor(Math.random() * participantsArray.length)].id

    const finalArray = participantsArray.map(item => {
      return item.id == randomId ? {...item, isWinner: true} : {...item, isWinner: false}
    })

    setParticipants(shuffleArray(finalArray));
  };
  const setNewParticipants = (newParticipantsArray: RaffleParticipant[]) => {
    if (!newParticipantsArray) return;

    const tempArray: Participant[] = [];

    // ? Defaults every new entry object-like structure to the one used within the site
    newParticipantsArray.map((item) => {
      const { number, user, id } = item;

      // ? Dados do usuário
      tempArray.push({
        id,
        isWinner: false,
        profilePicture: `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${user.picture}`,
        personName: user.name,
        nickName: user.name.toLowerCase() + "#" + number,
        number: number,
      });
    });

    loadUniqueWinners(tempArray);
  };
  // * Sanitize Participants

  // * Sanitize Rewards
  const setNewRewards = (newRewardsArray: RaffleSkin[]) => {
    if (!newRewardsArray) return;

    const tempArray: RaffleReward[] = [];

    newRewardsArray.map((item: RaffleSkin) => {
      if(item.winner_id === null) {
        const newItem = {
          id: item.skin_id,
          type: item.skinValue >= 1000 ? "Gold" : "Silver",
          itemImageUrl: `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${item.skinPicture}`,
          itemName: item.skinName,
          itemType: item.skinType,
          itemValue: String(item.skinValue),
        };
        tempArray.push(newItem);
      }
    });

    // ! Comentar o código abaixo para ter mais de 4 prêmios, opção para DEBUGGING
    // tempArray.splice(4, 1000)

    setRewards(tempArray);
  };
  // * Sanitize Rewards

  // * Sanitize raffles origin
  const SanitizeRaffles = (raffle: Raffle) => {
    // ? Locate winners and separate already raffled skins from others
    const raffledSkinsId: number[] | null[] = raffle.raffleSkins.filter(skin => skin.winner_id).map(hasWinner => hasWinner.winner_id)
    const nonRaffledSkins: RaffleSkin[] = raffle.raffleSkins.filter(skin => !skin.winner_id)

    if(raffledSkinsId.length > 0) {
      // ? New participants (not including winners)
      const nonWinners = raffledSkinsId.map(id => raffle.participants.filter(participant => participant.id != id))[0]

      return raffle = {...raffle, participants: nonWinners, raffleSkins: nonRaffledSkins}
    } else return raffle
  }
  // * Sanitize raffles origin

  // * Available for purchase raffles
  const handleBigNames = (raffles: raffleItem[]) => {
    let tempNamesArray: string[] = [];

    let itemsTempArray: { name: string; quantity: number }[] = [];

    const newRaffleData = raffles.map((raffle) => {
      tempNamesArray = [];
      itemsTempArray = [];

      raffle.skins.map((raffle) => {
        if (tempNamesArray.join("").includes(raffle)) {
          itemsTempArray.filter((item) => item.name == raffle)[0].quantity++;
        } else {
          tempNamesArray.push(raffle);
          itemsTempArray.push({ name: raffle, quantity: 1 });
        }
      });

      const finalArray: string[] = [];

      itemsTempArray.map((item) =>
        finalArray.push(
          `${item.quantity > 1 ? item.quantity + "x " : ""}${item.name}${
            item.quantity > 1 ? "'s" : ""
          }`
        )
      );

      return { ...raffle, skins: finalArray };
    });

    return newRaffleData;
  };
  const filterPurchasableRaffles = () => {
    if (availableRaffles.length == 0) return;

    const tempArray: raffleItem[] = [];

    const options = availableRaffles.filter(
      (raffle) =>
        raffle.free == false &&
        raffle.participants.length != raffle.users_quantity
    );

    options.map((raffle) => {
      const { id, raffleSkins, name, value, users_quantity, participants } =
        raffle;

      const skins: string[] = raffleSkins.map((skin) => skin.skinName);

      const bundleValue: number = raffleSkins.reduce(
        (sum, skin) => sum + skin.skinValue,
        0
      );

      const choosenSkinBanner = raffleSkins.reduce((max, skin) => {
        return skin.skinValue >= max.skinValue ? skin : max;
      }).skinPicture;

      const bannerSkin: string = `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${choosenSkinBanner}`;

      const tempObject: raffleItem = {
        id,
        skins,
        name,
        value: value / users_quantity,
        quantity: 1,
        maxQuantity: users_quantity - participants.length,
        isSelected: false,
        bannerSkin,
        bundleValue,
      };

      tempArray.unshift(tempObject);
    });

    setPurchasableRaffles(handleBigNames(tempArray));
  };
  // * Available for purchase raffles

  // * Only works on /roleta page
  const getWinner = (winnerParam: HTMLElement) => {
    if(!winnerParam) return
    
    setWinner(Number(winnerParam.dataset.number))
    const winnerStats = participants.filter(winnerArray => winnerArray.number == Number(winnerParam.dataset.number))[0]

    const winnerCardCenter =
      (Math.round(winnerParam.getBoundingClientRect().right) -
        Math.round(winnerParam.getBoundingClientRect().left)) /
        2 +
      Math.round(winnerParam.getBoundingClientRect().left) -
      window.innerWidth / 2;
    
    const centerOfCard = winnerCardCenter < 0 ? winnerCardCenter * -1 : winnerCardCenter

    setWinnerProperties({
      ...winnerStats,
      isWinner: true,
      distanceFromCenter: centerOfCard
    })
  }
  // * Only works on /roleta page

  // * INIT
  const getRaffleList = () => {
    // * adicionar escolha de rifas com padrão caso não haja parâmetro
    axios
      .get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/raffle", {})
      .then((res: any) => {
        const filteredResult = res.data.map((raffle: Raffle) => SanitizeRaffles(raffle))
        setAvailableRaffles(filteredResult);
        setRaffle(filteredResult[0]);
      })
      .catch((err: any) => console.error("Raffles error ", err.response));
  };

  useEffect(() => {
    getRaffleList();
  }, []);
  // * INIT

  // ? Alter participants when raffle changes
  useEffect(() => {
    if (!raffle) return;


    setNewParticipants(raffle.participants);
    setNewRewards(raffle.raffleSkins);
    filterPurchasableRaffles();
  }, [raffle]);

  // useEffect(() => {
  //   if(rewards.length == 0) return
    
  // }, [rewards]);

  useEffect(() => {
    if(!participants) return
    
    loadFillerCards()
  }, [participants]);

  useEffect(() => {
    if(!winnerProperties) return
  }, [winnerProperties])

  const value = {
    availableRaffles,
    purchasableRaffles,
    fillerParticipants,
    raffle,
    winnerPopupVisible,
    winnerProperties,
    isButtonActive,
    isMockWin,
    winner,
    participants,
    rewards,
    setIsButtonActive,
    toggleSelection,
    handleChangeQuantity,
    setWinner,
    loadFillerCards,
    manageWinner,
    manageMockWinner,
    manageCloseResult,
    selectRaffle,
    getWinner,
  };

  return (
    <RouletteStateContext.Provider value={value}>
      {children}
    </RouletteStateContext.Provider>
  );
};