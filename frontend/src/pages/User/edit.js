import React, { useEffect, useState } from "react";
import { FcOldTimeCamera } from "react-icons/fc";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {Alert} from 'react-bootstrap';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { getUserProfileAction } from "../../redux/actions/getUsersAction";
import { useDispatch, useSelector } from "react-redux";

const EditUser = () => {
  const storeData = useSelector(store => store.Users);
  const { loading,appErr, userAuth, userProfile } = storeData;

  const [validated, setValidated] = useState(false);
  const [editable, setEditable] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userAuth.id) {
           dispatch(getUserProfileAction(userAuth.id));
        }

        // Update state variables based on the received data
        setFirstName(userProfile.firstName);
        setLastName(userProfile.lastName);
        setEmail(userProfile.email);
        setUserName(userProfile.username);
        setUserId(userProfile._id);
      } catch (error) {
        // Handle error if necessary
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, userProfile.id,]);

  return (
    <div className="container border d-flex flex-column" style={{ height: 650 }}>
      {(loading) ? (
        <div className="d-flex flex-direction-row" style={{ margin: "300px auto", width: "200px" }}>
          <Spinner animation="border" role="status">
            <span className="text-dark"></span>
          </Spinner>
          <span style={{
            color: "black",
            fontFamily: "IBM Plex Sans",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 700,
            paddingLeft: 10
          }}>Loading....</span>
        </div>
      ) : (
        <div className="d-flex flex-column">
          <div className="d-flex flex-row justify-content-between" style={{height:"auto"}}>
            
         { ( appErr )   ? <Alert  duration={5000} className="alert alert-danger d-flex flex-row justify-content-between  mt-2" style={{width:"100%",height:"auto",color:"black"}} >
        {appErr }
         
          
          </Alert>:null}
            <button
              className="btn btn-outline-warning  mt-2 text-dark"
              style={{
                width: 120,
                height:60,
                fontFamily: "IBM Plex Sans",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 600,
              }}
              onClick={() => setEditable(true)}
            >
              Edit Profile
            </button>
          </div>

          <div style={{ margin: "0px auto" }}>
            <form className="align-items-center">
              <img src={userProfile.profilePhoto} className=" border rounded-circle mt-4 " style={{ width: 200, height: 200 }} />
              {editable && (
                <label htmlFor="fileInput">
                  <span className=" position-relative" style={{ bottom: -50, left: -40, cursor: "pointer" }}>
                    <FcOldTimeCamera style={{ fontSize: "2rem", width: 50, height: 50 }} />
                  </span>
                  <input type="file" id="fileInput" style={{ display: 'none' }} />
                </label>
              )}
            </form>
          </div>

          <Form noValidate validated={validated} onSubmit={handleSubmit} className="container mt-5">
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  readOnly={!editable ? true : false}
                  required
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  readOnly={!editable ? true : false}
                  required
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Phone Number</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
                  <Form.Control
                    readOnly={!editable ? true : false}
                    type="text"
                    placeholder="Phone number"
                    aria-describedby="inputGroupPrepend"
                    value={phoneNo || "Phone not available"}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  readOnly={!editable ? true : false}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  readOnly={!editable ? true : false}
                  value={userName || "Username not available"}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder="Username"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  value={userId}
                  placeholder="User ID"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid user ID.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {editable && (
              <div className="mt-5 d-flex flex-row justify-content-between ">
                <div>
                  <Button variant="outline-danger" className="mx-2" onClick={() => setEditable(false)}>
                  Back
                  </Button>
                  <Button type="submit" variant="outline-primary">
                    Submit
                  </Button>
                </div>
                <div>
                  <Button className="btn btn-danger">Delete Account</Button>
                </div>
              </div>
            )}
          </Form>
        </div>
      )}
    </div>
  );
};

export default EditUser;
