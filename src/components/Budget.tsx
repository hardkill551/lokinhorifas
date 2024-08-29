import { useUserStateContext } from "contexts/UserContext";
import { UserContextType } from "utils/interfaces";

const Budget = () => {
  const { userInfo, setShowPayment, setShowBudget, lastestTransactions } = useUserStateContext() as UserContextType;

  const formatarDataHoraAtual = (date: string): string => {
    const getDate = new Date(date)

    const dia = String(getDate.getDate()).padStart(2, "0");
    const mes = String(getDate.getMonth() + 1).padStart(2, "0");
    const ano = getDate.getFullYear();
    const horas = String(getDate.getHours()).padStart(2, "0");
    const minutos = String(getDate.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`;
  };

  return (
    <div className="budget">
      <div className="budgetWrapper">
        <div className="currentBudget">
          <h1>R$ {userInfo.saldo.toFixed(2).toString().replace(".", ",")}</h1>
          <h2>Saldo Atual</h2>
        </div>

        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>Data da Movimentação</th>
                <th>Status</th>
                <th>Método</th>
                <th className="price">Débito/Crédito</th>
              </tr>
            </thead>
            <tbody>
              {lastestTransactions.length > 0 &&
                lastestTransactions.map((payment) => (
                  <>
                    <tr key={payment.id}>
                      <th>{formatarDataHoraAtual(payment.date)}</th>
                      <th>{payment.status.toUpperCase()}</th>
                      <th>{payment.method}</th>
                      <th className={`price ${payment.type == 'credit' ? 'earn' : 'loss'}`}>
                        {payment.type == 'credit' ? '+ ' : '- '}R${" "}
                        {payment.exchanged
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}
                      </th>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>

        <button onClick={() => setShowPayment(true)}>Comprar Saldo</button>
      </div>
      <div onClick={() => setShowBudget(false)} className="background"></div>
    </div>
  );
};

export default Budget;
