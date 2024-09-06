import { useLastEarnedState } from 'contexts/LastEarnedContext';
import style from '../latestWinners.module.css'
import { LastEarnedContextType } from 'utils/interfaces';
import { v4 as uuidv4 } from 'uuid';


const LatestWinnersTable = ({ props }: { props: { formatarDataHora: (date: string) => string } }) => {
  const { formatarDataHora } = props

  const { lastEarnedList } = useLastEarnedState() as LastEarnedContextType

  return (
    <div className={style.col1}>
      <h2>Recentes ganhadores</h2>
      <div className={style.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Skin</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {lastEarnedList.map(user =>
              <tr key={uuidv4()} className={Number(user.ItemValue) > 50 ? style.Gold : style.Silver}>
                <th>{user.WinnerName}</th>
                <th>{user.ItemName}</th>
                <th>{user.ItemType}</th>
                <th>R$ {Number(user.ItemValue).toFixed(2)}</th>
                <th>{formatarDataHora(user.unformattedTime)}</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
export default LatestWinnersTable;