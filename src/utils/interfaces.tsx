import { StaticImageData } from "next/image";

export default interface TextContextType{
  textInfo: {
    text:string,
    id:number
  };
  setTextInfo: React.Dispatch<React.SetStateAction<string>>;
}

export default interface UserContextType {
    userInfo: UserInfoType;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>;
    logOut: Function
}

export type UserInfoType = {
  name: string;
  id: string;
  email: string;
  picture: string;
  token: string;
  isAdmin: boolean;
  phoneNumber: string;
  tradeLink: string;
}

export type UserInfoTable = {
  id: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  tradeLink: string;
  created: string;
}

export type UserSettingsType = { 
  profile: {
    name: string;
    tradeLink: string;
    phoneNumber: string;
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
  value: number;
  type: string;
  picture: string;
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
  updatedAt: string;
}

export type RaffleInfoTable = {
  id: string;
  name: string;
  state: 'ativada' | 'em espera' | 'desativada';
  totalValue: number;
  isFree: boolean;
  unitValue: number;
  participants: number;
  maxParticipants: number;
  skins: string[];
  ocurred: string | false;
  created: string;
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


export interface skinDataType {
  value: number;
  type: string;
  name: string;
  picture: null | File | string;
}

export interface RaffleNumberType {
  key: number;
  number: number;
  isSelected: boolean;
  isAvailable: boolean;
}[]