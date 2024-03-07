import React, { useEffect, useRef, useState } from 'react'

import './Contact.css'

import { Icon } from '@iconify/react'

function Contact() {
    //FUNCTION FOR THE ANIMATIONS
    let transRef = useRef();
    const [showAnimation, setShowAnimation] = useState(false);
    function reveal() {
        let windowHeight = window.innerHeight;
        let revealPoint = 0;


        for (let i = 0; i <= 2; i++) {
            let revealTop = transRef.current.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                setShowAnimation(true)
            }
        }
    }
    useEffect(() => {
        reveal()
    }, [])
    useEffect(() => {
        document.title = "Contact"
        return (() => {
            document.title = ""
        })
    })
    return (
        <div>
            <h1 className='contact_us_text' ref={transRef}>Contact Us</h1>
            <div className='contact-session'>
                <div className={`contact_phone_email ${showAnimation ? 'show-about-trans' : ''}`}>
                    <div className='phone_contact'>
                        <div className='phone_logo_ses'>
                            <div className='phone_logo'><Icon icon="ph:phone" color="white" width={30} height={30} /></div>
                            <h1 className='phone_logo_desc'>Contact Us</h1>
                        </div>
                        <p className='phone_logo_desc_par'>We are available 24/7, 7 days a week</p>
                        <p className='phone_logo_desc_par'>Phone: +2348088890349</p>
                    </div>
                    <div className='write_to_us'>
                        <p className='phone_logo_desc_par'>Fill out our form and we will contact you within 24 hours.</p>
                        <p className='phone_logo_desc_par'>Emails: <a href='mailto:ifeoluwasulaiman30@gmail.com' target='_blank' rel='noreferrer' className='phone_logo_desc_par'>customer@exclusive.com</a></p>
                        <p className='phone_logo_desc_par'>Emails: <a href='mailto:ifeoluwasulaiman30@gmail.com' target='_blank' rel='noreferrer' className='phone_logo_desc_par'>support@exclusive.com</a></p>
                    </div>
                </div>
                <div className={`send_email_session ${showAnimation ? 'show-about-trans' : ''}`}>
                    <form action='mailto:ifeoluwasulaiman30@gmail.com' method='post' encType='text/plain' className='contact_form'>
                        <div className='contact_form_sender_details'>
                            <input type='text' name='name' placeholder='Your Name' required className='contact_form_sender_details_inputs'></input>
                            <input type='email' name='email' placeholder='Your Email' required className='contact_form_sender_details_inputs'></input>
                            <input type='tel' name='number' placeholder='Your Phone' required className='contact_form_sender_details_inputs'></input>
                        </div>
                        <textarea className='contact_textarea' placeholder='Your Messsage' required></textarea>
                        <button type='submit' className='contact_submit'>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
