import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthenticationContext";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletData, setWalletData] = useState({ balance: 0 });
  const { user, authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/wallet/${user.username}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        setWalletData(response.data);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    };

    user && authTokens && fetchWalletData();
  }, [user, authTokens]);

  const updateWalletBalance = (newBalance) => {
    setWalletData((prevData) => ({
      ...prevData,
      balance: newBalance,
    }));
  };


  return (
    <WalletContext.Provider value={{ walletData, updateWalletBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
