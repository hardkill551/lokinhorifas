import Image from "next/image";
import { Dispatch, useEffect, useRef, useState } from "react";
import shield from "../assets/checkmark.shield.svg";
import { useRouter } from "next/router";

declare global {
  interface Window {
    paymentBrickController?: {
      unmount: () => void;
    };
    MercadoPago: any;
  }
}

const PaymentBrick = ({
  props,
}: {
  props: { setShowPayment: Dispatch<React.SetStateAction<boolean>>, valueDiff: number };
}) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [price, setPrice] = useState(0);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const router = useRouter()

  const { setShowPayment, valueDiff = 0 } = props;

  const addStep = () => {
    setStep((oldValue) => oldValue + 1);
  };

  const removeStep = () => {
    setStep((oldValue) => oldValue - 1);
  };

  // Carregue o SDK do Mercado Pago dinamicamente
  useEffect(() => {
    if(ref.current) {
      ref.current.value = valueDiff.toString()
      setPrice(Number(ref.current.value))
    }

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => {
      console.log("MercadoPago SDK loaded.");
      setSdkLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Simulação de obtenção do preferenceId (substitua por sua lógica real)
  useEffect(() => {
    if (step === 2) {
      // Simulação: definir um preferenceId fictício
      setPreferenceId("YOUR_PREFERENCE_ID");
      console.log("Preference ID set.");
    }
  }, [step]);

  // Renderize o Payment Brick
  useEffect(() => {
    if (!sdkLoaded || !preferenceId || step !== 2) {
      console.log(
        "SDK not loaded, preference ID not set, or step not correct."
      );
      return;
    }

    const renderPaymentBrick = async () => {
      console.log("Rendering Payment Brick...");

      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY, {
        locale: "pt-BR",
      });

      const bricksBuilder = mp.bricks();
      const settings = {
        initialization: {
          preferenceId: preferenceId,
          amount: price,
        },
        customization: {
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            ticket: "all",
            bankTransfer: "all",
            atm: "all",
            maxInstallments: 1,
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
            console.log("Payment Brick is ready.");
          },
          onSubmit: ({
            selectedPaymentMethod,
            formData,
          }: {
            selectedPaymentMethod: any;
            formData: any;
          }): Promise<void> => {
            console.log("Submitting payment data...");
            return new Promise((resolve, reject) => {
              fetch(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/payment`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              })
                .then((response) => response.json())
                .then((response) => {
                  console.log(response);
                  addStep();
                  resolve(response);
                })
                .catch((error) => {
                  console.log("Error encountered: ", error);
                  reject(error);
                });
            });
          },
          onError: (error: Error) => {
            console.error("Payment error:", error);
          },
        },
      };

      try {
        window.paymentBrickController = await bricksBuilder.create(
          "payment",
          "paymentBrick_container",
          settings
        );
        console.log("Payment Brick successfully created.");
      } catch (error) {
        console.error("Error creating Payment Brick:", error);
      }
    };

    renderPaymentBrick();

    return () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
        console.log("Payment Brick unmounted.");
      }
    };
  }, [sdkLoaded, preferenceId, step]);

  const handlePriceChange = () => {
    if (ref.current === null) return;
    setPrice(Number(ref.current.value));
  };

  const handleStepChange = () => {
    return `brickContent step-${step}-wrap`;
  };

  const handleCompletion = () => {
    router.reload()
    setShowPayment(false)
  }

  return (
    <div className="brick">
      <div className="brickWrapper">
        <div className={handleStepChange()}>
          <div className="step-1">
            <h2>Quanto de saldo gostaria de adicionar à sua conta?</h2>
            <input
              type="number"
              placeholder="Valor em reais"
              ref={ref}
              onChange={handlePriceChange}
            />
            <button disabled={price <= 0} onClick={addStep}>
              Continuar
            </button>
            <p>Poderá voltar para alterar esse valor depois</p>
          </div>
          <div className="step-2">
            <div className="paymentWrapper">
              <div id="paymentBrick_container"></div>
            </div>
            <a onClick={removeStep}>&lt;- Voltar</a>
          </div>
          <div className="step-3">
            <Image src={shield} alt="Ícone de confirmação" />
            <h2>Estamos processando o pagamento!</h2>
            <p>Já já estará disponível o novo saldo!</p>
            <button
              type="button"
              disabled={step != 3}
              onClick={() => handleCompletion()}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
      <div className="background" onClick={() => setShowPayment(false)}></div>
    </div>
  );
};

export default PaymentBrick;
