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
  props: {
    setShowPayment: Dispatch<React.SetStateAction<boolean>>;
    valueDiff: number;
  };
}) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [price, setPrice] = useState(0);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(3);
  const [qrCode64, setQrCode64] = useState("");
  const [qrCode, setQrCode] = useState("");
  const router = useRouter();

  const { setShowPayment, valueDiff = 0 } = props;

  const addStep = () => {
    setStep((oldValue) => oldValue + 1);
  };

  const removeStep = () => {
    setStep((oldValue) => oldValue - 1);
  };

  // Carregue o SDK do Mercado Pago dinamicamente
  useEffect(() => {
    if (ref.current) {
      ref.current.value = valueDiff.toString();
      setPrice(Number(ref.current.value));
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

      const mp = new window.MercadoPago(
        process.env.NEXT_PUBLIC_PUBLIC_TEST_KEY,
        {
          locale: "pt-BR",
        }
      );

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
            bankTransfer: "pix",
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
                  console.log(response, selectedPaymentMethod);
                  if (selectedPaymentMethod != "bank_transfer") addStep();
                  addStep();
                  setQrCode(response.qrCode);
                  setQrCode64(response.qrCodeBase64);
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
    router.reload();
    setShowPayment(false);
  };

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
            {/* <Image
              src={`data:image/png;base64,${qrCode64}`}
              width={160}
              height={160}
              alt="qrcode"
            /> */}
            <Image
              src={`data:image/png;base64,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`}
              width={160}
              height={160}
              alt="qrcode"
            />
            {/* <input type="text" value={qrCode} /> */}
            <input
              type="text"
              value={"00020126580014br.gov.bcb.pix0136888fbe24-57cc-423c-858c-4a5269b1d203520400005303986540510.005802BR5915HUGO RODRIGUESC6009Sao Paulo62240520mpqrinter861252685756304FA5F"}
            />

            <button onClick={addStep}>Terminou o pagamento?</button>
            <a onClick={removeStep}>&lt;- Voltar</a>
          </div>
          <div className="step-4">
            <Image src={shield} alt="Ícone de confirmação" />
            <h2>Estamos processando o pagamento!</h2>
            <p>Já já estará disponível o novo saldo!</p>
            <button
              type="button"
              disabled={step != 4}
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
