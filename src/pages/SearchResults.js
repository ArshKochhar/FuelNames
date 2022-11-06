import React from "react";
import { useState, useEffect } from "react";
import { Col, Container, Row, Image, Form, Button, InputGroup } from "react-bootstrap";
import { Search, Check, SlashCircleFill } from "react-bootstrap-icons";
import NavBar from "../components/NavBar";
import RegisterModal from "../components/RegisterModal";
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

export default function SearchResults() {
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("Search For Your Name");
    const [modalShow, setModalShow] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        async function main() {
            // Executes the counter function to query the current contract state
            // the `.get()` is read-only, because of this it don't expand coins.
            const { value } = await contract.functions.get_name(search).get();
        }
        main();
        setQuery(localStorage.getItem("query"));
        const addy = localStorage.getItem("isRegistered");
        if (addy === "0x0000000000000000000000000000000000000000000000000000000000000000") {
            setIsRegistered(false);
        } else {
            setIsRegistered(true);
        }
    }, []);

    async function get_name(event) {
        setLoading(true);
        try {
            // setName(String(name));
            console.log(search, "in get_name function");
            //await contract.functions.get_name(name).txParams({ gasPrice: 1}).call();
        } finally {
            const retrievedName = await contract.functions.get_name(query).get();
            if (retrievedName.value.value === "0x0000000000000000000000000000000000000000000000000000000000000000") {
                setIsRegistered(false);
            } else {
                setIsRegistered(true);
            }
            setLoading(false);
        }
    }

    const handleChange = (event) => {
        console.log(query, "Handling Change");
        setQuery(event.target.value);
    };

    return (
        <div className="App-header">
            <NavBar></NavBar>
            <Container className="" style={{ marginTop: "150px" }}>
                <Row className="justify-content-center">
                    <Col className="col-7">
                        <Form>
                            <InputGroup className="mb-3">
                                <Button onClick={get_name} style={{ backgroundColor: "#09071a", width: "90px", border: "1px solid white" }}>
                                    <Search size={40} color="grey"></Search>
                                </Button>
                                <Form.Control onChange={handleChange} className="formSearch" style={{ height: "70px", fontSize: "30px", backgroundColor: "#09071a", color: "white" }} placeholder={query !== "" ? query : search} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <InputGroup.Text style={{ fontSize: "30px", backgroundColor: "#01ffc8" }} id="basic-addon2">
                                    .fuel
                                </InputGroup.Text>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col className="col-7">
                        <Container className="searchResultMatch text-center">
                            <Row className="text-left ps-4" style={{ background: "grey", borderTopRightRadius: "30px", borderTopLeftRadius: "30px", padding: "5px", border: "3px solid grey " }}>
                                <h4 className="exactMatch">Exact Match</h4>
                            </Row>
                            <Row className="mt-4 justify-content-center ps-4 ms-4 mb-4">
                                <Col className="col-sm-6 mt-3 ">
                                    <h1 style={{ color: "white" }} className="">
                                        {isRegistered === true ? (
                                            <h2>
                                                <SlashCircleFill className="me-2" color="red" size={50}></SlashCircleFill>
                                                {query}.fuel
                                            </h2>
                                        ) : (
                                            <h2>
                                                <Check className="me-2" color="#01ffc8" size={80}></Check>
                                                {query}.fuel
                                            </h2>
                                        )}
                                    </h1>
                                </Col>
                                {isRegistered === true ? (
                                    <Col className="col-sm-6 ">
                                        <h2 className="unmatched">Unavailable</h2>
                                    </Col>
                                ) : (
                                    <Col className="col-sm-6 ">
                                        <h2 className="matched">Available</h2>
                                    </Col>
                                )}
                            </Row>
                            <Button disabled={isRegistered} className="registerDomain" variant="primary" onClick={() => setModalShow(true)}>
                                Register Domain
                            </Button>
                        </Container>
                    </Col>
                </Row>
            </Container>

            <RegisterModal query={query} show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
}
