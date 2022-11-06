import React from "react";
import { Modal, Button, Row, Col, Alert } from "react-bootstrap";
import { Check } from "react-bootstrap-icons";
import { useState } from "react";
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

export default function RegisterModal(props) {
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState(WALLET_SECRET);
    const [hasRegister, setIsRegistered] = useState(false);

    async function register() {
        setLoading(true);
        console.log(loading, "before");
        // Creates a transactions to call the increment function
        // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
        try {
            setAddress(String(address));
            console.log(address);
            await contract.functions.register({ value: address }, props.query).txParams({ gasPrice: 1 }).call();
            setIsRegistered(true);
        } finally {
            setLoading(false);
            console.log(props.query);
            console.log({
                Address: {
                    value: address,
                },
            });
            const mintHash = await contract.functions
                .mint(
                    1,
                    {
                        Address: {
                            value: address,
                        },
                    },
                    props.query
                )
                .txParams({ gasPrice: 1 })
                .call();
            console.log(mintHash);
        }
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body style={{ backgroundColor: "#05040e", color: "white", padding: "70px", height: "550px" }}>
                {hasRegister && (
                    <Alert className="text-center mb-4 alert" variant="dark">
                        <h4>
                            Your domain, <span style={{ fontWeight: "800" }}>{props.query}.fuel</span> has been registered!
                        </h4>
                    </Alert>
                )}
                <Row className=" justify-content-center ps-4 ms-4 modalConfirmation mt-4">
                    <Col className="col-sm-7 ">
                        <h2 style={{ color: "white" }} className="mt-4">
                            <Check color="#01ffc8" size={80}></Check>
                            {props.query}.fuel
                        </h2>
                    </Col>
                    <Col className="col-sm-5">
                        <div className="matched">Available</div>
                    </Col>
                </Row>
                <Row style={{ marginTop: "70px" }} className="text-center fee">
                    <h4>
                        Registration Fee
                        <span className="ms-4 ps-4" style={{ color: "grey" }}>
                            0.0420 FUEL
                        </span>{" "}
                    </h4>
                </Row>
                <Row style={{ marginTop: "60px" }} className="text-center">
                    <Col>
                        {hasRegister === false ? (
                            <Button onClick={register} className="registerDomain" variant="primary">
                                Confirm Domain
                            </Button>
                        ) : (
                            <Button onClick={register} className="viewNFT" variant="primary">
                                View NFT
                            </Button>
                        )}
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}
