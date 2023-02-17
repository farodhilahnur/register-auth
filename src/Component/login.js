import React, { useEffect, useState } from 'react'
import {
    Form,
    Button, FormText
  } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import ReCAPTCHA from "react-google-recaptcha";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase"

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        navigate('/home')
        console.log(userCredential)

    })
    .catch((error) => {
        console.log(error)
        setpasswordError(
            "Email or Password Wrong"
          );
    });
  };
    const btnClick2 = () => {
        navigate('/register')
    }
    const btnForgot= () => {
        navigate('/forgot')
    }
    
    return (
        <>
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
            <div className="wrapper wrapper--w680">
            <div className="card card-4">
            <div className="card-body">
                <form onSubmit={loginSubmit}>
                <h3>Log in</h3>
                <div className="mb-3 forgot-password">
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
                <div className="mb-3 forgot-password">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}  
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
                </div>
                <div className='forgot-password' onClick={btnForgot}>
                    <u>Forgot your password ?</u>
                </div>
                <div className="d-grid forgot-password">
                <button type="submit" className="btn" style={{backgroundColor:'#7171fd', color:'white'}}>
                    Log in
                </button>
                </div>
                <div className='btn-singup' onClick={btnClick2}>
                Don't have an account?
                <a href="#" onClick={btnClick2}>
                            Sign Up
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