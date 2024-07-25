import MaskedInput from "react-text-mask";
import thanksShield from '../assets/checkmark.shield.svg'
import Image from "next/image";
import { useState } from "react";

const Budget = ({ props }: { props: {showBudget: boolean, setShowBudget: React.Dispatch<React.SetStateAction<boolean>>} }) => {

  const { showBudget, setShowBudget } = props
  const [ step, setStep ] = useState<number>(0)

  const addStep = () => {
    setStep(oldValue => oldValue += 1)
  }

  const validadeForm = () => {

    // TODO fazer validação

    console.log('here', step)

    if(step == 0) addStep()
  }

  return (
    <div className="budget">
      <div className="statusBar">
        <div className="error"></div>
      </div>
      <div className="budgetViewport">
        <div className={`budgetWrapper  ${step == 1 ? 'step-2' : ''}`}>
          <div className="budgetRecharge">
            <div className='titleWrapper'>
              <h2>Pagamento</h2>
              <p>Preencha os dados para confirmar sua compra</p>
            </div>

            {/* <label>
              <p>Forma de Pagamento</p>
              <select name="paymentType">
                <option value="">--Selecione uma forma de pagamento--</option>
                <option value="credit">Crédito</option>
                <option value="debit">Débito</option>
                <option value="pix">Pix</option>
              </select>
            </label> */}

            <label>
              <p>Número do Cartão</p>
              <MaskedInput
                mask={[
                  /[1-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ',
                  /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ',
                  /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ',
                  /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/
                ]}
                // onChange={}
                // value={userData.phoneNumber}
                placeholder="1234 5678 9012 3456"
                name="cardNumber"
              />
            </label>
            <label>
              <p>CCV</p>
              <MaskedInput
                mask={[
                  /[0-9]/, /[0-9]/, /[0-9]/,
                  // /\s?/,
                  // /[0-9]/,
                ]}
                // onChange={}
                // value={userData.phoneNumber}
                placeholder="123"
                name="ccv"
              />
            </label>
            <label>
              <p>Nome escrito no cartão</p>
              <input
              // onChange={}
              // value={userData.phoneNumber}
                placeholder="João Carlos Freitas"
                name="name"
              />
            </label>
            <label>
              <p>CPF do Titular</p>
              <MaskedInput
                mask={[
                  /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/
                ]}
                // onChange={}
                // value={userData.phoneNumber}
                placeholder="123.123.123-12"
                name="cpf"
              />
            </label>
            <label>
              <p>Data de expiração</p>
              <MaskedInput
                mask={[
                  /[0-1]/, /[0-9]/, '/', /[0-9]/, /[0-9]/
                ]}
                // onChange={}
                // value={userData.phoneNumber}
                placeholder="DD/MM"
                name="expiryDate"
              />
            </label>

            <button onClick={() => validadeForm()}>Confirmar pagamento</button>
          </div>

          <div className="thanksScreen">
            <Image src={thanksShield} alt="Agradecimento"/>
            <h2>Obrigado</h2>
            <p>Seu saldo novo estará disponível em breve</p>

            <button onClick={() => setShowBudget(false)} >Continuar</button>
          </div>
        </div>
      </div>
      <div onClick={() => setShowBudget(false)} className="background"></div>
    </div>
  );
}
 
export default Budget;