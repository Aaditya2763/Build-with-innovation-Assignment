import React, { useEffect } from "react";
import { Navbar, Container, Alert } from "react-bootstrap";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import classes from './navbar.module.css'
import image from "../../assets/authlogo.svg";
import adminImg from "../../assets/admin.avif";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, register } from "../../redux/slices/authSlice";
import { FaFacebook } from "react-icons/fa";
import { loginUserAction, logoutAction, registerUserAction } from "../../redux/actions/authActions";
import { Link, redirect } from "react-router-dom";
import { getUserProfileAction } from "../../redux/actions/getUsersAction";
const NavbarBox = ({loginuserHandler,user}) => {
  const [show, setShow] = useState(false);
 
  const [firstName, setFirstName] = useState("");
 
  
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinPage, setSigninPage] = useState(false);
  const [signupPage, setSignupPage] = useState(false);
  const [forget, setForget] = useState(false);
  const [addAdmin, setaddAdmin] = useState(false);
  const [message, setMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  
  const dispatch = useDispatch();

  const storeData=useSelector(store=>store.auth);
  const {loading,appErr,serverErr,registered,userAuth}=storeData;
 
 



  const showsignInHabandler = () => {
    setSigninPage(true);
    setSignupPage(false);
    setForget(false);
  };


 ;

  const hideSigninPage = () => {
    setSignupPage(true);
    setSigninPage(false);
  };

  const forgotPasswordPageHandler = () => {
    setForget(true);
    setSigninPage(false);
  };
  const handleClose = () =>{ setShow(!show); setSigninPage(false);setSignupPage(false);setForget(false)};
  const handleShow = () => {setShow(!show);setSignupPage(true);};


  const registerHandler = async (e) => {
    e.preventDefault();
const user={
  firstName:firstName,
  lastName:lastName,
  email:email,
  password:password
}
    try {
      dispatch(registerUserAction(user))
     
             setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setSignupPage(false);
            setSigninPage(true);
    
    } catch (error) {
      console.log("hello")
    }
    }
   
    
  
  const logoutHandler = () => {
   
  
    
    // window.location.reload();
    // dispatch(logout());
    
  };
  

  const loginHandler = async (e) => {
    e.preventDefault();
    const userData={
      email:email,
      password:password,

    }
    dispatch(loginUserAction(userData))
    
    
  };
 
  const forgetPasswordHandler = async (e) => {
    e.preventDefault();
  
    try {
     ;
      const response = await axios.put("https://atq-assignment-backend.onrender.com/update-password", {
        email,
        password,
      });
  
      if (response.status === 200) {
        setMessage("Password Updated Successfully");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setSigninPage(true);
        setForget(false);
        setErrorMessage("");
        
      } else {
        setErrorMessage(response.data.message || "Unknown error occurred");
        
      }
   
    } catch (e) {
      
      setErrorMessage(e.message || "An unexpected error occurred");
      
    } finally {
      ;
    }
  };
  
  useEffect(() => {
    // Your code here

  }, [registered,userAuth]);


  return (
    <Navbar >
      <Container className={classes.container}  >
        <Navbar.Brand >
          <Link to="/"><img
            src="https://buildwithinnovation.com/wp-content/uploads/2021/09/cropped-bwi-logo.png"
            width="172"
            height="55"
            className=""
            alt="logo"
          /></Link>
        </Navbar.Brand>

        <div className="d-flex flex-row align-items-center">
          <AiOutlineSearch
            style={{
              color: "#56595c",
              fontSize: "16px",
              position: "absolute",
              marginLeft: 10,
            }}
          />
          <input
            className="form-control rounded-pill "
            placeholder="Search for your favorite groups in ATG"
            style={{
              width: "340px",
              height: "42px",
              flexShrink: 0,
              background: "#F2F2F2",
              fontFamily: "IBM Plex Sans",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 500,
              paddingLeft: 30,
            }}
          />
        </div>

        <div >
          {userAuth && (
              
            <div className="d-flex align-items-center">
              <img src={userAuth.profileImage} style={{width:50,height:50,borderRadius:"50%",border:"  lightgray",marginLeft:10}}/>
            
            
              <Dropdown >
                
      <Dropdown.Toggle className="bg-light text-dark border border-light" id="dropdown-basic" >
      <span style={{marginTop:0,marginLeft:-10}}>  {userAuth.firstName}</span>
     
      </Dropdown.Toggle>

      <Dropdown.Menu >
        
      <Link to="/profile" style={{textDecoration:"none"}}>
        <Dropdown.Item href="/profile" onClick={()=>dispatch(getUserProfileAction(userAuth.id))}>Edit Profile</Dropdown.Item>
        </Link>
        <Dropdown.Item href="#/action-2" onClick={()=>{setaddAdmin(true);setShow(true)}}>Add Admin</Dropdown.Item>
        <Dropdown.Item href="/" onClick={()=>{setSigninPage(false);setSignupPage(false); dispatch(logoutAction()); }}>Logout</Dropdown.Item>
        {/* dispatch(logoutHandlerAction()) */}
      </Dropdown.Menu>
    </Dropdown>
              
              </div>
              
          )}
          {!userAuth && (
            <p
              className="text-dark mt-3"
              style={{
                color: "#2E2E2E",
                fontFamily: "IBM Plex Sans",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onClick={()=>handleShow()}

            >
              Create account.
              <span
                className="text-primary"
                style={{
                  color: "#2E2E2E",
                  fontFamily: "IBM Plex Sans",
                  fontStyle: "normal",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {" "}
                It’s free!
              </span>
              <IoMdArrowDropdown />
            </p>
          )}
        </div>
      </Container>
      {!userAuth && handleShow && signupPage && (
        <Modal
          show={show}
          onHide={() => setShow(!show)}
          dialogClassName="modal-lg"
          aria-labelledby="example-custom-modal-styling-title"
          style={{ marginTop: 50, marginLeft: 1 }}
        >
          <Modal.Header
            style={{ backgroundColor: "#EFFFF4", textAlign: "center" }}
          >
            <Modal.Title
              id="example-custom-modal-styling-title"
              className="text-center fs-6 px-3 text-success"
            >
              Let's learn, share & inspire each other with our passion for
              computer engineering. Sign up now 🤘🏼
            </Modal.Title>
            
          </Modal.Header>
              { ( appErr || serverErr)   ? <Alert dismissible className="alert alert-danger d-flex flex-row justify-content-between " style={{width:"100%",height:"auto",color:"black"}} >
        {appErr || serverErr}
         
          
          </Alert>:null}
          <Modal.Body>
            <Container className={classes.signInPage}>
              <div style={{ width: "100%" }}>
                <h5
                  style={{
                    fontFamily: "IBM Plex Sans",
                    fontStyle: "normal",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  {" "}
                  Create Account
                </h5>
                <Container className="container">
                  <Form onSubmit={registerHandler}>
                    <input
                      style={{
                        width: "50%",
                        height: 46,
                        marginLeft: -10,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                        paddingLeft: 10,
                      }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder="First Name"
                    />
                    <input
                      style={{
                        width: "50%",
                        height: 46,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                        paddingLeft: 10,
                      }}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      placeholder="Last Name"
                    />
                    <br />
                    <input
                      style={{
                        width: "100%",
                        height: 46,
                        marginLeft: -10,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                        paddingLeft: 10,
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      type="email"
                      placeholder="Email"
                    />
                    <input
                      style={{
                        width: "100%",
                        height: 46,
                        marginLeft: -10,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                        paddingLeft: 10,
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                    />

                    <button
                      className="container btn btn-primary rounded-pill"
                      style={{ marginLeft: -10, marginTop: 10, height: 40 }}
                      type="submit"
                    >
                      {loading ? "loading...": "Create Account"}
                     
                    </button>
                    <button
                      className="container btn "
                      style={{
                        marginLeft: -10,
                        marginTop: 10,
                        border: "1px solid lightgray",
                      }}
                      disabled={true}
                      type="button"
                      onClick={() => dispatch(login())}
                    >
                      <FaFacebook
                        style={{ color: "#0000ff", width: 20, height: 20 }}
                      />
                      <span
                        style={{
                          marginTop: 10,
                          marginLeft: 10,
                          fontFamily: "IBM Plex Sans",
                          fontStyle: "normal",
                          fontSize: "15px",
                          fontWeight: 500,
                        }}
                      >
                        Sign in with Facebook
                      </span>
                    </button>
                    <button
                      className="container btn"
                      style={{
                        marginLeft: -10,
                        marginTop: 10,
                        border: "1px solid lightgray",
                        marginBottom: 20,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                      disabled={true}
                    >
                      <FcGoogle
                        style={{
                          color: "#0000ff",
                          width: 20,
                          height: 20,
                          marginRight: 10,
                        }}
                        type="button"
                        onClick={() => dispatch(login())}
                      />
                      Sign in with Google
                    </button>
                  </Form>
                </Container>
              </div>
              <div>
                <Container className="d-flex flex-column align-items-between">
                  <p
                    style={{
                      textAlign: "right",
                      fontFamily: "IBM Plex Sans",
                      fontStyle: "normal",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    Already have an account?
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={showsignInHabandler}
                    >
                      {" "}
                      Sign In
                    </span>
                  </p>
                  <img alt="img" src={image} style={{ height: 320 }} />
                  <p
                    style={{
                      fontFamily: "IBM Plex Sans",
                      fontStyle: "normal",
                      fontSize: "11px",
                      fontWeight: 400,
                      marginTop: -10,
                    }}
                  >
                    By signing up, you agree to our Terms & conditions, Privacy
                    policy
                  </p>
                </Container>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      )}

      {!userAuth && signinPage && (
        <Modal
          show={show}
          onHide={() => setShow(!show)}
          dialogClassName="modal-lg"
          aria-labelledby="example-custom-modal-styling-title"
          style={{ marginTop: 50 }}
        >
          <Modal.Header
            style={{ backgroundColor: "#EFFFF4", textAlign: "center" }}
          >
            <Modal.Title
              id="example-custom-modal-styling-title"
              className="text-center fs-6 px-3 text-success"
            >
              Let's learn, share & inspire each other with our passion for
              computer engineering. Sign in now 🤘🏼
            </Modal.Title>
          </Modal.Header>
      

         { ( appErr || serverErr)   ? <Alert  duration={5000} className="alert alert-danger d-flex flex-row justify-content-between " style={{width:"100%",height:"auto",color:"black"}} >
        {appErr || serverErr}
         
          
          </Alert>:null}
          <Modal.Body>
            <Container className={classes.signInPage}>
              <div style={{ width: "100%" }}>
                <h5
                  style={{
                    fontFamily: "IBM Plex Sans",
                    fontStyle: "normal",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  Sign In
                </h5>
                <Container className="container">
                  <Form style={{ marginTop: 20 }} onSubmit={loginHandler}>
                    <input
                      style={{
                        width: "100%",
                        height: 46,
                        marginLeft: -10,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                        paddingLeft: 10,
                      }}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <input
                      style={{
                        width: "100%",
                        height: 46,
                        marginLeft: -10,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                        paddingLeft: 10,
                      }}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <button
                      className="container btn btn-primary rounded-pill"
                      style={{ marginLeft: -10, marginTop: 10, height: 50 }}
                      type="submit"
                    >
                      {loading ? "Loading...": "Sign in"}
                    </button>
                    <button
                      className="container btn "
                      style={{
                        marginLeft: -10,
                        marginTop: 10,
                        border: "1px solid lightgray",
                      }}
                      type="button"
                     disabled={true}
                    >
                      <FaFacebook
                        style={{ color: "#0000ff", width: 20, height: 20 }}
                      />
                      <span
                        style={{
                          marginTop: 10,
                          marginLeft: 10,
                          fontFamily: "IBM Plex Sans",
                          fontStyle: "normal",
                          fontSize: "15px",
                          fontWeight: 500,
                        }}
                      
                      >
                        Sign in with Facebook
                      </span>
                    </button>
                    <button
                      className="container btn"
                      style={{
                        marginLeft: -10,
                        marginTop: 10,
                        border: "1px solid lightgray",
                        marginBottom: 20,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                      disabled={true}
                    >
                      <FcGoogle
                        style={{
                          color: "#0000ff",
                          width: 20,
                          height: 20,
                          marginRight: 10,
                        }}
                        type="button"
                     disabled={true}
                      />
                      Sign in with Google
                    </button>
                    <button
                      className="container btn"
                      style={{
                        marginLeft: -10,
                        marginBottom: 20,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                      type="button"
                      onClick={forgotPasswordPageHandler}
                    >
                      Forget Password
                    </button>
                  </Form>
                </Container>
              </div>
              <div>
                <Container className="d-flex flex-column align-items-between">
                  <p
                    style={{
                      textAlign: "right",
                      fontFamily: "IBM Plex Sans",
                      fontStyle: "normal",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    Don't have an account yet?
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={hideSigninPage}
                    >
                      {" "}
                      Create Account
                    </span>
                  </p>
                  <img alt="img" src={image} style={{ height: 320 }} />
                  <p
                    style={{
                      fontFamily: "IBM Plex Sans",
                      fontStyle: "normal",
                      fontSize: "11px",
                      fontWeight: 400,
                      marginTop: -10,
                    }}
                  >
                    By signing up, you agree to our Terms & conditions, Privacy
                    policy
                  </p>
                </Container>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      )}

      {!userAuth && forget && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-lg"
          aria-labelledby="example-custom-modal-styling-title"
          style={{ marginTop:50 }}
        >
          <Modal.Header
            style={{ backgroundColor: "#EFFFF4", textAlign: "center" }}
          >
            <Modal.Title
              id="example-custom-modal-styling-title"
              className="text-center fs-6 px-3 text-success"
            >
              Let's learn, share & inspire each other with our passion for
              computer engineering. Sign up now 🤘🏼
            </Modal.Title>
          </Modal.Header>
          {errorMessage && ( <Alert duration={5000} className="alert alert-danger d-flex flex-row justify-content-between" style={{width:"100%",height:"auto"}} >
            {errorMessage}
         
          
          </Alert>)}
          <Modal.Body>
            <Container className={classes.signInPage}>
              <div style={{ width: "100%" }}>
                <h5
                  style={{
                    fontFamily: "IBM Plex Sans",
                    fontStyle: "normal",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  Forgot Password
                </h5>
                <Container className="container">
                  <Form style={{ marginTop: 70 }} onSubmit={forgetPasswordHandler}>
                    <input
                      style={{
                        width: "100%",
                        height: 46,
                        marginLeft: -10,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                        paddingLeft: 10,
                      }}
                      required
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <input
                      style={{
                        width: "100%",
                        height: 46,
                        marginLeft: -10,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                        paddingLeft: 10,
                      }}
                      required
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <button
                      className="container btn btn-primary rounded-pill"
                      style={{ marginLeft: -10, marginTop: 20, height: 50 }}
                      type="submit"
                    
                    >
                      {loading ? "loading...": "Change password"}
                    </button>
                  </Form>
                </Container>
              </div>
              <div>
                <Container className="d-flex flex-column align-items-between">
                  <p
                    style={{
                      textAlign: "right",
                      fontFamily: "IBM Plex Sans",
                      fontStyle: "normal",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    Don't have an account yet?
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={showsignInHabandler}
                    >
                      {" "}
                      Sign In
                    </span>
                  </p>
                  <img alt="img" src={image} style={{ height: 320 }} />
                  <p
                    style={{
                      fontFamily: "IBM Plex Sans",
                      fontStyle: "normal",
                      fontSize: "11px",
                      fontWeight: 400,
                      marginTop: -10,
                    }}
                  >
                    By signing up, you agree to our Terms & conditions, Privacy
                    policy
                  </p>
                </Container>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      )}

    {/* Add Admin  */}
    { addAdmin && (
        <Modal
        
          show={show}
          onHide={() => setShow(!show)}
          dialogClassName="modal-lg"
          aria-labelledby="example-custom-modal-styling-title"
          style={{ marginTop: 50 }}
        >
          <Modal.Header
            style={{ backgroundColor: "#EFFFF4", textAlign: "center" }}
          >
            <Modal.Title
              id="example-custom-modal-styling-title"
              className="text-center fs-6 px-2 text-success"
            >
            Let's learn, share & inspire each other with our passion for
              computer  engineering, add admin now🤘🏼
            </Modal.Title>
          
          </Modal.Header>
     

         { ( appErr || serverErr)   ? <Alert  duration={5000} className="alert alert-danger d-flex flex-row justify-content-between " style={{width:"100%",height:"auto",color:"black"}} >
        {appErr || serverErr}
         
          
          </Alert>:null}
          <Modal.Body>
            <Container className={classes.signInPage}>
              <div style={{ width: "100%" }}>
                <h5
                  style={{
                    fontFamily: "IBM Plex Sans",
                    fontStyle: "normal",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
              Add Admin
                </h5>
                <Container className="container">
                  <Form style={{ marginTop: 20 }} onSubmit={loginHandler}>
                    <input
                      style={{
                        width: "100%",
                        height: 46,
                        marginLeft: -10,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                        paddingLeft: 10,
                      }}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <input
                      style={{
                        width: "100%",
                        height: 46,
                        marginLeft: -10,
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontSize: "15px",
                        fontWeight: 500,
                        paddingLeft: 10,
                      }}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <button
                      className="container btn btn-primary rounded-pill"
                      style={{ marginLeft: -10, marginTop: 10, height: 50 }}
                      type="submit"
                    >
                      {loading ? "Loading...": "Add Admin"}
                    </button>
                   
                   
                  </Form>
                </Container>
              </div>
              <div>
                <Container className="d-flex flex-column align-items-between ">
                      
                  <img alt="img" src={adminImg} style={{ height: 300,marginTop:-30 }} />
                  <p
                    style={{
                      fontFamily: "IBM Plex Sans",
                      fontStyle: "normal",
                      fontSize: "11px",
                      fontWeight: 400,
                      marginTop: -10,
                    }}
                  >
                    By signing up, you agree to our Terms & conditions, Privacy
                    policy
                  </p>
                </Container>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      )}
    </Navbar>
  );
};

export default NavbarBox;
