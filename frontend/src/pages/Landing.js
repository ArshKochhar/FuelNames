import React from "react";
import { Col, Container, Row, Image, Form, Button, InputGroup } from "react-bootstrap";
import fuel from "../assets/fuel.svg";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { Address, Wallet } from "fuels";

// Import the contract factory -- you can find the name in index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { CounterContractAbi, CounterContractAbi__factory } from "../contracts";
// The address of the contract deployed the Fuel testnet
const CONTRACT_ID = "0x156a4d5f3023fd4073df29d606ced9b63d929124bfbf94d3b25b152fa19f5b53";
//the private key from createWallet.js
const WALLET_SECRET = "0x5468d88c1dd5aaf860518cfea55640303e3205ab8c29ad3f8495f3728a32d062";
// Create a Wallet from given secretKey in this case
// The one we configured at the chainConfig.json
const wallet = new Wallet(WALLET_SECRET, "https://node-beta-1.fuel.network/graphql");
// Connects out Contract instance to the deployed contract
// address using the given wallet.
const contract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet);

export default function Landing() {
    const [loading, setLoading] = useState(false);
    // const [address, setAddress] = useState(WALLET_SECRET);
    const [register, setRegister] = useState("");

    const [name, setName] = useState("");

    useEffect(() => {
        async function main() {
            // Executes the counter function to query the current contract state
            // the `.get()` is read-only, because of this it don't expand coins.
            const { value } = await contract.functions.get_name(name).get();
        }
        main();
    }, []);

    async function get_name() {
        setLoading(true);
        try {
            // setName(String(name));
            console.log(name, "in get_name function");
            //await contract.functions.get_name(name).txParams({ gasPrice: 1}).call();
        } finally {
            const retrievedName = await contract.functions.get_name(name).get();
            setRegister(retrievedName.value.value);
            setLoading(false);
        }
    }

    const handleChange = (event) => {
        console.log(name, "Handling Change");
        setName(event.target.value);
    };

    const navigate = useNavigate();

    function goToRegister() {
        localStorage.setItem("query", name);
        navigate("/searchResults");
    }
    console.log(register, "IUWBDHFUIWBEFIUCBWEC");
    localStorage.setItem("isRegistered", register);
    if (localStorage.getItem("isRegistered") !== "") {
        goToRegister();
    }

    return (
        <div className="App-header">
            <Navbar></Navbar>
            <Container style={{ marginTop: "150px", marginLeft: "150px" }} className="text-center" fluid>
                <Row className="justify-content-center ms-4 ps-4 ">
                    <Col className="col-sm-5 mt-4 pt-4">
                        <Row>
                            <h1 className="fuelTitle">
                                <span style={{ color: "#01FFC8" }}>F</span>uel <span style={{ color: "#01FFC8" }}>N</span>ames <span style={{ color: "#01FFC8" }}>S</span>ervice
                            </h1>
                        </Row>

                        <Row className="mt-4">
                            <Form>
                                <InputGroup className="mb-3">
                                    <Button onClick={get_name} style={{ backgroundColor: "#09071a", width: "90px", border: "1px solid white" }}>
                                        <Search size={40} color="grey"></Search>
                                    </Button>
                                    <Form.Control onChange={handleChange} className="formSearch" style={{ height: "70px", fontSize: "30px", backgroundColor: "#09071a", color: "white" }} placeholder="Search For Your Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <InputGroup.Text style={{ fontSize: "30px", backgroundColor: "#01ffc8" }} id="basic-addon2">
                                        .fuel
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form>
                        </Row>
                    </Col>
                    <Col className="col-sm-6 ">
                        <Image width={400} src={fuel}></Image>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
