import React from "react";
import { Col, Container, Row, Image, Form, Button, InputGroup } from "react-bootstrap";
import fuel from "../assets/fuel.svg";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";

export default function Landing() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    function getQuery(event) {
        setSearch(event.target.value);
    }
    function storeQuery() {
        localStorage.setItem("query", search);
        navigate("/searchResults");
    }
    useEffect(() => {
        // Update the document title using the browser API
        localStorage.clear();
    });

    return (
        <div className="App-header">
            <Navbar></Navbar>
            <Container style={{ marginTop: "150px" }} className="text-center" fluid>
                <Row className="justify-content-center ms-4 ps-4 ">
                    <Col className="col-sm-5 mt-4 pt-4">
                        <Row>
                            <h1 className="fuelTitle">
                                <span style={{ color: "#01FFC8" }}>F</span>uel Name<span style={{ color: "#01FFC8" }}>s</span> Service
                            </h1>
                        </Row>

                        <Row className="mt-4">
                            <Form>
                                <InputGroup className="mb-3">
                                    <Button onClick={storeQuery} style={{ backgroundColor: "#09071a", width: "90px", border: "1px solid white" }}>
                                        <Search size={40} color="grey"></Search>
                                    </Button>
                                    <Form.Control onChange={getQuery} className="formSearch" style={{ height: "70px", fontSize: "30px", backgroundColor: "#09071a", color: "white" }} placeholder="Search For Your Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <InputGroup.Text style={{ fontSize: "30px" }} id="basic-addon2">
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
