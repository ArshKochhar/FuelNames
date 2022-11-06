import React from "react";
import { Modal, Button, Row, Col, Alert, Form, InputGroup } from "react-bootstrap";
import { Check } from "react-bootstrap-icons";
import { useState } from "react";
import { Address, Wallet } from "fuels";

export default function WalletModal(props) {
    const WALLET_SECRET = "0x5468d88....."; //placeholder
    const [addy, setAddy] = useState("");
    function handleAddy() {
        setAddy(WALLET_SECRET);
        props.setIsAddy(WALLET_SECRET);
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body style={{ backgroundColor: "#05040e", color: "white", height: "250px" }}>
                <Row className="justify-content-center mt-4">
                    <Col className="col-7">
                        <Form>
                            <InputGroup className="">
                                <Form.Control value={addy} className="formSearch" style={{ width: "50px", height: "70px", fontSize: "30px", backgroundColor: "#09071a", color: "white" }} placeholder="Enter Your Private Key" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            </InputGroup>
                            <Button onClick={handleAddy} className="ms-4 mt-4 pt-3" style={{ backgroundColor: "#09071a", width: "400px", border: "none", borderRadius: "30px" }}>
                                <h4>Generate Address</h4>
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}
