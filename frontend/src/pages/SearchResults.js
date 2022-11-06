import React from "react";
import { useState, useEffect } from "react";
import { Col, Container, Row, Image, Form, Button, InputGroup } from "react-bootstrap";
import { Search, Check, SlashCircleFill } from "react-bootstrap-icons";
import NavBar from "../components/NavBar";
import RegisterModal from "../components/RegisterModal";

export default function SearchResults() {
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("Search For Your Name");
    const [modalShow, setModalShow] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        setQuery(localStorage.getItem("query"));
        const addy = localStorage.getItem("isRegistered");
        if (addy === "0x0000000000000000000000000000000000000000000000000000000000000000") {
            setIsRegistered(false);
        } else {
            setIsRegistered(true);
        }
    }, []);

    function getQuery(event) {
        setSearch(event.target.value);
    }
    function storeQuery() {
        setQuery(localStorage.setItem("query", search));
        // navigate("/searchResults");
    }

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
