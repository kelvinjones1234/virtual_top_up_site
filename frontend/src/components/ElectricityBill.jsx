import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthenticationContext";
import GeneralLeft from "./GeneralLeft";
import GeneralRight from "./GeneralRight";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const ElectricityBill = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [electricitySetings, setElectricitySettings] = useState([]);
  const [price, setPrice] = useState("");
  const [bypassPhoneNumber, setBypassPhoneNumber] = useState(false);
  const [discos, setDiscos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleBypass = () => {
    setBypassPhoneNumber(!bypassPhoneNumber);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/electricity-bill/")
      .then((response) => setDiscos(response.data))
      .catch((error) => console.error("Error Fetching Discos", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/electricity-settings/")
      .then((response) => setElectricitySettings(response.data))
      .catch((error) => console.error("Error Meter Type", error));
  }, []);

  return (
    <div className="bg-bg_on h-auto bg-contain bg-no-repeat justify-center mt-[20vh] sm:bg-cover bg-center px-4 ss:px-[5rem] sm:px-[1rem] sm:flex gap-5 md:gap-12 lg:mx-[5rem]">
      <GeneralLeft />
      <div className="">
        <div>
          <h2 className="font-bold font-heading_two text-white text-[1.5rem]">
            Pay Electricity Bill
          </h2>
          <div className="flex items-center text-gray-100 py-4 font-semibold">
            <Link to={"/user/dashboard"}>Dashboard</Link>{" "}
            <div className="h-1 w-1 mx-5 bg-white rounded-full"></div>
            <span className="text-gray-500">Electricity Bill</span>
          </div>
        </div>
        <div className="flex flex-col justify-center border-[0.01rem] border-gray-900 p-5 rounded-[1.5rem] bg-opacity-15 shadow-lg shadow-indigo-950/10">
          <form onSubmit={handleSubmit}>
            <div>
              <select
                name="disco_name"
                aria-label="Disco Name"
                className="custom-select sm:w-[40vw] transition duration-450 ease-in-out mb-2 w-full text-white py-1 px-4 h-[3.5rem] bg-[#18202F] text-[1.2rem] rounded-2xl outline-0 border border-gray-700 hover:border-black focus:border-[#1CCEFF] bg-opacity-80"
              >
                <option value="" disabled>
                  Disco Name
                </option>
                {discos.map((item) => (
                  <option key={item.id}>{item.disco_name}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="meter_type"
                aria-label="Meter Type"
                className="custom-select sm:w-[40vw] transition duration-450 ease-in-out my-2 w-full text-white py-1 px-4 h-[3.5rem] bg-[#18202F] text-[1.2rem] rounded-2xl outline-0 border border-gray-700 hover:border-black focus:border-[#1CCEFF] bg-opacity-80"
              >
                <option value="" disabled>
                  Disco Name
                </option>
                {electricitySetings.map((item) => (
                  <option key={item.id} disabled={!item.is_active}>
                    {item.meter_type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                name="meter_number"
                placeholder="Meter Number"
                aria-label="Meter Number"
                className="transition duration-450 ease-in-out my-2 w-full text-white py-1 px-4 h-[3.5rem] bg-[#18202F] text-[1.2rem] rounded-2xl outline-0 border border-gray-700 hover:border-black focus:border-[#1CCEFF] bg-opacity-80"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Pin"
                aria-label="Password"
                autoComplete="current-password"
                className="transition duration-450 ease-in-out my-2 w-full text-white py-1 px-4 h-[3.5rem] bg-[#18202F] text-[1.2rem] rounded-2xl outline-0 border border-gray-700 hover:border-black focus:border-[#1CCEFF] bg-opacity-80"
              />
            </div>
            <div>
              <input
                type="text"
                name="Amount"
                placeholder="Amount"
                value=""
                className="transition duration-450 ease-in-out my-2 w-full text-white py-1 px-4 h-[3.5rem] bg-[#18202F] text-[1.2rem] rounded-2xl outline-0 border border-gray-700 bg-opacity-80"
              />
            </div>
            <div className="flex flex-wrap w-full text-white justify-between text-[1rem] py-5">
              <p
                className="text-white opacity-80 font-semibold cursor-pointer"
                onClick={handleBypass}
              >
                Bypass IUC Number
              </p>
              <div className="flex items-center mr-3">
                <div
                  className={`h-4 w-9 rounded-2xl flex items-center relative ${
                    bypassPhoneNumber ? "bg-gray-600" : "bg-primary"
                  }`}
                >
                  <div
                    className={`button h-5 w-5 bg-white rounded-full absolute transition-all duration-500 ease-in-out ${
                      bypassPhoneNumber ? "right-0" : "left-0"
                    }`}
                    onClick={handleBypass}
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <button
                className="text-[1rem] my-2 w-full outline-none text-white p-1 h-[3.2rem] bg-[#1CCEFF] text-black rounded-2xl bg-opacity-[90%] font-semibold hover:bg-sky-500 transition duration-450 ease-in-out"
                type="submit"
              >
                Purchase
              </button>
            </div>
          </form>
        </div>
      </div>
      <GeneralRight />
    </div>
  );
};

export default ElectricityBill;
