import React from "react";
import { Col, Container, Row, Image, Form, Button, InputGroup } from "react-bootstrap";
import fuel from "../assets/fuel.svg";
import { Search, Wallet2 } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import WalletModal from "./WalletModal";

export default function Navbar() {
    const [modalShow, setModalShow] = useState(false);
    const [isAddy, setIsAddy] = useState("Connect");
    return (
        <Container fluid>
            <Row className="pt-4 justify-content-center">
                <Col md={5} className="me-4">
                    <Image width={150} height={150} src={logo}></Image>
                </Col>
                <Col className="mt-4 pe-4" md={{ span: 1, offset: 3 }}>
                    <Button onClick={() => setModalShow(true)} style={{ backgroundColor: "#09071a", border: "1px solid grey", width: "280px", fontSize: "25px", borderRadius: "20px" }}>
                        {isAddy}
                        <Wallet2 className="ms-4 mb-1" color="grey" size={30}></Wallet2>
                    </Button>
                </Col>
            </Row>
            <WalletModal setIsAddy={setIsAddy} show={modalShow} onHide={() => setModalShow(false)} />
        </Container>
    );
}
