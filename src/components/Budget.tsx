import { useUserStateContext } from "contexts/UserContext";
import { Dispatch, useEffect } from "react";
import { IBrickError, PaymentFormData, UserInfoType } from "utils/interfaces";

import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago("APP_USR-d7aebced-a1cc-4b1a-b8aa-f66b6e9b2a24");
import { Payment } from '@mercadopago/sdk-react';

const Budget = () => {
  const { userInfo, setShowBudget } = useUserStateContext() as { userInfo: UserInfoType, showBudget: boolean, setShowBudget: Dispatch<React.SetStateAction<boolean>> }

  const formatarDataHoraAtual = () => {
    const agora = new Date(Date.now())

    const dia = String(agora.getDate()).padStart(2, '0')
    const mes = String(agora.getMonth() + 1).padStart(2, '0')
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, '0')
    const minutos = String(agora.getMinutes()).padStart(2, '0')

    return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`
  }

  // TEMPORÁIO
  const lastPayments = [
    {
      date: formatarDataHoraAtual(),
      type: 'Compra de saldo',
      moneySpent: 15,
      totalBudgetThen: 0
    },
    {
      date: formatarDataHoraAtual(),
      type: 'Compra de saldo',
      moneySpent: 15,
      totalBudgetThen: 0
    },
    {
      date: formatarDataHoraAtual(),
      type: 'Compra de saldo',
      moneySpent: 15,
      totalBudgetThen: 0
    },
    {
      date: formatarDataHoraAtual(),
      type: 'Compra de saldo',
      moneySpent: 15,
      totalBudgetThen: 0
    },
    {
      date: formatarDataHoraAtual(),
      type: 'Compra de saldo',
      moneySpent: 15,
      totalBudgetThen: 0
    },
  ]

  const initialization = {
    amount: 100,
   };
   const customization = {
    paymentMethods: {
      creditCard: "all",
      debitCard: "all",
      ticket: "all",
      bankTransfer: "all",
      atm: ["all"],
      maxInstallments: 1
    },
  };
   const onSubmit = async ({ selectedPaymentMethod, formData }: PaymentFormData) => {
    // callback chamado ao clicar no botão de submissão dos dados
    return new Promise((resolve, reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          // receber o resultado do pagamento
          console.log(response)
          resolve(response);
        })
        .catch((error) => {
          console.log(error, selectedPaymentMethod)
          reject();
        });
    });
   };
   const onError = async (error: IBrickError) => {
    // callback chamado para todos os casos de erro do Brick
    console.log(error);
   };
   const onReady = async () => {
    /*
      Callback chamado quando o Brick estiver pronto.
      Aqui você pode ocultar loadings do seu site, por exemplo.
    */
   };
  

  return (
    <div className="budget">
      <div className="budgetWrapper">
        <div className="currentBudget">
          <h1>R$ {userInfo.saldo.toFixed(2).toString().replace('.', ',')}</h1>
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
              {lastPayments.length > 0 && lastPayments.map(payment =>
              <tr>
                <th>{payment.date}</th>
                <th>{payment.type}</th>
                <th className="price loss">-R$ {payment.moneySpent.toFixed(2).toString().replace('.', ',')}</th>
                <th className="price">R$ {payment.totalBudgetThen.toFixed(2).toString().replace('.',',')}</th>
              </tr>)}
            </tbody>
          </table>
        </div>

        <Payment
          initialization={initialization}
          customization={customization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />

        <button>Comprar Saldo</button>
      </div>
      <div onClick={() => setShowBudget(false)} className="background"></div>
    </div>
  );
}
 
export default Budget;