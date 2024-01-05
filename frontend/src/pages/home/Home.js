import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import classes from "./home.module.css";
import { redirect, useNavigate } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAction,
  getUserProfileAction,
} from "../../redux/actions/getUsersAction";

const Home = ({ data, deleteUser }) => {
  const [usersData, setUsersData] = useState([]);

  const [error, seterror] = useState(false);
  const [userId, setuserId] = useState("");
  const [user, setuser] = useState("");
  const [message, setmessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeData = useSelector((store) => store.Users);
  const { userAuth } = useSelector((store) => store.auth);
  // console.log(authdata)
  const { loading, appErr, serverErr, users } = storeData;
  // console.log(userAuth)
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAllUsersAction());
        setUsersData(users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, usersData]);

  const deleteMessage = () => {
    setTimeout(() => {
      setmessage(undefined);
    }, 3000);
  };

  const editHandler = (id) => {
    if (userAuth) {
      if (userAuth.isAdmin || userAuth.id === userId) {
        navigate(`/user/edit/${id}`);
        return;
      }
      setmessage(`Only admin and ${user.firstName } ${ user.lastName} can edit this Profile`);
      deleteMessage();
    } else {
      setmessage("You need to login First !");
      deleteMessage();
    }
    return null;
    // deleteUser(id);
    // setUsersData(data )
    // setuser("")
  };

  const deleteHandler = async (id) => {
    if (userAuth) {
      if (userAuth.isAdmin || userAuth.id === userId) {
        navigate(`/user/edit/${id}`);
        return;
      }
      setmessage(`Only admin and ${user.firstName } ${ user.lastName} can delete this account`);
      deleteMessage();
    } else {
      setmessage("You need to login First !");
      deleteMessage();
    }
    return null;
  };

  const userHandler = async (id) => {
    try {
      setSelectedUserId(id);

      const userData = users.find((user) => user.id === id);
      if (userData) {
        setuserId(id);

        setuser(userData);
        seterror(false);
      } else {
        // Handle the case where the user with the specified id is not found
        seterror(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const joinedDate = new Date(user.createdAt).toLocaleDateString();
  const joinedTime = new Date(user.createdAt).toLocaleTimeString();

  return (
    <div style={{ overflow: "hidden" }}>
      <Container className="mt-2 ">
        <div className="d-flex flex-direction-col  ">
          <Container
            className={classes.userContainer}
            style={{
              width: "50%",
              height: "630px",
              borderBottom: "1px solid lightgray",
            }}
          >
            <h2
              className="text-center p-2 position-sticky"
              style={{
                color: "white",
                width: "100%",
                fontFamily: "IBM Plex Sans",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 600,
                top: 0,
                marginBottom: 0,
                background: "#5A4FCF",
              }}
            >
              Users List
            </h2>
            {loading ? (
              <div
                className="d-flex flex-direction-row"
                style={{ margin: "300px auto", width: "200px" }}
              >
                <Spinner animation="border" role="status">
                  <span className="text-dark"></span>
                </Spinner>
                <span
                  style={{
                    color: "black",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    paddingLeft: 10,
                  }}
                >
                  Loading....
                </span>
              </div>
            ) : (
              <div>
                {users &&
                  users.map((user, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex flex-row justify-content-between border  align-items-center "
                        style={{
                          height: "80",
                          backgroundColor:
                            selectedUserId === user.id ? "#CCCCFF" : "white",
                        }}
                        onClick={() => {
                          userHandler(user.id);
                        }}
                      >
                        <div className="d-flex flex-row align-items-center">
                          <img
                            src={user.profilePhoto}
                            className="mt-1 mx-1 mb-1 rounded-circle border"
                            style={{
                              width: "70px",
                              height: "70px",
                              cursor: "pointer",
                            }}
                          />
                          <div>
                            <div
                              className={classes.user}
                              style={{
                                fontFamily: "IBM Plex Sans",
                                fontSize: "16px",

                                fontStyle: "normal",
                                fontWeight: 400,
                              }}
                            >
                              {user.firstName} {user.lastName}
                            </div>
                            <div
                              style={{
                                fontFamily: "IBM Plex Sans",
                                fontSize: "14px",
                                color: "#6D747A",
                                fontStyle: "normal",
                                fontWeight: 400,
                              }}
                            >
                              {user.isAdmin ? "Admin":""}
                            </div>
                            <div
                              className=""
                              style={{
                                fontFamily: "IBM Plex Sans",
                                fontSize: "12px",
                                color: "#6D747A",
                                fontStyle: "normal",
                                fontWeight: 400,
                              }}
                            >
                              {user.email}
                            </div>
                          </div>
                        </div>
                        {/* <Button variant="outline-primary" className="mx-2" onClick={()=>{
                      userHandler(user.id)
                    }} style={{height:40,}}>profile</Button> */}
                      </div>
                    );
                  })}
              </div>
            )}
          </Container>
          <Container
            className={classes.userDetailsContainer}
            style={{ width: "100%", borderRadius: "10px" }}
          >
            <h2
              className=" text-center position-sticky  p-2  bg-opacity-10 "
              style={{
                color: "white",
                width: "100%",
                height: 50,
                fontFamily: "IBM Plex Sans",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 600,
                background: "#5A4FCF",
                top: 0,
              }}
            >
              User Profile
            </h2>
            {message && (
              <div
                className="text-center border border-danger text-light  "
                style={{ height: 30, marginTop: -8, background: "#fd5c63" }}
              >
                {message}
              </div>
            )}

            {(appErr || serverErr) && (
              <div
                className="modal show"
                style={{
                  display: "block",
                  position: "initial",
                  marginTop: "200px",
                }}
              >
                <div className={classes.userBox}>
                  <h2 style={{ textAlign: "center", color: "red" }}>
                    {appErr}
                  </h2>
                  <Button
                    variant="outline-danger "
                    onClick={() => {
                      dispatch(getAllUsersAction());
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {loading ? (
              <div
                className="d-flex flex-direction-row"
                style={{ margin: "300px auto", width: "200px" }}
              >
                <Spinner animation="border" role="status">
                  <span className="text-dark"></span>
                </Spinner>
                <span
                  style={{
                    color: "black",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    paddingLeft: 10,
                  }}
                >
                  Loading....
                </span>
              </div>
            ) : (
              <div>
                {!user ? (
                  <div className={classes.userBox}>
                    {!appErr && !serverErr && (
                      <>
                        <FaRegUser
                          style={{ fontSize: "10rem", marginTop: "50px" }}
                        />
                        <h2
                          style={{ textAlign: "center", margin: "40px auto" }}
                        >
                          Select user from userlist to see user's Profile
                        </h2>
                      </>
                    )}
                  </div>
                ) : (
                  <div>
                    <div
                      className="d-flex flex-column  mt-1 "
                      style={{ height: "40" }}
                    >
                      <div className="d-flex flex-row justify-content-between">
                        {appErr ? (
                          <Alert
                            duration={5000}
                            className="alert alert-danger d-flex flex-row justify-content-between  mt-2"
                            style={{
                              width: "100%",
                              height: "auto",
                              color: "black",
                            }}
                          >
                            {appErr}
                          </Alert>
                        ) : null}
                        <button
                          className="btn btn-outline-warning align-end mx-2"
                          style={{ float: "right" }}
                          onClick={() => editHandler(userId)}
                        >
                          Edit
                        </button>
                      </div>
                      <div className=" d-flex flex-column align-items-center">
                        <img
                          src={user.profilePhoto}
                          className="mt-1 rounded-circle border"
                          style={{
                            width: "200px",
                            height: "200px",
                            backgroundColor: "#f2f2f2",
                          }}
                        />
                        <span
                          className="mt-1"
                          style={{
                            fontFamily: "IBM Plex Sans",
                            fontSize: "28px",
                            fontStyle: "normal",
                            fontWeight: 600,
                          }}
                        >
                          {user.firstName}
                          {user.lastName}
                        </span>
                        <span
                          style={{
                            fontFamily: "IBM Plex Sans",
                            fontSize: "1.5rem",
                            fontStyle: "normal",
                            textAlign: "center",
                            fontWeight: 600,
                            marginTop: -5,
                          }}
                        ></span>
                        <span
                          style={{
                            fontFamily: "IBM Plex Sans",
                            fontSize: "18px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            marginTop: 0,
                            color: "gray",
                          }}
                        >
                          Joined :{joinedDate} {joinedTime}
                        </span>
                      </div>

                      <div className=" border border-primary mx-5  rounded">
                        <div
                          className="d-flex flex-row justify-content-between"
                          style={{
                            width: "80%",
                            margin: "0px auto",
                            fontFamily: "IBM Plex Sans",
                            fontSize: "20px",
                            fontStyle: "normal",
                          }}
                        >
                          <p style={{ width: "100%", float: "left" }}>
                            <span style={{ color: "gray" }}>Id :</span>{" "}
                            {user.id}
                          </p>
                          <p style={{ width: "100%", float: "left" }}>
                            <span style={{ color: "gray" }}>User Name :</span>{" "}
                            <span>{user.firstName}</span>
                          </p>
                        </div>
                        <div
                          className="d-flex flex-row  justify-content-between"
                          style={{
                            width: "80%",
                            margin: "0px auto",
                            fontFamily: "IBM Plex Sans",
                            fontSize: "20px",
                            fontStyle: "normal",
                          }}
                        >
                          <p style={{ width: "100%", float: "left" }}>
                            <span style={{ color: "gray" }}>First Name :</span>{" "}
                            {user.firstName}
                          </p>
                          <p style={{ width: "100%", float: "left" }}>
                            <span style={{ color: "gray" }}>Last Name :</span>{" "}
                            {user.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="mt-1  mx-2 ">
                        <p
                          style={{
                            width: "80%",
                            margin: "0px auto",
                            fontFamily: "IBM Plex Sans",
                            fontSize: "20px",
                            fontStyle: "normal",
                          }}
                        >
                          <span style={{ color: "gray" }}>Email :</span>
                          <a>{user.email}</a>
                        </p>
                        <p
                          style={{
                            width: "80%",
                            margin: "0px auto",
                            fontFamily: "IBM Plex Sans",
                            fontSize: "20px",
                            fontStyle: "normal",
                            height: "auto",
                          }}
                        >
                          <span style={{ color: "gray" }}>Bio :</span> {user.id}
                        </p>
                        <p
                          style={{
                            width: "80%",
                            margin: "0px auto",
                            fontFamily: "IBM Plex Sans",
                            fontSize: "20px",
                            overflowWrap: "break",
                            fontStyle: "normal",
                            height: "auto",
                          }}
                        >
                          <span style={{ color: "gray" }}>Avatar Link :</span>{" "}
                          <a
                            href={user.profilePhoto}
                            target="_blank"
                            style={{ textDecoration: "none" }}
                          >
                            {user.profilePhoto}
                          </a>
                        </p>
                      </div>
                      <Button
                        variant="outline-danger "
                        className="mx-2 mt-1"
                        onClick={() => {
                          deleteHandler(user.id);
                        }}
                      >
                        Delete User
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default Home;
