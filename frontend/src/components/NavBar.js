import React from "react";
import { Col, Container, Row, Image, Form, Button, InputGroup } from "react-bootstrap";
import fuel from "../assets/fuel.svg";
import { Search, Wallet2 } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";

export default function Navbar() {
    return (
        <Row className="pt-4 justify-content-center">
            <Col md={6} className="">
                <Image width={150} height={150} src={logo}></Image>
            </Col>
            <Col className="mt-4" md={{ span: 2, offset: 3 }}>
                <Button style={{ backgroundColor: "#09071a", border: "1px solid grey", width: "220px", fontSize: "25px", borderRadius: "20px" }}>
                    Connect<Wallet2 className="ms-4 mb-1" color="grey" size={30}></Wallet2>
                </Button>
            </Col>
        </Row>
    );
}
