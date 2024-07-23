import { StaticImageData } from "next/image";

export default interface TextContextType{
  textInfo: {
    text:string,
    id:number
  };
  setTextInfo: React.Dispatch<React.SetStateAction<string>>;
}

export default interface UserContextType {
    userInfo: {
      name: string;
      id: string;
      email: string;
      picture: string;
      token: string;
      isAdmin: boolean;
      phoneNumber: string;
      tradeLink: string;
    };
    setUserInfo: React.Dispatch<React.SetStateAction<{
      name: string;
      id: string;
      email: string;
      picture: string;
      token: string;
      isAdmin: boolean;
      phoneNumber: string;
      tradeLink: string;
    }>>;
    logOut: Function
}

export type UserSettingsType = { 
  profile: {
    name: string;
    email: string;
    picture: string;
    budget: string | undefined;
  };
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

export type UserData = {
    tradeLink: string;
    phoneNumber: string;
    oldPassword: string;
    newPassword: string;
    picture: File | null;
}

export type ServicesCardType = {
  ImageSVG:string;
  ImageAlt:string;
  CardTitle:string;
  CardContent:string;
}

export type CardItemType = {
  profilePicture: string;
  personName: string;
  nickName: string;
  isWinner: boolean;
  number: number;
}

export type RewardItemType = {
  type: string;
  itemImageUrl: string;
  itemName: string;
  itemType: string;
  itemValue: string;
}

export type LastEarnedPrizeType = {
  itemImageUrl: string;
  TimeOfEarning: string;
  ChanceOfEarning: string;
  PoolType: string;
  ItemName: string;
  ItemType: string;
  ItemValue: string;
  WinnerID: number;
  WinnerName: string;
  WinnerPicture: string;
}

export type PersonInfoCard = {
  id: number;
  name: string; 
  number: number;
  picture: string;
}

export type Participant = {
  id: number;
  profilePicture: string;
  personName: string;
  nickName: string;
  number: number;
  isWinner: boolean;
}

export type PersonCardContextType = {
  participants: PersonInfoCard[];
  setNewParticipants: (dataArray: Participant[]) => void;
}

export type SkinType = {
  id: number;
  name: string;
  picture: string;
  value: number;
}

export type RewardItemContextType = {
  rewards: RewardItemType[];
  setNewRewards: (dataArray: SkinType[]) => void;
}

export type LastEarnedWinnerType = {
  winner: WinnerType;
  raffle: RaffleType;
}

export type WinnerType = {
  id: number;
  email: string;
  name: string;
  phoneNumber: null | string;
  picture: string;
  tradeLink: string | null;
  isAdmin: boolean;
}

export type RaffleType = {
  id: number;
  value: number;
  is_active: boolean;
  skin: SkinType;
  item_chance: string;
}

export type LastEarnFrontEndType = {
  itemImageUrl: string;
  TimeOfEarning: string;
  ChanceOfEarning: string;
  PoolType: string;
  ItemName: string;
  ItemType: string;
  ItemValue: string;
}

export interface FormDataType {
  email: string;
  password: string;
  confirmPassword: string;
  tradeLink: string;
  phoneNumber: string;
  name: string;
  picture: null | File | string;
}
