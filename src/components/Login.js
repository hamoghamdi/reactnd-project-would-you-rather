import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, Button, Container, Row } from "react-bootstrap";
import { handleInitialData } from "../actions/shared";


class Login extends Component {
    state = {
    selectedUser: ""
    };
    handleChange = event => {
    console.log("event ", event.target.value);
    const selectedUser = event.target.value;
    this.setState(() => {
        return { selectedUser };
    });
    };
    handleSignin = () => {
    const authedId = this.state.selectedUser;
    if (authedId !== "" || authedId !== "unselected")
        this.props.dispatch(handleInitialData(authedId));
    };
    render() {
    return (
        <Container className="sign-in-card">
        <Row className="justify-content-md-center">
            <Card id="sign-in-card">
            <Card.Header as="h5">Welcome to Would You Rather App!</Card.Header>
            <Card.Body>
                <Card.Title>Please sign in to continue</Card.Title>
                <Card.Text></Card.Text>
                <Card.Img src="../react-redux.svg.med.png" />
                <div className="select">
                <select
                    name="slct"
                    id="slct"
                    onChange={e => this.handleChange(e)}
                    defaultValue={this.selectedUser}
                >
                    <option value="unselected">Choose a username</option>
                    <option value="sarahedo">sarahedo</option>
                    <option value="tylermcginnis">tylermcginnis</option>
                    <option value="johndoe">johndoe</option>
                </select>
                </div>
                <Button
                onClick={this.handleSignin}
                className="sign-in-btn"
                variant="outline-dark"
                size="lg"
                block
                >
                Sign in
                </Button>
            </Card.Body>
            </Card>
        </Row>
        </Container>
    );
    }
    }

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    };
}

export default connect(mapStateToProps)(Login);