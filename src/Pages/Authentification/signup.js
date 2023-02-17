import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


//Redux
import { useDispatch } from "react-redux";


//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//CSS
import './auth.css'

//FireBase
import {doc , setDoc , updateDoc } from "firebase/firestore"
import { db } from "../../FireBase/config";
import { ref , uploadBytes , getDownloadURL } from "firebase/storage"
import { storage } from "../../FireBase/config";

export default function SignUp() {


    let darkMode = localStorage.getItem('darkMode');

    const darkModeToggle = document.querySelector('#dark-mode-toggle');

    const enableDarkMode = () => {
        // 1. Add the className to the body
        document.body.classList.add('darkmode');
        // 2. Update darkMode in localStorage
        localStorage.setItem('darkMode', 'enabled');
    }

    const disableDarkMode = () => {
        // 1. Remove the className from the body
        document.body.classList.remove('darkmode');
        // 2. Update darkMode in localStorage 
        localStorage.setItem('darkMode', null);
    }

    // If the user already visited and enabled darkMode
    // start things off with it on
    if (darkMode === 'enabled') {
        enableDarkMode();
    }
    //Navigating 
    const Navigate = useNavigate();

    //Information saisie
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    // array des utilisateurs importés du JSON
    const [users, setUsers] = useState([]);

    // Controlling Values
    const [emailExist, setEmailExist] = useState(false);
    const [emailVaild, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false);

    // Errors
    const [emailError, setEmailError] = useState(false);
    const [emailInvlaid, setEmailInvalid] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    //Siging 
    const [isSigning, setIsSigning] = useState(false);

    //Getting Data
    // useEffect(() => {
    //     const getData = async () => {
    //         const users =
    //             await axios.get('http://localhost:8000/users')
    //         setUsers(users.data)
    //     }
    //     getData()
    // }, [])

    // Test 1
    useEffect(() => {
        const Data = doc(db,"UsersData","UsersData 1") ;
    }, [])



    //Email Verification

    const emailVerification = () => {
        var BreakException = {};

        try {
            users.forEach(user => {
                if (user.email === email) {

                    setEmailError(true);

                    setEmailExist(true);
                    throw BreakException;
                }
                else {
                    setEmailError(false);
                }
            });
        } catch (e) {
            if (e !== BreakException) throw e;
        }


    }

    const emailValidation = () => {
        const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

        if (emailRegex.test(email)) {
            setEmailValid(true);
            setEmailInvalid(false)
        }
        else {
            setEmailInvalid(true)
        }
    }

    //Password Verification
    const passwordVerification = () => {
        let pattern = new RegExp("^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$");

        if (pattern.test(password)) {
            setPasswordValid(true);
            setPasswordError(false)
        }
        else {
            setPasswordError(true)
        }
    }

    //Password Confirmation
    const passwordConfirmation = () => {
        if (password === confPassword) {
            setPasswordConfirm(true);
            setConfirmPasswordError(false);
        }
        else {
            setConfirmPasswordError(true)
        }
    }

    const dispatch = useDispatch()

    // On Submit 
    const handleSubmit = (e) => {
        e.preventDefault();


        emailVerification();
        if (emailError) {
            toast.error('Email deja existe', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        emailValidation();
        if (emailInvlaid) {
            toast.error('Email invalid', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }


        passwordVerification();
        if (passwordError) {
            toast.error('Password invalid', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        passwordConfirmation();
        if (confirmPasswordError) {
            toast.error('Password non identiques', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        if (emailExist === false && emailVaild === true && passwordValid === true && passwordConfirm === true) {
            const User = { nom, prenom, email, password };

            // fetch('http://localhost:8000/users', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(User)
            // })
            // dispatch({type:'signUp'})
            // Navigate('/login');

            setDoc(doc(db , "UsersData" , "UsersData1"),User)
        }
    }

    let imgsrc = require("./BamsLOGOFINALgray.png");
    return (
        <div className="AuthPage">
            <div className="body1">
                <div className="div1">
                    <img src={imgsrc} alt="" />
                    <h2>Add a best chat Bams To your website connect {'\n'}. other channels and automate sales & support {'\n'}. with Bams</h2>
                    <button type="submit" className="B1">Read More</button>

                </div>



                <form onSubmit={handleSubmit} className="form1">
                    <h1 >SIGN UP</h1>
                    <input type="text" placeholder="First Name" required className="input1" value={nom} onChange={(e) => { setNom(e.target.value) }} />
                    <input type="text" placeholder="Last Name" required className="input1" value={prenom} onChange={(e) => { setPrenom(e.target.value) }} />
                    <input type="email" placeholder="Email" required className="input1" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" placeholder="Password" required className="input1" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="password" placeholder="Confirm Password" required className="input1" value={confPassword} onChange={(e) => { setConfPassword(e.target.value) }} />
                    <button type="submit" className="submit">Sign Up</button>
                    <Link to="/login">Already have an account ?</Link>
                </form>

                <button id="dark-mode-toggle" className="dark-mode-toggle" onClick={() => {
                    darkMode = localStorage.getItem('darkMode');

                    // if it not current enabled, enable it
                    if (darkMode !== 'enabled') {
                        enableDarkMode();
                        // if it has been enabled, turn it off  
                    } else {
                        disableDarkMode();
                    }
                }}>
                    <svg width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496" style={{marginBottom : '10px'}}><path fill="currentColor" d="M8,256C8,393,119,504,256,504S504,393,504,256,393,8,256,8,8,119,8,256ZM256,440V72a184,184,0,0,1,0,368Z" transform="translate(-8 -8)" /></svg>
                </button>
                <div className="click-here">
                    <svg fill="var(--foreground)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 542.09 136.36"><path d="M291.71,304.72a16.26,16.26,0,0,1-5.36-6.76,24.16,24.16,0,0,1-1.8-8.61,36.56,36.56,0,0,1,1-9.56,61.81,61.81,0,0,1,3.05-9.51,65.94,65.94,0,0,1,4.26-8.56,45.92,45.92,0,0,1,4.76-6.71,17.49,17.49,0,0,1,4.51-3.9q2.1-1.15,3.4-.15.2,1.1.75,4.05t1.1,6.31q.55,3.36,1,6.31t.65,4.05a12.52,12.52,0,0,1,.1,2.75,7.84,7.84,0,0,1-.6,2.6,3.29,3.29,0,0,1-1.65,1.7,4.18,4.18,0,0,1-3.05-.05q-.1-.7-.55-2.4t-1-3.65q-.55-2-1.1-3.7t-.75-2.45l-1.7-1.7a16.09,16.09,0,0,0-5.16,6,31.66,31.66,0,0,0-3.4,17.57,21.17,21.17,0,0,0,2.3,8,12.23,12.23,0,0,0,5.21,5.21q3.35,1.75,8.41.55t11.86-5.86a96.74,96.74,0,0,0,15.52-14.07v3.5a6.06,6.06,0,0,1-1.2,1.8q-1.2,1.5-2.9,3.45t-3.45,3.85q-1.75,1.9-3,3a61.21,61.21,0,0,1-7.06,5.71,29.69,29.69,0,0,1-7.76,3.9,19.38,19.38,0,0,1-8.16.85A16.71,16.71,0,0,1,291.71,304.72Z" transform="translate(-284.53 -174.12)" /><path d="M342.87,306.52a8.19,8.19,0,0,1-3.25-4.35,31.19,31.19,0,0,1-1.5-6.21,44.33,44.33,0,0,1-.45-6.06V285.7q0-1.1.1-4.46t.3-7.81q.2-4.45.4-9.51t.4-9.51q.2-4.45.35-7.76t.15-4.41q0-1.5,0-5.21t.05-7.86q0-4.15-.05-7.86t0-5.21a11,11,0,0,1,2.6-1.5,2.67,2.67,0,0,1,1.8-.15q.8.25.8,1.65v81.7a4,4,0,0,0,.45,1.65,5.82,5.82,0,0,0,1.15,1.65,2.92,2.92,0,0,0,1.65.85,2.37,2.37,0,0,0,2-.75l12.11-10.31a10.67,10.67,0,0,1-.1,4.81,16.13,16.13,0,0,1-2,4.71,18.13,18.13,0,0,1-3.35,4,15,15,0,0,1-4.3,2.75,11.54,11.54,0,0,1-4.71.9A8.37,8.37,0,0,1,342.87,306.52Z" transform="translate(-284.53 -174.12)" /><path d="M360,228.23q0-2.9,2.3-3.75a6,6,0,0,1,4.71.25V230a4.74,4.74,0,0,1-1.05.15c-.5,0-1,.05-1.6.05s-1.1,0-1.6-.05a4.73,4.73,0,0,1-1.05-.15,2.58,2.58,0,0,1-1.05-.8C360.2,228.77,360,228.43,360,228.23Zm3.5,74.79a9.15,9.15,0,0,1-.5-1.55q-.3-1.15-.6-2.55t-.5-2.7a13.83,13.83,0,0,1-.2-1.9V245.65a1.42,1.42,0,0,1,.9-1.4,5.66,5.66,0,0,1,2.05-.45,14.47,14.47,0,0,1,2.1.05l1.05.1v53.86a3.79,3.79,0,0,0,1.1,2.8,8.3,8.3,0,0,0,2.6,1.75,10.1,10.1,0,0,0,3.1.8,7.68,7.68,0,0,0,2.7-.15q1.4,2.1-.05,3.35a6.7,6.7,0,0,1-4.1,1.4,12.71,12.71,0,0,1-5.51-1A7.65,7.65,0,0,1,363.49,303Z" transform="translate(-284.53 -174.12)" /><path d="M388.72,304.72a16.26,16.26,0,0,1-5.36-6.76,24.16,24.16,0,0,1-1.8-8.61,36.56,36.56,0,0,1,1-9.56,61.81,61.81,0,0,1,3.05-9.51,65.94,65.94,0,0,1,4.26-8.56,45.92,45.92,0,0,1,4.76-6.71,17.49,17.49,0,0,1,4.51-3.9q2.1-1.15,3.4-.15.2,1.1.75,4.05t1.1,6.31q.55,3.36,1,6.31t.65,4.05a12.52,12.52,0,0,1,.1,2.75,7.84,7.84,0,0,1-.6,2.6,3.29,3.29,0,0,1-1.65,1.7,4.18,4.18,0,0,1-3.05-.05q-.1-.7-.55-2.4t-1-3.65q-.55-2-1.1-3.7t-.75-2.45l-1.7-1.7a16.09,16.09,0,0,0-5.16,6,31.66,31.66,0,0,0-3.4,17.57,21.17,21.17,0,0,0,2.3,8,12.23,12.23,0,0,0,5.21,5.21q3.35,1.75,8.41.55T415,296.26a96.74,96.74,0,0,0,15.52-14.07v3.5a6.06,6.06,0,0,1-1.2,1.8q-1.2,1.5-2.9,3.45t-3.45,3.85q-1.75,1.9-3,3a61.21,61.21,0,0,1-7.06,5.71,29.69,29.69,0,0,1-7.76,3.9,19.38,19.38,0,0,1-8.16.85A16.71,16.71,0,0,1,388.72,304.72Z" transform="translate(-284.53 -174.12)" /><path d="M441.08,301.22a34.43,34.43,0,0,1,.75-4.66q.65-3.05,1.2-6.51a60.65,60.65,0,0,0,.7-6.86,15.84,15.84,0,0,0-.65-5.76,4.84,4.84,0,0,0-2.85-3.15q-2.05-.8-6,.9-2.2-.6-2.5-1.7a3.12,3.12,0,0,1,.6-2.5,19,19,0,0,1,2.55-3.05q1.65-1.65,3.35-3.4t3.05-3.45a6.76,6.76,0,0,0,1.55-3.3q-.1-.8-.35-3.5t-.65-6.26q-.4-3.55-.75-7.56t-.75-7.61q-.4-3.6-.65-6.26t-.35-3.55a11.86,11.86,0,0,1,.05-2.45,4.07,4.07,0,0,1,.75-2,2.8,2.8,0,0,1,1.65-1.05,5.07,5.07,0,0,1,2.75.35q.5,3.81,1,8.61t1.1,9.91q.6,5.11,1.35,10.21t1.75,9.51a14.42,14.42,0,0,0,2.4-2.75q1.4-2,3-4.31t3.35-4.71a26.51,26.51,0,0,1,3.35-3.8,6.35,6.35,0,0,1,3-1.7q1.4-.25,2.3,1.55a2.3,2.3,0,0,1,.1.85,3.29,3.29,0,0,1-.1,1,22.09,22.09,0,0,1-4.15,7.41q-2.85,3.41-5.81,6.61a50.94,50.94,0,0,0-5.16,6.56,13.46,13.46,0,0,0-2.3,7.16q.9.8,2.6,2.6l8.71,8.71q2.5,2.4,4.71,4.66t3.9,4.05l2.6,2.5q.6.6,1.9,2a18.16,18.16,0,0,1,2.3,3,6.75,6.75,0,0,1,1.1,3.1q.1,1.5-1.8,2.5a3.67,3.67,0,0,1-1.7,0q-5.11-6.41-11.26-13a82.87,82.87,0,0,0-13.07-11.36q-.1.9-.3,2.8t-.55,4.31q-.35,2.4-.7,5.06t-.75,5.06q-.4,2.4-.7,4.3t-.5,2.8a9,9,0,0,1-.55,1.55,11.52,11.52,0,0,1-1.15,2.05,5.41,5.41,0,0,1-1.6,1.55,1.85,1.85,0,0,1-1.9.05q0-.4-.05-1.35t0-2.1q0-1.15,0-2.15T441.08,301.22Z" transform="translate(-284.53 -174.12)" /><path d="M541.9,304.72a155.32,155.32,0,0,0,.45-20.32q-.45-9.71-1.65-19.32t-2.8-19.52q-1.6-9.91-2.9-20.82c0-.2,0-.53-.05-1s-.05-1-.05-1.55,0-1.08.05-1.55.05-.8.05-1h3.5q.3,1.8,1,5.61t1.5,8.61q.85,4.81,1.8,10.11t1.8,10.11q.85,4.81,1.55,8.61t1.1,5.61a4,4,0,0,0,.25,1.05q.25.75.5,1.55t.5,1.55a4.71,4.71,0,0,0,.45,1.05q.3-.8,1.25-2.75l2.05-4.21q1.1-2.25,2.1-4.21t1.5-2.75a22.15,22.15,0,0,1,4.11-5.31,11.23,11.23,0,0,1,4.91-3,4.33,4.33,0,0,1,4.25,1.15q1.85,1.75,2.35,7.16.1,1.3.25,4t.35,6.16q.2,3.45.4,7.26t.35,7.21q.15,3.41.3,6.11t.15,4a9.71,9.71,0,0,1,1.65,3.25,6.49,6.49,0,0,1,.05,3.65,4,4,0,0,1-3.4-.1,7.3,7.3,0,0,1-2.4-2.25,15.7,15.7,0,0,1-1.7-3.25l-1.2-3.1q.2-3.8.3-8.21t-.05-9q-.15-4.55-.6-9.06a71.26,71.26,0,0,0-1.35-8.51,2.66,2.66,0,0,0-3.35.7,15.57,15.57,0,0,0-2.9,4.86,64.26,64.26,0,0,0-2.55,7.66q-1.2,4.41-2.3,9.26t-2.15,9.66q-1.05,4.81-2,8.71a62.66,62.66,0,0,1-1.9,6.51q-1,2.6-2,3.1Z" transform="translate(-284.53 -174.12)" /><path d="M599.27,306.52a25.37,25.37,0,0,1-6.66-7.76,40.35,40.35,0,0,1-3.75-9.56,9.6,9.6,0,0,1-1.8,1.1,17.12,17.12,0,0,1-2.45,1,13.58,13.58,0,0,1-2.45.55,2.47,2.47,0,0,1-1.75-.25q-.55-.4-.3-1.35A9,9,0,0,1,582,287.4a11.58,11.58,0,0,1,1.25-1.3l2.25-2.15q1.2-1.15,2.2-2.2a15.17,15.17,0,0,0,1.2-1.35,17.1,17.1,0,0,0,1.35-5.51q.25-3,.3-6.26t.35-6.46a19.84,19.84,0,0,1,1.5-6,18,18,0,0,1,2.65-4,43.46,43.46,0,0,1,4.41-4.56,49.25,49.25,0,0,1,5-4,13.19,13.19,0,0,1,4.41-2.15,2.34,2.34,0,0,1,2.7.9q.85,1.3-.05,5a36.48,36.48,0,0,1-3.35,8.56q-2.25,4.16-4.66,8.21t-4.56,8.06a31.21,31.21,0,0,0-3.05,8.11,24.48,24.48,0,0,0-.5,5.36,28.29,28.29,0,0,0,.7,6.26,18,18,0,0,0,2.3,5.66,8.4,8.4,0,0,0,4.41,3.55,11.76,11.76,0,0,0,6.41.6,20.6,20.6,0,0,0,6.26-2.3,31.45,31.45,0,0,0,5.86-4.25A70.45,70.45,0,0,0,626.5,290q2.4-2.7,4.3-5.26t3.2-4.35l1.7,1.8q.7.6-.85,3.4a42.55,42.55,0,0,1-4.5,6.36,77.17,77.17,0,0,1-7,7.26,48.07,48.07,0,0,1-8.26,6.21,23.14,23.14,0,0,1-8.41,3.1A9.41,9.41,0,0,1,599.27,306.52ZM595.87,263a12.86,12.86,0,0,0-.15,1.75q-.05,1.25,0,2.65t0,2.6a12.42,12.42,0,0,0,.15,1.7,128.28,128.28,0,0,0,6-11.71,75.67,75.67,0,0,0,4.41-12.52,12.23,12.23,0,0,0-4.16,2.45,16.47,16.47,0,0,0-3.15,3.8,20.72,20.72,0,0,0-2.05,4.56A27.92,27.92,0,0,0,595.87,263Z" transform="translate(-284.53 -174.12)" /><path d="M640.82,307.13q-1.6,3.3-2.7,3.35t-1.85-2.2a32.15,32.15,0,0,1-1.2-6.36q-.45-4.1-.6-9.11t-.05-10.51q.1-5.51.35-10.61t.65-9.36q.4-4.25.85-6.71t1-2.65q.5-.2,1,2.7a70.83,70.83,0,0,1,6.91-4.56,48.45,48.45,0,0,1,7.66-3.6,32.48,32.48,0,0,1,8-1.85,20.73,20.73,0,0,1,7.86.7,6.41,6.41,0,0,1,.1,3,2.61,2.61,0,0,1-1.9,2.2,23.69,23.69,0,0,0-4.21-.3,40.48,40.48,0,0,0-5.51.4,36.32,36.32,0,0,0-5.81,1.3,22.86,22.86,0,0,0-5.26,2.35,12.84,12.84,0,0,0-3.8,3.5,8.19,8.19,0,0,0-1.45,4.86Z" transform="translate(-284.53 -174.12)" /><path d="M694,306.52a25.37,25.37,0,0,1-6.66-7.76,40.35,40.35,0,0,1-3.75-9.56,9.6,9.6,0,0,1-1.8,1.1,17.12,17.12,0,0,1-2.45,1,13.58,13.58,0,0,1-2.45.55,2.47,2.47,0,0,1-1.75-.25q-.55-.4-.3-1.35a9,9,0,0,1,1.85-2.85,11.58,11.58,0,0,1,1.25-1.3l2.25-2.15q1.2-1.15,2.2-2.2a15.17,15.17,0,0,0,1.2-1.35,17.1,17.1,0,0,0,1.35-5.51q.25-3,.3-6.26t.35-6.46a19.84,19.84,0,0,1,1.5-6,18,18,0,0,1,2.65-4,43.46,43.46,0,0,1,4.41-4.56,49.25,49.25,0,0,1,5-4,13.19,13.19,0,0,1,4.41-2.15,2.34,2.34,0,0,1,2.7.9q.85,1.3-.05,5a36.48,36.48,0,0,1-3.35,8.56q-2.25,4.16-4.66,8.21t-4.56,8.06a31.21,31.21,0,0,0-3.05,8.11,24.48,24.48,0,0,0-.5,5.36,28.29,28.29,0,0,0,.7,6.26,18,18,0,0,0,2.3,5.66,8.4,8.4,0,0,0,4.41,3.55,11.76,11.76,0,0,0,6.41.6,20.6,20.6,0,0,0,6.26-2.3,31.45,31.45,0,0,0,5.86-4.25,70.45,70.45,0,0,0,5.21-5.26q2.4-2.7,4.3-5.26t3.2-4.35l1.7,1.8q.7.6-.85,3.4a42.55,42.55,0,0,1-4.5,6.36,77.17,77.17,0,0,1-7,7.26,48.07,48.07,0,0,1-8.26,6.21,23.14,23.14,0,0,1-8.41,3.1A9.41,9.41,0,0,1,694,306.52ZM690.58,263a12.86,12.86,0,0,0-.15,1.75q-.05,1.25,0,2.65t0,2.6a12.42,12.42,0,0,0,.15,1.7,128.28,128.28,0,0,0,6-11.71A75.67,75.67,0,0,0,701,247.45a12.23,12.23,0,0,0-4.16,2.45,16.47,16.47,0,0,0-3.15,3.8,20.72,20.72,0,0,0-2.05,4.56A27.92,27.92,0,0,0,690.58,263Z" transform="translate(-284.53 -174.12)" /><path d="M741,260.37c8.49.66,17.29.89,25.25-2.59,7.12-3.12,12.78-8.87,16.84-15.42,4.94-8,7.5-17.16,9.63-26.21,2.54-10.79,4.49-21.7,6-32.68.25-1.89-2.64-2.7-2.89-.8-2.4,17.74-4.88,37.62-12.9,53.83-3.48,7-8.54,13.49-15.49,17.37-8.08,4.5-17.48,4.2-26.4,3.5-1.93-.15-1.92,2.85,0,3Z" transform="translate(-284.53 -174.12)" /><path d="M778.6,200a41.51,41.51,0,0,0,20.63-24h-2.89a147.34,147.34,0,0,0,27.79,52.82c1.23,1.49,3.34-.64,2.12-2.12a143.69,143.69,0,0,1-27-51.49,1.51,1.51,0,0,0-2.89,0,38.47,38.47,0,0,1-19.26,22.25c-1.72.88-.2,3.47,1.51,2.59Z" transform="translate(-284.53 -174.12)" /></svg>
                </div>
            </div>
            <ToastContainer style={{ fontSize:'small'}}
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}
