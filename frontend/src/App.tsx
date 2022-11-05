import React, { useEffect, useState } from "react";
import { Address, Wallet } from "fuels";
import "./App.css";

// Import the contract factory -- you can find the name in index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { CounterContractAbi, CounterContractAbi__factory } from "./contracts";
// The address of the contract deployed the Fuel testnet
const CONTRACT_ID = "0xd1394cf61e7b0195b0739406906981e962418901b73f83665ec6bc4b597c6845";
//the private key from createWallet.js
const WALLET_SECRET = "0x5468d88c1dd5aaf860518cfea55640303e3205ab8c29ad3f8495f3728a32d062"
// Create a Wallet from given secretKey in this case
// The one we configured at the chainConfig.json
const wallet = new Wallet(WALLET_SECRET, "https://node-beta-1.fuel.network/graphql");
// Connects out Contract instance to the deployed contract
// address using the given wallet.
const contract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet);


function App() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(WALLET_SECRET)
  
  
  useEffect(() => {
    async function main() {
      // Executes the counter function to query the current contract state
      // the `.get()` is read-only, because of this it don't expand coins.
      const { value } = await contract.functions.count().get();
      setCounter(Number(value));
    }
    main();
  }, []);
  async function increment() {
    // a loading state
    setLoading(true);
    // Creates a transactions to call the increment function
    // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
    try {
      await contract.functions.increment().txParams({gasPrice:1}).call();
      const { value } = await contract.functions.count().get();
      setCounter(Number(value));
    } finally {
      setLoading(false);
    }
  }

  
  async function register() {
    setLoading(true);
    // Creates a transactions to call the increment function
    // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
    try {
      setAddress(String(address))
      await contract.functions.registered().txParams({gasPrice:1}).call();

    } finally {
      setLoading(false);
    }   
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Counter: {counter}</p>
        <button
          disabled={loading}
          onClick={increment}>
          {loading ? "Incrementing..." : "Increment"}
        </button>
        <p>Address: {address}</p>
        <input></input>
        <button
          disabled={loading}
          onClick={register}>
          {loading ? "Naming..." : "Register"}
        </button>
      </header>
    </div>
  );
}
export default App;