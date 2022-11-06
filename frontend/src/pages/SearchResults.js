import React from "react";
import { useState, useEffect } from "react";
import { Col, Container, Row, Image, Form, Button, InputGroup } from "react-bootstrap";
import { Search, Check } from "react-bootstrap-icons";
import NavBar from "../components/NavBar";
import RegisterModal from "../components/RegisterModal";

export default function SearchResults() {
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("Search For Your Name");
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        setQuery(localStorage.getItem("query"));
    });

    function getQuery(event) {
        setSearch(event.target.value);
    }
    function storeQuery() {
        setQuery(localStorage.setItem("query", search));
        // navigate("/searchResults");
    }

    return (
        <div className="App-header">
            <NavBar></NavBar>
            <Container className="" style={{ marginTop: "150px" }}>
                <Row className="justify-content-center">
                    <Col className="col-7">
                        <Form>
                            <InputGroup className="mb-3">
                                <Button onClick={storeQuery} style={{ backgroundColor: "#09071a", width: "90px", border: "1px solid white" }}>
                                    <Search size={40} color="grey"></Search>
                                </Button>
                                <Form.Control onChange={getQuery} className="formSearch" style={{ height: "70px", fontSize: "30px", backgroundColor: "#09071a", color: "white" }} placeholder={query !== "" ? query : search} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <InputGroup.Text style={{ fontSize: "30px" }} id="basic-addon2">
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
                            <Row className="mt-4 justify-content-center ps-4 ms-4">
                                <Col className="col-sm-6 ">
                                    <h1 style={{ color: "white" }} className="mt-4">
                                        <Check color="#01ffc8" size={80}></Check>
                                        {query}.fuel
                                    </h1>
                                </Col>
                                <Col className="col-sm-6">
                                    <div className="matched">Available</div>
                                </Col>
                            </Row>
                            <Button className="registerDomain" variant="primary" onClick={() => setModalShow(true)}>
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
