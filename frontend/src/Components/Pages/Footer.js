import React, { useState } from 'react'

import './Footer.css'
import { Link } from 'react-router-dom'

import { Icon } from '@iconify/react'

import QrCode from '../../images/qr-code.png'
function Footer() {
    let date = new Date();
    let [year] = useState(date.getFullYear())

    return (
        <footer className='footer'>
            <div className='footer-div'>
                <div className='subscribe-section'>
                    <h2>Exclusive</h2>
                    <Link to='#'>Subscribe</Link>
                    <p>Get 10% off your first order</p>
                    <input type='email' placeholder='Enter your email' />
                </div>
                <div className='footer-section'>
                    <h2 className='support-h2'>Support</h2>
                    <address>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</address>
                    <Link to='mailto:ifeoluwasulaiman30@gmail.com'>exclusive@gmail.com</Link>
                    <Link to='tel:+2348088890349'>+234 808 889 034 9</Link>
                </div>
                <div className='footer-section'>
                    <h2 className='support-h2'>Account</h2>
                    <ul className='footer-list'>
                        <li><Link to='#'>My Account</Link></li>
                        <li><Link to='#'>Login / Signup</Link></li>
                        <li><Link to='#'>Cart</Link></li>
                        <li><Link to='#'>Wishlist</Link></li>
                        <li><Link to='#'>Shop</Link></li>
                    </ul>
                </div>
                <div className='footer-section'>
                    <h2 className='support-h2'>Quick Link</h2>
                    <ul className='footer-list'>
                        <li><Link to='#'>Privacy policy</Link></li>
                        <li><Link to='#'>Terms of Use</Link></li>
                        <li><Link to='#'>FAQ</Link></li>
                        <li><Link to='#'>Contact</Link></li>
                    </ul>
                </div>
                <div className='footer-section'>
                    <h2 className='support-h2'>Download App</h2>
                    <p className='footer-adv'>Save $3 with App New User Only</p>
                    <div className='download-app'>
                        <div className='qr-img'><img src={QrCode} alt='qr-code'></img></div>
                        <div className='download-icons'>
                            <div className='playstore'>
                                <Icon icon="logos:google-play-icon" width="20" height="20" />  <p className='get'>GET IT ON <br /><span className='app-name'>Google Play</span></p>
                            </div>
                            <div className='playstore'>
                                <Icon icon="basil:apple-solid" color="#fafafa" width="20" height="20" /> <p className='get'>Download on the <br /><span className='app-name'>App Store</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='socials'>
                        <Link to='https://facebook.com' target='_blank'><Icon icon="ri:facebook-line" color="#fafafa" width="24" height="24" /></Link>
                        <Link to='https://twitter.com' target='_blank'><Icon icon="lucide:twitter" color="#fafafa" width="24" height="24" /></Link>
                        <Link to='https://instagram.com' target='_blank'><Icon icon="ri:instagram-line" color="#fafafa" width="24" height="24" /></Link>
                        <Link to='https://linkedin.com' target='_blank'><Icon icon="dashicons:linkedin" color="#fafafa" width="24" height="24" /></Link>
                    </div>
                </div>
            </div>
            <div className='copyright-session'>
                <p>&copy; Copyright Exclusive {year}. All right reserved</p>
            </div>
        </footer >
    )
}

export default Footer
