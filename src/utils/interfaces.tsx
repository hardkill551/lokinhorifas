import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Dispatch } from "react";

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
    logOut: Function,
    showPayment: boolean, 
    setShowPayment: React.Dispatch<React.SetStateAction<boolean>>
    showBudget: boolean, 
    setShowBudget: React.Dispatch<React.SetStateAction<boolean>>
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
  saldo: number;
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
  itemImageUrl: string | StaticImport;
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
  picture: string | StaticImport;
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

export type raffleItem = {
  id: number,
  skins: string[],
  name: string,
  value: number,
  quantity: number,
  maxQuantity: number,
  isSelected: boolean,
  bannerSkin: string | StaticImport,
  bundleValue: number,
}
export interface RaffleNumberType {
  key: number;
  number: number;
  isSelected: boolean;
  isAvailable: boolean;
}[]



export type IBrickError = {
  type: "non_critical" | "critical";
  message: string;
  cause: ErrorCause;
}

export type ErrorCause = {
  'already_initialized':string,
  'amount_is_not_number':string,
  'amount_is_not_number_in_update':string,
  'card_token_creation_failed':string,
  'container_not_found':string,
  'fields_setup_failed':string,
  'fields_setup_failed_after_3_tries':string,
  'financial_institution_not_found':string,
  'get_address_data_failed':string,
  'get_card_bin_payment_methods_failed':string,
  'get_card_issuers_failed':string,
  'get_identification_types_failed':string,
  'get_mexico_payment_points_failed':string,
  'get_config_assets_failed':string,
  'get_payment_installments_failed':string,
  'empty_installments':string,
  'get_payment_methods_failed':string,
  'get_preference_details_failed':string,
  'get_saved_cards_failed':string,
  'incomplete_fields':string,
  'incorrect_initialization':string,
  'invalid_preference_purpose':string,
  'invalid_sdk_instance':string,
  'missing_amount_property':string,
  'missing_site_property':string,
  'missing_container_id':string,
  'missing_locale_property':string,
  'missing_payment_information':string,
  'missing_payment_type':string,
  'missing_required_callbacks':string,
  'missing_texts':string,
  'no_preference_provided':string,
  'no_chunk_path_provided':string,
  'secure_fields_card_token_creation_failed':string,
  'settings_empty':string,
  'translation_key_not_found':string,
  'unauthorized_payment_method':string,
  'update_preference_details_failed':string,
  'validations_parameter_null':string,
  'get_chunk_failed':string,
  'get_saved_cards_on_bricks_api_failed':string,
  'window_redirect_was_blocked':string,
  'missing_required_review_props':string,
  'no_payment_method_for_provided_bin':string,
  'payment_method_not_in_allowed_types':string,
  'payment_method_not_in_allowed_methods':string,
  'no_installments_in_selected_range':string,
  'no_issuers_found_for_card':string,
}

export type PaymentFormData = {
  selectedPaymentMethod: "credit_card" |
    "debit_card" |
    "ticket" |
    "bank_transfer" |
    "wallet_purchase" |
    "atm";
  formData: CardData | TicketData | BankTransferData | WalletPurchaseData;
}

export type CardData = {
  'token': string,
  'issuer_id': string,
  'payment_method_id': string,
  'transaction_amount': number,
  'payment_method_option_id': string | null,
  'processing_mode': string | null,
  'installments': number,
  'payer': {
      'email': string,
      'identification': {
              'type': string,
              'number': string
      }
  }
}

export type TicketData = {
  'payment_method_id': string,
  'transaction_amount': number,
  'transaction_details'?: {
      'financial_institution': string,
  },
  'payer': {
      'email': string,
      'identification'?: {
          'type': string,
          'number': string
      },
      'first_name'?: string,
      'last_name'?: string,
      'address'?: {
          'city': string,
          'federal_unit': string,
          'neighborhood': string,
          'street_name': string,
          'street_number': string,
          'zip_code': string
      }
  },
  'metadata'?: {
      'payment_point'?: string,
      'payment_mode'?: string
  }
}

export type BankTransferData = {
  'payment_method_id': string,
  'transaction_amount': number,
  'payer': {
      'email': string
  }
}

export type WalletPurchaseData = null

export type AdditionalData = {
  'bin': string,
  'lastFourDigits': string,
}

export type RaffleSkin = {
  id: number,
  raffle_id: number,
  skinName: string,
  skinPicture: string,
  skinType: string,
  skinValue: number,
  skin_id: number,
  winner_id: null,
}

export type RaffleParticipant = {
  number: number,
  user: {
    id: number,
    name: string,
    picture: string
  }
}

export type RaffleReward = RewardItemType & {
  id: number
}

export type Raffle = {
  createdAt: string,
  free: boolean,
  id: number,
  is_active: string,
  name: string,
  participants: RaffleParticipant[]
  raffleSkins: RaffleSkin[],
  updatedAt: string,
  users_quantity: number,
  value: number
}

export type RouletteContext = {
  availableRaffles: Raffle[],
  purchasableRaffles: raffleItem[],
  raffle: Raffle,
  winnerPopupVisible: boolean,
  isButtonActive: boolean,
  isMockWin: boolean,
  winner: HTMLElement,
  participants: Participant[],
  rewards: RaffleReward[],
  toggleSelection: (id: number) => void,
  handleChangeQuantity: (id: number, newQuantity: number) => void,
  removeReward: Function,
  setWinner: Dispatch<React.SetStateAction<HTMLElement>>,
  loadFillerCards: (position: number) => JSX.Element[] | undefined,
  manageWinner: Function,
  manageMockWinner: Function,
  manageCloseResult: Function,
  selectRaffle: (id: number) => void,
}

export interface LastPayment {
  date: string;
  type: string;
  moneySpent: number;
  totalBudgetThen: number;
}

export type rafflePayment =  {
  key: number, 
  name: string,
  quantity:number,
  value:number
}