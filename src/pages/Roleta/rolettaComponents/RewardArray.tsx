import { useEffect } from 'react';
import style from '../roletta.module.css';
import RewardItem from './RewardItem';
import axios from 'axios';
import { RewardItemType } from 'utils/interfaces';
import { useRewardState } from 'contexts/RewardContext';

const RewardsArray = () => {
  const { rewards, setNewRewards } = useRewardState() as { rewards: RewardItemType[], setNewRewards: Function };

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/skin")
      .then((res: any) => setNewRewards(res.data))
      .catch((err: any) => console.error('error: ', err));
  }, []);

  return (
    <div className={style.RewardsArray}>
      {rewards && rewards.map((item, index) => {
        if (index < 4) return <RewardItem key={index} props={item} />;
      })}
    </div>
  );
}

export default RewardsArray;
