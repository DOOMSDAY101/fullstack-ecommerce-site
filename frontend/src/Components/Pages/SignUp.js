import React, { useState, useContext, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { isUserLoggedIn } from '../../App'

import './Signup.css'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'


import { app, auth } from '../../config/firebase-config'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
import { set, ref, getDatabase } from 'firebase/database'
const database = getDatabase(app)

function signInWithGoogle() {

    let provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((userCred) => {
        console.log('user created', userCred);
        toast.success('Signed in Succesfully', {
            theme: 'colored'
        });
        let date = new Date().toString();
        let recFirstname = userCred.user.displayName.split(' ')[0]
        set(ref(database, userCred.user.uid + '/' + 'User'), {
            firstname: recFirstname,
            account_created: date,
            mail: userCred.user.email,
            full_name: userCred.user.displayName,
        })
    }).catch(() => {
        toast.error('An error occured during signup', {
            theme: 'colored'
        })
        console.log('Error signing user In')
    })
}

function SignUp() {
    const [setIsloggedIn] = useContext(isUserLoggedIn)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPssword, setIspassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    let isValid = true;

    useEffect(() => {
        document.title = "Signup"
        return (() => {
            document.title = ""
        })
    })

    const handleEyeClick = () => {
        setIspassword(!isPssword)
    }

    const submitfcn = async (e) => {
        e.preventDefault();

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let trimmedEmail = email.trim()

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

        let trimmedName = name.trim();
        if (!trimmedName) {
            isValid = false;
            toast.info('Name cannot be blank', {
                theme: 'colored'
            })
        }
        let trimmedPassword = password.trim();
        let requireLowerLetter = /^(?=.*[a-z])/
        let requireUppercaseLetter = /^(?=.*[A-Z])/
        let requireDigit = /^(?=.*\d)/
        let requireSpecialChar = /^(?=.*[@.#$!%*/?&,()<>+=[{}_;:^])/

        let charLength = /^[A-Za-z\d@.#$!%*?/,()+=[{}<>_:;&]{8,15}/
        let overallCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&/,()+=[{}<>_;:^])[A-Za-z\d@.#$!%*?/,()+=[{}<>_;:&]{8,15}/;
        if (!password) {
            isValid = false;
            toast.error("Password must contain atleast 8 characers", {
                theme: 'colored'
            })
        }
        else if (!requireLowerLetter.test(trimmedPassword)) {
            isValid = false;
            toast.error("Password must be contain atleast one lowercase letter", {
                theme: 'colored'
            })
        } else if (!requireUppercaseLetter.test(trimmedPassword)) {
            isValid = false;
            toast.error("Password must be contain atleast one Uppercase letter", {
                theme: 'colored'
            })
        } else if (!requireDigit.test(trimmedPassword)) {
            isValid = false;
            toast.error("Password must be contain atleast one digit", {
                theme: 'colored'
            })
        } else if (!requireSpecialChar.test(trimmedPassword)) {
            isValid = false;
            toast.error("Password must be contain atleast one special character", {
                theme: 'colored'
            })
        } else if (!charLength.test(trimmedPassword)) {
            isValid = false;
            toast.error("Password must contain atleast 8 characers", {
                theme: 'colored'
            })
        } else if (!overallCheck.test(trimmedPassword)) {
            isValid = false;
            toast.error("Password must contain atleast one Uppercase, Lowercase, digit, special character, and must contain atleast 8 characters", {
                theme: 'colored'
            })
        }

        if (isValid) {
            const data = { trimmedName, trimmedEmail, trimmedPassword };
            apiRequest(data);
        }

    }

    let apiRequest = async (passedData) => {
        setIsLoading(true)

        try {
            const response = await fetch('https://exclusive-e-commerce-site.onrender.com/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(passedData)

            });

            if (response.ok) {
                const data = await response.json();
                setIsLoading(false)
                toast.success('Account Created Successfully', {
                    theme: 'colored'
                })
                // console.log(data)
                signInWithEmailAndPassword(auth, data.email, data.password).then((usercred) => {
                    console.log('user cred: ', usercred)
                    setIsloggedIn(true)

                }).catch((err) => {
                    console.log(err)
                })
            } else if (response.status === 409) {
                const data = await response.json();
                setIsLoading(false)
                toast.error('Email account is already in use', {
                    theme: 'colored'
                });
                console.log(data)
            } else {
                setIsLoading(false)
                toast.error('An error occurred during signup', {
                    theme: 'colored'
                });
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('An error occurred during signup', {
                theme: 'colored'
            });
        }
    }


    return (
        <div>
            <div className='signup-form'>
                <div className='signup-img'></div>
                <div className='form-area'>

                    <form onSubmit={submitfcn} className='form'>
                        <div className='desc'><h1>Create an account</h1></div>
                        <div className='desc-texts'><h2>Enter your details below</h2></div>

                        <div className='input'>
                            <input type='text' required autoComplete='off' autoFocus name='firstname' value={name} onChange={(e) => setName(e.target.value)} id='firstname'></input>
                            <label for="firstname">Name</label>
                        </div>

                        <div className='input'>
                            <input type='text' required autoComplete='off' name='email' value={email} onChange={(e) => setEmail(e.target.value)} id='email'></input>
                            <label for="email">Email</label>
                        </div>
                        <div className='input'>
                            <input type={isPssword ? 'password' : 'text'} required autoComplete='off' name='password' value={password} onChange={(e) => setPassword(e.target.value)} id='password' /><Icon icon={isPssword ? 'mdi:eye' : 'el:eye-close'} width="24" height="24" className='eye-toggle' onClick={handleEyeClick} />
                            <label for="password">Password</label>
                        </div>

                        <button type='submit' className='signup-btn' disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Create Account'}</button>
                        <div className='alt-or'>OR</div>
                        <button type='button' className='google-btn' onClick={signInWithGoogle}><Icon icon="flat-color-icons:google" width='24px' height='24px' className='google-icon' />Signup with Google</button>
                        <div className='login-existed'>
                            <p>Already have an account? <Link to='/login'>Log In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
