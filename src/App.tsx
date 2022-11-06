import React, { useEffect, useState } from "react";
// import { Address, Wallet } from "fuels";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import SearchResults from "./pages/SearchResults";

// // Import the contract factory -- you can find the name in index.ts.
// // You can also do command + space and the compiler will suggest the correct name.
// import { CounterContractAbi, CounterContractAbi__factory } from "./contracts";
// // The address of the contract deployed the Fuel testnet
// const CONTRACT_ID = "0x43c475dca301891ef6e9973b598e733772bdbd1ff9f53e24973ad13a18049a09";
// //the private key from createWallet.js
// const WALLET_SECRET = "0x5468d88c1dd5aaf860518cfea55640303e3205ab8c29ad3f8495f3728a32d062";
// // Create a Wallet from given secretKey in this case
// // The one we configured at the chainConfig.json
// const wallet = new Wallet(WALLET_SECRET, "https://node-beta-1.fuel.network/graphql");
// // Connects out Contract instance to the deployed contract
// // address using the given wallet.
// const contract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet);

function App() {
    // const [loading, setLoading] = useState(false);
    // const [address, setAddress] = useState(WALLET_SECRET);
    // const [name, setName] = useState("");

    // useEffect(() => {
    //     async function main() {
    //         // Executes the counter function to query the current contract state
    //         // the `.get()` is read-only, because of this it don't expand coins.
    //         const { value } = await contract.functions.get_name(name).get();
    //     }
    //     main();
    // }, []);

    // async function register() {
    //     setLoading(true);
    //     console.log(loading, "before");
    //     // Creates a transactions to call the increment function
    //     // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
    //     try {
    //         setAddress(String(address));
    //         console.log(address);
    //         await contract.functions.register({ value: address }, name).txParams({ gasPrice: 1 }).call();
    //     } finally {
    //         setLoading(false);
    //         console.log("finally");
    //     }
    // }

    // async function get_name() {
    //     setLoading(true);
    //     try {
    //         // setName(String(name));
    //         console.log(name, "in get_name function");
    //         //await contract.functions.get_name(name).txParams({ gasPrice: 1}).call();
    //     } finally {
    //         const retrievedName = await contract.functions.get_name(name).get();
    //         console.log(retrievedName);
    //         //console.log(contract.functions.get_name(name).get(), "Retrieved");
    //         setLoading(false);
    //     }
    // }

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(name, "Handling Change");
    //     setName(event.target.value);
    // };

    return (
        <div className="">
            {" "}
            <Router>
                {" "}
                <Routes>
                    {" "}
                    <Route path="/" element={<Landing />} />
                    <Route path="/searchResults" element={<SearchResults />} />
                </Routes>{" "}
            </Router>{" "}
        </div>
        // <div className="App">
        //     <header className="App-header">
        //         <p>Address: {address}</p>
        //         <input></input>
        //         <button disabled={loading} onClick={register}>
        //             {loading ? "Naming..." : "Register"}
        //         </button>
        //         <p>Search: </p>
        //         <input onChange={handleChange}></input>
        //         <button onClick={get_name}>search</button>
        //     </header>
        // </div>
    );
}
export default App;
