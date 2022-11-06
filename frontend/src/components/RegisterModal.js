import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Check } from "react-bootstrap-icons";

export default function RegisterModal(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body style={{ backgroundColor: "#05040e", color: "white", padding: "100px", height: "500px" }}>
                <Row className=" justify-content-center ps-4 ms-4 modalConfirmation">
                    <Col className="col-sm-6 ">
                        <h1 style={{ color: "white" }} className="mt-4">
                            <Check color="#01ffc8" size={80}></Check>
                            {props.query}.fuel
                        </h1>
                    </Col>
                    <Col className="col-sm-6">
                        <div className="matched">Available</div>
                    </Col>
                </Row>
                <Row style={{ marginTop: "70px" }} className="text-center fee">
                    <h4>
                        Registration Fee
                        <span className="ms-4 ps-4" style={{ color: "grey" }}>
                            0.420 FUEL
                        </span>{" "}
                    </h4>
                </Row>
                <Row style={{ marginTop: "60px" }} className="text-center">
                    <Col>
                        <Button className="registerDomain" variant="primary">
                            Confirm Domain
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}
