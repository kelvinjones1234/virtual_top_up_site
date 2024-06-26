import { useEffect, React } from "react";
import close from "../assets/close.svg";

const FundWalletModal = ({ onClose }) => {
  useEffect(() => {
    const loadMonnifySDK = async () => {
      const script = document.createElement("script");
      script.src = "https://sdk.monnify.com/plugin/monnify.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Monnify SDK Loaded");
      };

      script.onerror = () => {
        console.error("Failed to load Monnify SDK");
      };

      return () => {
        document.body.removeChild(script);
      };
    };

    loadMonnifySDK();
  }, []);

  const payWithMonnify = async () => {
    if (typeof MonnifySDK === "undefined") {
      console.error("Monnify SDK is not loaded yet.");
      return;
    }

    MonnifySDK.initialize({
      amount: 100,
      currency: "NGN",
      reference: String(new Date().getTime()),
      customerFullName: "Damilare Ogunnaike",
      customerEmail: "ogunnaike.damilare@gmail.com",
      apiKey: "MK_TEST_YX3CEVCCPN",
      contractCode: "9500216336",
      paymentDescription: "Lahray World",
      metadata: {
        name: "Damilare",
        age: 45,
      },
      onLoadStart: () => {
        console.log("Loading has started");
      },
      onLoadComplete: () => {
        console.log("SDK is UP");
      },
      onComplete: (response) => {
        console.log("Transaction complete:", response);
      },
      onClose: (data) => {
        console.log("Modal closed:", data);
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-transparent"></div>

      <div className="bg-white rounded-2xl p-8 z-10 mx-auto max-w-[500px] relative">
        <div
          className="h-10 w-10 bg-red-500 hover:bg-red-600 transition duration-400 ease-in-out right-[-10px] bottom-[14rem] cursor-pointer rounded-full absolute"
          onClick={onClose}
        >
          <div className="relative">
            <img
              src={close}
              alt="close"
              className="absolute h-[1.5rem] top-2 left-[.45rem] w-[1.5rem]"
            />
          </div>
        </div>
        <h2 className="text-2xl text-primary mb-4 font-bold">Fund Wallet</h2>
        <div className="">
          <div>
            <input
              type="text"
              placeholder="Enter Amount"
              aria-label="Enter Amount"
              className="transition duration-450 max-w-[428.40px] mx-auto w-[70vw] ease-in-out my-2 text-primary py-1 px-4 h-[3.5rem] text-[1.2rem] rounded-2xl outline-0 border border-gray-700 hover:border-black focus:border-link"
            />
          </div>
          <div>
            <button
              onClick={payWithMonnify}
              className="text-[1rem] my-2 max-w-[428.40px] mx-auto w-[70vw] outline-none text-white p-1 h-[3.2rem] bg-link text-black rounded-2xl bg-opacity-[90%] font-semibold hover:bg-sky-400 transition duration-450 ease-in-out"
              type="button"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundWalletModal;