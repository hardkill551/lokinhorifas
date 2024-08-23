import { useUserStateContext } from "contexts/UserContext";
import { Dispatch, useState } from "react";
import { UserInfoType } from "utils/interfaces";
import PaymentBrick from "./PaymentSteps";

const Budget = () => {
  const { userInfo, setShowBudget } = useUserStateContext() as {
    userInfo: UserInfoType;
    showBudget: boolean;
    setShowBudget: Dispatch<React.SetStateAction<boolean>>;
  };

  const [ showPayment, setShowPayment ] = useState(false)

  const formatarDataHoraAtual = (): string => {
    const agora = new Date();

    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`;
  };

  interface LastPayment {
    date: string;
    type: string;
    moneySpent: number;
    totalBudgetThen: number;
  }

  const lastPayments: LastPayment[] = [
    {
      date: formatarDataHoraAtual(),
      type: "Compra de saldo",
      moneySpent: 15,
      totalBudgetThen: 0,
    },
    {
      date: formatarDataHoraAtual(),
      type: "Compra de saldo",
      moneySpent: 15,
      totalBudgetThen: 0,
    },
    {
      date: formatarDataHoraAtual(),
      type: "Compra de saldo",
      moneySpent: 15,
      totalBudgetThen: 0,
    },
    {
      date: formatarDataHoraAtual(),
      type: "Compra de saldo",
      moneySpent: 15,
      totalBudgetThen: 0,
    },
    {
      date: formatarDataHoraAtual(),
      type: "Compra de saldo",
      moneySpent: 15,
      totalBudgetThen: 0,
    },
    {
      date: formatarDataHoraAtual(),
      type: "Compra de saldo",
      moneySpent: 15,
      totalBudgetThen: 0,
    },
    {
      date: formatarDataHoraAtual(),
      type: "Compra de saldo",
      moneySpent: 15,
      totalBudgetThen: 0,
    },
    {
      date: formatarDataHoraAtual(),
      type: "Compra de saldo",
      moneySpent: 15,
      totalBudgetThen: 0,
    },
    {
      date: formatarDataHoraAtual(),
      type: "Compra de saldo",
      moneySpent: 15,
      totalBudgetThen: 0,
    },
    {
      date: formatarDataHoraAtual(),
      type: "Compra de saldo",
      moneySpent: 15,
      totalBudgetThen: 0,
    },
  ];

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
                <th>Tipo da Movimentação</th>
                <th className="price">Débito/Crédito</th>
                <th className="price">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {lastPayments.length > 0 &&
                lastPayments.map((payment, index) => (
                  <tr key={index}>
                    <th>{payment.date}</th>
                    <th>{payment.type}</th>
                    <th className="price loss">
                      -R${" "}
                      {payment.moneySpent
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                    </th>
                    <th className="price">
                      R${" "}
                      {payment.totalBudgetThen
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <button onClick={() => setShowPayment(true)}>Comprar Saldo</button>

        {showPayment && <PaymentBrick props={{setShowPayment}}/>}
      </div>
      <div onClick={() => setShowBudget(false)} className="background"></div>
    </div>
  );
};

export default Budget;
