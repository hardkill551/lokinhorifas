import Image from "next/image";
import { Dispatch, useEffect, useRef, useState } from "react";
import shield from '../assets/checkmark.shield.svg'

declare global {
  interface Window {
    paymentBrickController?: {
      unmount: () => void;
    };
    MercadoPago: any;
  }
}

const PaymentBrick = ({ props }: { props: { setShowPayment: Dispatch<React.SetStateAction<boolean>> } }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [ price, setPrice ] = useState(0)
  const ref = useRef<HTMLInputElement>(null)

  const { setShowPayment } = props

  const [ step, setStep ] = useState(3)

  const addStep = () => {
    setStep(oldValue => oldValue + 1)
  }

  const removeStep = () => {
    setStep(oldValue => oldValue - 1)
  }

  useEffect(() => {
    // Verifica se o SDK foi carregado
    const checkSdkLoaded = () => {
      if (window.MercadoPago) {
        setSdkLoaded(true);
        console.log("MercadoPago SDK carregado com sucesso.");
      } else {
        console.log(
        "MercadoPago SDK ainda não carregado. Tentando novamente em 2s..."
        );
        setTimeout(checkSdkLoaded, 2000);
      }
    };

    checkSdkLoaded();
  }, []);

  useEffect(() => {
    if (!sdkLoaded || price == 0 || step != 2) return; // Aguarda até que o SDK esteja carregado e o valor da compra seja maior que o padrão (0) e que a etapa esteja certa

    const renderPaymentBrick = async () => {
      console.log("MercadoPago está carregado, iniciando...");

      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_ACCESS_KEY, {
        locale: "pt-BR",
      });

      const bricksBuilder = mp.bricks();
      const settings = {
        initialization: {
          amount: price, // Valor a ser pago
        },
        customization: {
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            ticket: "all",
            bankTransfer: "all",
            atm: "all",
            maxInstallments: 1
          },
          visual: {
            hideFormTitle: true,
            style: {
              theme: "default",
            },
          },
        },
        callbacks: {
          onReady: () => {
            console.log("Payment Brick is ready");
          },
          onSubmit: ({
            selectedPaymentMethod,
            formData,
          }: {
            selectedPaymentMethod: any;
            formData: any;
          }): Promise<void> => {
            console.log("Enviando dados de pagamento...");
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
                  addStep()
                  resolve(response);
                })
                .catch((error) => {
                  console.log("Erro encontrado: ", reject(error))
                });
            });
          },
          onError: (error: Error) => {
            console.error("Erro no pagamento:", error);
          },
        },
      };

      try {
        window.paymentBrickController = await bricksBuilder.create(
          "payment",
          "paymentBrick_container",
          settings
        );
        console.log("Payment Brick foi criado com sucesso.");
      } catch (error) {
        console.error("Erro ao criar o Payment Brick:", error);
      }
    };

    // Renderiza o Payment Brick na montagem do componente
    renderPaymentBrick();

    // Desmonta o Payment Brick quando o componente for desmontado
    return () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
        console.log("Payment Brick desmontado.");
      }
    };
  }, [sdkLoaded, step]); // Executa o efeito quando o SDK estiver carregado

  const handlePriceChange = () => {
    if(ref.current === null) return

    setPrice(Number(ref.current.value))
  }

  const handleStepChange = () => {
    return `brickContent step-${step}-wrap`
  }

  return ( 
    <div className="brick">
      <div className="brickWrapper">
        <div className={handleStepChange()}>
          <div className="step-1">
            <h2>Quanto de saldo gostaria de adicionar à sua conta?</h2>
            <input type="number" placeholder="Valor em reais" ref={ref} onChange={handlePriceChange}/>
            <button disabled={price <= 0} onClick={addStep}>Continuar</button>
            <p>Poderá voltar para alterar esse valor depois</p>
          </div>
          <div className="step-2">
            <div className="paymentWrapper">
              <div id="paymentBrick_container"></div>
            </div>
            <a onClick={removeStep}>&lt;- Voltar</a>
          </div>
          <div className="step-3">
            <Image src={shield} alt="Ícone de confirmação"/>
            <h2>Estamos processando o pagamento!</h2>
            <p>Já já estará disponível o novo saldo!</p>
            <button disabled={step != 3} onClick={() => setShowPayment(false)}>Continuar</button>
          </div>
        </div>
      </div>
      <div className="background" onClick={() => setShowPayment(false)}></div>
    </div>
   );
}
 
export default PaymentBrick;