import { Button, FormText} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut, updateCurrentUser, updatePassword } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import swal from 'sweetalert';


export default function Home() {
    const [authUser, setAuthuser] = useState(null);
    const navigate = useNavigate();
    const [pass, setPass] = useState('')
    const [email, setEmail] = useState('')
    const [passwordError, setpasswordError] = useState("");
    const [alerts, setAlerts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    let formIsValid = true;

    const show = () => {
        setShowForm(!showForm);
    }

    function refreshPage() {
        window.location.reload(false);
      }

    useEffect( () => {
        const listen = onAuthStateChanged(auth, (user) => {
            console.log(user)
            if(user){
                setAuthuser(user);
            }else{
                setAuthuser(null);
            }
        });
        return () => {
            listen();
        }
    }, []);

    const userSingout = () => {
        signOut(auth).then( () => {
            navigate('/')
            console.log('singout berhasil')
        } ).catch(error => console.log(error))
    }

    const handleValidation = (event) => {
    
        if (!pass.match(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,22}$/)) {
          formIsValid = false;
          setpasswordError(
            "Your password must be 8-20 characters long, contain letters and numbers, special characters and must not contain spaces"
          );
          return false;
        } else {
            setpasswordError("");
          formIsValid = true;
        }
    
        return formIsValid;
      };

    const changePass = (e) => {
        e.preventDefault();
        handleValidation();
        console.log(formIsValid);
        const user = auth.currentUser;
        if(formIsValid==true){
            updatePassword(user, pass)
            .then(() => {
                swal({title:"Update password success", icon: "success", buttons:false});
                refreshPage();
            })
            .catch((error) => {
                swal({title: "Please Logout First",
                icon: "warning",
                buttons: true,
                dangerMode: true}).then( () => {userSingout();});
                console.log(error);
            });
        }
      };

    return (
        <>
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#!">Dashboard</a>
                {authUser ? <Link onClick={userSingout} className="btn btn-light">Logout</Link> : <Link to="/" className="btn btn-light">Login</Link>}
            </div>
        </nav>
        <header className="py-5 bg-image-full" style={{backgroundImage: `url('https://source.unsplash.com/4ulffa6qoKA/1200x800')`}}>
            <div className="text-center my-5">
                
                <h1 className="text-white fs-3 fw-bolder"> {authUser ? <> Welcome {authUser.email} ! </> : "Welcome !"}  </h1>
                {showForm && (
                <form id="loginform" onSubmit={changePass}>
                    <div className="form-group forgot-password">
                        <label htmlFor="exampleFormControlInput2" className="form-label">New Password</label>
                        <input value={pass} onChange={e => setPass(e.target.value)} type="password" className="form-control" id="exampleFormControlInput2"/>
                        <small id="emailHelp" className="text-danger form-text">
                        {passwordError}
                        </small>
                    </div>
                    <button type="submit" className="btn" style={{backgroundColor:'#7171fd', color:'white'}}>
                        Submit New Password
                    </button>
                </form>
                )}
                {authUser ? <>{showForm ? '' : <><button type="submit" className="btn" onClick={show} style={{backgroundColor:'#7171fd', color:'white'}}>
                        Change Password
                </button></>}</> : ''}
                
                

            </div>
        </header>
        
        </div>
        </>
        // <div className='container'>
        //     <div>
        //         { authUser ? <>Welcome ${authUser.email} <br></br>
        //             <Button onClick={handleShow} > Change password</Button>
        //             <Modal centered show={show} onHide={handleClose}>
        //                 <Modal.Header closeButton>
        //                     <Modal.Title>Login</Modal.Title>
        //                 </Modal.Header>
        //                 <Modal.Body>
        //                     {alerts}
        //                     <div className="mb-3">
        //                         <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
        //                         <input disabled value={authUser.email} type="email" className="form-control" id="exampleFormControlInput1"/>
        //                     </div>
        //                     <div className="mb-3">
        //                         <label htmlFor="exampleFormControlInput2" className="form-label">New Password</label>
        //                         <input value={pass} onChange={e => setPass(e.target.value)} type="password" className="form-control" id="exampleFormControlInput2"/>
        //                     </div>
        //                     <small id="passworderror" className="text-danger form-text">
        //                         {passwordError}
        //                     </small>
        //                     {/* <ReCAPTCHA sitekey='6Lf0YxMkAAAAAIWaoUVGxLYcwpumBGy8cM8pdcoN'/> */}
        //                 </Modal.Body>
        //                 <Modal.Footer>

        //                     <Button variant="primary" onClick={changePass}>
        //                         Change Password
        //                     </Button>
        //                 </Modal.Footer>
        //             </Modal>  

        //          <Button onClick={userSingout}> Log Out </Button></> : <>Please Login First <br></br> <Button onClick={userSingout}> Log In </Button></>}
        //         <br></br>
        //     </div>
        // </div>
    );
  };