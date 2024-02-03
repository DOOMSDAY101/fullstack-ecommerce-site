import React, { useState, useEffect } from 'react'

import { Icon } from '@iconify/react';

import './Login.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { auth } from '../../config/firebase-config'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [isPssword, setIspassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    let isValid = true;

    const handleEyeClick = () => {
        setIspassword(!isPssword)
    }



    function submitfcn(e) {
        e.preventDefault();

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let trimmedEmail = email.trim();

        if (!trimmedEmail) {
            isValid = false;
            toast.warn('Please enter your email', {
                theme: 'colored'
            })
        } else if (!emailRegex.test(trimmedEmail)) {
            toast.warn('Invalid email', {
                theme: 'colored'
            })
            isValid = false;
        }

        let trimmedPassword = password.trim();
        if (!password) {
            isValid = false;
            toast.error("Please enter your password", {
                theme: 'colored'
            })
        }
        let data = { trimmedEmail, trimmedPassword }
        if (isValid) {
            loginfcn(data)
        }
    }

    function loginfcn(data) {

        let { trimmedEmail, trimmedPassword } = data;
        setIsLoading(true)
        signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
            .then((userCred) => {
                setIsLoading(false)
                toast.success('Logged in successfully', {
                    theme: 'colored'
                });
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsLoading(false)
                if (errorCode === 'auth/invalid-login-credentials') {
                    toast.error('Invalid login credentials', {
                        theme: 'colored'
                    })
                } else {
                    toast.error('An error occured', {
                        theme: 'colored'
                    })
                }

                console.log(`error code: ${errorCode}`)
                console.log(`error message: ${errorMessage}`)
            })
    }

    function signInWithGoogle() {
        let provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((userCred) => {
            toast.success('Logged in successfully', {
                theme: 'colored'
            });
            console.log('Signed in successfully')
        }).catch((e) => {
            console.log(e)
            toast.error('An error occured', {
                theme: 'colored'
            })
            console.log('Error signing user In')
        })
    }
    useEffect(() => {
        document.title = "Login"
        return (() => {
            document.title = ""
        })
    })
    return (
        <div>
            <div className='signup-form-login'>
                <div className='side-img-login'></div>
                <div className='form-area-login'>
                    <form className='form-login' onSubmit={submitfcn}>
                        <div className='desc'><h1>Log in to Exclusive</h1></div>
                        <div className='desc-texts'><h2>Enter your details below</h2></div>

                        <div className='input'>
                            <input type='text' required autoComplete='off' name='email' value={email} onChange={(e) => setEmail(e.target.value)} id='email' autoFocus></input>
                            <label for="email">Email</label>
                        </div>

                        <div className='input'>
                            <input type={isPssword ? 'password' : 'text'} required autoComplete='off' name='password' value={password} onChange={(e) => setPassword(e.target.value)} id='password' /><Icon icon={isPssword ? 'mdi:eye' : 'el:eye-close'} width="24" height="24" className='eye-toggle' onClick={handleEyeClick} />
                            <label for="password">Password</label>
                        </div>

                        <div className='login-forgot'>
                            <button type='submit' className='login-btn' disabled={isLoading}>{isLoading ? 'Logging In...' : 'Log In'}</button>
                            <Link to='#'>Forgot Password?</Link>
                        </div>
                        <div className='alt-or'>OR</div>
                        <button type='button' className='google-btn' onClick={signInWithGoogle}><Icon icon="flat-color-icons:google" width='24px' height='24px' className='google-icon' />Sign In with Google</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
