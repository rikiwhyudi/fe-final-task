import React, { useContext } from "react";
import { Container, Navbar, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    console.log(state)
    dispatch({
        type: "LOGOUT"
    })
    navigate("/")
}

  return (
    <>
      <Container>
        <Navbar className="justify-content-between align-items-center">
          <Navbar.Brand href="#">
            <img
              src="/assets/img/coways-logo.svg"
              className="d-inline-block align-top"
              alt="coways logo"
            />
          </Navbar.Brand>
          {state.isLogin ? (
            <>
              {state.user.status === "admin" ? (
                <OverlayTrigger
                  trigger="click"
                  key="bottom"
                  placement="bottom"
                  overlay={
                    <Popover>
                      <Popover.Body className="dropdown-body">
                        <text className="pe-5 d-block text-dropdown">
                          <img src="/assets/img/add-music.svg" alt="addmusic" />
                          <span>Add Music</span>
                        </text>
                        <text className="pe-5 d-block text-dropdown">
                          <img
                            src="/assets/img/addsinger.svg"
                            alt="addsinger"
                          />
                          <span>Add Singer</span>
                        </text>
                        <hr />
                        <text className="pe-5 d-block text-dropdown mt-2" onClick={logout}>
                          <img src="/assets/img/logout.svg" alt="logout" />
                          <span>Logout</span>
                        </text>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <img
                    src="/assets/img/profile.png"
                    className="users mt-3"
                    alt="profiles"
                  />
                </OverlayTrigger>
              ) : (
                <>
                  <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Popover>
                        <Popover.Body className="dropdown-body">
                          <text className="pe-5 d-block text-dropdown">
                            <img src="/assets/img/bill.svg" alt="bill" />
                            <span>Pay</span>
                          </text>
                          <hr />
                          <text className="pe-5 d-block text-dropdown mt-2" onClick={logout}>
                            <img src="/assets/img/logout.svg" alt="logout" />
                            <span>Logout</span>
                          </text>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <img
                      src="/assets/img/profile.png"
                      className="users mt-3"
                      alt="profiles"
                    />
                  </OverlayTrigger>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </Navbar>
      </Container>
    </>
  );
}

export default Header;
