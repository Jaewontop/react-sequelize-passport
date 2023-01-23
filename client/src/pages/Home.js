import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import "../App.css";
import { Container, Row, Button, Col } from "react-bootstrap";
import Axios from "axios";
import { GoogleLoginButton } from "react-social-login-buttons";

function Home(props) {
  const { isAuth, logout } = useContext(AuthContext);

  const [secret, setSecret] = useState("");

  // this function is duplicated in the Members page component
  // consider refactor
  const getSecret = async () => {
    const secretResponse = await Axios.get("/api/secrets");
    console.log(secretResponse.data);
    setSecret(secretResponse.data);
  };

  return (
    <Container className="signup">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>메인</h1>
          {isAuth ? (
            <>
              <Button
                className="m-1"
                onClick={(e) => {
                  e.preventDefault();
                  setSecret("");
                  logout();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className="m-1"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/login");
                }}
              >
                Email Login
              </Button>
              <Button
                className="m-1"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/signup");
                }}
              >
                Email Signup
              </Button>
              <GoogleLoginButton
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/user/google");
                }}
                align="center"
                size="40px"
                text="Google"
              />
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>{secret}</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
