import React, { useEffect, useState } from 'react'
import {
    Form,
    Button, FormText
  } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import ReCAPTCHA from "react-google-recaptcha";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import swal from 'sweetalert';


export default function Forgot() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setemailError] = useState("");
    const navigate = useNavigate();
    let formIsValid = true;

  const handleValidation = (event) => {
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const forgotSubmit = (e) => {
    e.preventDefault();
    handleValidation();
    if(formIsValid==true){
      sendPasswordResetEmail(auth, email)
      .then(() => {
        swal("Email has sent", "Check your email", "success");
      })
      .catch((error) => {
          console.log(error)
          setemailError("Email Not Found");
      });
    }
    
  };
  const btnClick2 = () => {
    navigate('/')
    }
    
    return (
        <>
          <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
          <div className="wrapper wrapper--w680">
          <div className="card card-4">
          <div className="card-body">
            <form id="loginform" onSubmit={forgotSubmit}>
              <div className="form-group forgot-password">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              
              <button type="submit" className="btn" style={{backgroundColor:'#7171fd', color:'white'}}>
              Send Reset Password to Email
              </button>
            <div className='btn-singup' onClick={btnClick2}>
                Back to
                <a href="#" onClick={btnClick2}>
                            Login
                        </a>
                </div>
            </form>
          </div>
          </div>
          </div>
          </div>

        </>
    )
}