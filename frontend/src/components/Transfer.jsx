import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthenticationContext";
import { useWallet } from "../context/WalletContext";

const Transfer = ({ setTransferForm }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { authTokens, user } = useContext(AuthContext);
  const { walletData, updateWalletBalance } = useWallet();

  const validateInputs = () => {
    if (!phoneNumber) {
      setMessage("Please enter the recipient's phone number");
      return false;
    }
    if (!amount) {
      setMessage("Please enter an amount");
      return false;
    }
    if (!pin) {
      setMessage("Please enter your PIN");
      return false;
    }
    return true;
  };

  const transfer = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/transfer/",
        {
          phone_number: phoneNumber,
          amount: amount,
          transaction_pin: pin,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      setMessage("Transfer successful!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1500);
      setTimeout(() => setTransferForm(false), 1500);

      // Update wallet balance in context
      updateWalletBalance(walletData.balance - parseFloat(amount));

      // Reset form fields
      setPhoneNumber("");
      setAmount("");
      setPin("");
    } catch (error) {
      console.error("Transfer Error:", error);
      setMessage("Transfer failed. Please try again.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <div className="bg-primary bg-opacity-0 max-w-[208px]">
      <div className="flex flex-col justify-center border-[0.01rem] border-gray-900 p-5 rounded-[1.5rem] bg-opacity-15 shadow-lg shadow-indigo-950/10">
        {showMessage && (
          <div className="text-white mt-2 text-center transition-opacity duration-1000 ease-in-out opacity-100">
            {message}
          </div>
        )}
        <form onSubmit={transfer}>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            placeholder="Recipient Number"
            aria-label="Recipient Number"
            className="transition duration-450 ease-in-out my-2 w-full text-white py-1 px-3 h-[2.8rem] bg-[#18202F] text-[1.2rem] rounded-2xl outline-0 border border-gray-700 hover:border-black focus:border-[#1CCEFF] bg-opacity-80"
          />

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            aria-label="Amount"
            className="transition duration-450 ease-in-out my-2 w-full text-white py-1 px-3 h-[2.8rem] bg-[#18202F] text-[1.2rem] rounded-2xl outline-0 border border-gray-700 hover:border-black focus:border-[#1CCEFF] bg-opacity-80"
          />

          <input
            onChange={(e) => setPin(e.target.value)}
            value={pin}
            type="password"
            placeholder="Pin"
            aria-label="Pin"
            autoComplete="current-password"
            className="transition duration-450 ease-in-out my-2 w-full text-white py-1 px-3 h-[2.8rem] bg-[#18202F] text-[1.2rem] rounded-2xl outline-0 border border-gray-700 hover:border-black focus:border-[#1CCEFF] bg-opacity-80"
          />

          <button
            className="text-[1rem] my-2 w-full outline-none text-white p-1 h-[2.8rem] bg-[#1CCEFF] text-black rounded-2xl bg-opacity-[90%] font-semibold hover:bg-sky-500 transition duration-450 ease-in-out"
            type="submit"
          >
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
