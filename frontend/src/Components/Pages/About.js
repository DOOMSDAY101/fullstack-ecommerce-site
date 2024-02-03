import React, { useEffect, useState } from 'react'

import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'


import './About.css'
function About() {
    const [showAnimation, setShowAnimation] = useState(false);
    function reveal() {
        let windowHeight = window.innerHeight;
        let revealPoint = 110;

        let reveals = document.querySelectorAll('.customer-service-box');

        for (let i = 0; i < reveals.length; i++) {
            let revealTop = reveals[i].getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add('active')
            }

        }

        let revealCard = document.querySelectorAll('.workers_card');

        for (let i = 0; i < revealCard.length; i++) {
            let revealTopCard = revealCard[i].getBoundingClientRect().top;
            if (revealTopCard < windowHeight - revealPoint) {
                revealCard[i].classList.add('active-card-reveal')
            }
        }
    }
    useEffect(() => {
        document.title = "About"
        return (() => {
            document.title = ""
        })
    })
    useEffect(() => {
        let showAnimation = () => {
            setShowAnimation(true)
        }
        window.addEventListener('scroll', reveal)
        const timeoutId = setTimeout(showAnimation, 100);
        return (() => {
            clearTimeout(timeoutId)
        })

    }, [])
    return (
        <div>
            <div className='about'>
                <div className={`our-story ${showAnimation ? 'show-trans' : ''}`}>
                    <h1>Our Story</h1>
                    <p>Launced in 2015, Exclusive is South Asia's premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.</p><br></br>
                    <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
                </div>
                <div className={`side-img-about ${showAnimation ? 'show-trans-img' : ''}`}></div>
            </div>

            <div className='customer-service'>
                <div className='customer-service-box'>
                    <div className='customer-service-box-inner-content'>
                        <div className='box-icon'>
                            <div className='box-icon-content'><Icon icon="lets-icons:shop-light" width="40" height="40" className='box-icons-content' /></div>
                        </div>
                        <h1 className='box-icon-numbers'>10.5K</h1>
                        <p className='box-icon-text'>Sallers active our site</p>
                    </div>
                </div>
                <div className='customer-service-box'>
                    <div className='customer-service-box-inner-content'>
                        <div className='box-icon'>
                            <div className='box-icon-content'><Icon icon="circum:dollar" width="40" height="40" className='box-icons-content' /></div>
                        </div>
                        <h1 className='box-icon-numbers'>33K</h1>
                        <p className='box-icon-text'>Monthly Product Sale</p>

                    </div>
                </div>
                <div className='customer-service-box'>
                    <div className='customer-service-box-inner-content'>
                        <div className='box-icon'>
                            <div className='box-icon-content'><Icon icon="lets-icons:bag-light" width="40" height="40" className='box-icons-content' /></div>
                        </div>
                        <h1 className='box-icon-numbers'>45.5K</h1>
                        <p className='box-icon-text'>Customer aactive in our site</p>
                    </div>
                </div>
                <div className='customer-service-box'>
                    <div className='customer-service-box-inner-content'>
                        <div className='box-icon'>
                            <div className='box-icon-content'><Icon icon="healthicons:money-bag-outline" width="40" height="40" className='box-icons-content' /></div>
                        </div>
                        <h1 className='box-icon-numbers'>25K</h1>
                        <p className='box-icon-text'>Annual gross sale in our site</p>

                    </div>
                </div>
            </div>
            <div className='workers__'>
                <div className='workers_card'>
                    <div className='workers_card_img'>
                        <div className='workers_img'></div>
                    </div>
                    <div className='workers_info'>
                        <h1 className='worker_name'>Tom Cruise</h1>
                        <p className='worker_position'>Founder & Chairman</p>
                        <div className='worker_social'>
                            <Link to='https://twitter.com' target='_blank'><Icon icon="lucide:twitter" className='worker_social_icons' /></Link>
                            <Link to='https://instagram.com' target='_blank'><Icon icon="ri:instagram-line" className='worker_social_icons' /></Link>
                            <Link to='https://linkedin.com' target='_blank'><Icon icon="dashicons:linkedin" className='worker_social_icons' /></Link>
                        </div>
                    </div>
                </div>
                <div className='workers_card'>
                    <div className='workers_card_img'>
                        <div className='workers_img workers_img_2'></div>
                    </div>
                    <div className='workers_info'>
                        <h1 className='worker_name'>Emma Watson</h1>
                        <p className='worker_position'>Managing Director</p>
                        <div className='worker_social'>
                            <Link to='https://twitter.com' target='_blank'><Icon icon="lucide:twitter" className='worker_social_icons' /></Link>
                            <Link to='https://instagram.com' target='_blank'><Icon icon="ri:instagram-line" className='worker_social_icons' /></Link>
                            <Link to='https://linkedin.com' target='_blank'><Icon icon="dashicons:linkedin" className='worker_social_icons' /></Link>
                        </div>
                    </div>
                </div>
                <div className='workers_card'>
                    <div className='workers_card_img'>
                        <div className='workers_img workers_img_3'></div>
                    </div>
                    <div className='workers_info'>
                        <h1 className='worker_name'>Will Smith</h1>
                        <p className='worker_position'>Product Designer</p>
                        <div className='worker_social'>
                            <Link to='https://twitter.com' target='_blank'><Icon icon="lucide:twitter" className='worker_social_icons' /></Link>
                            <Link to='https://instagram.com' target='_blank'><Icon icon="ri:instagram-line" className='worker_social_icons' /></Link>
                            <Link to='https://linkedin.com' target='_blank'><Icon icon="dashicons:linkedin" className='worker_social_icons' /></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='services_trust'>
                <div className='services_trust_boxes'>
                    <div className='box-icon'>
                        <div className='box-icon-content'><Icon icon="mdi:truck-fast-outline" className='box-icons-content' /></div>
                    </div>
                    <div className='desc_&&_header'>
                        <h1 className='services_trust_boxes_header'>FREE AND FAST DELIVERY</h1>
                        <p className='services_trust_boxes_header_desc'>Free delivery for all orders over $140</p>
                    </div>
                </div>
                <div className='services_trust_boxes'>
                    <div className='services_trust_boxes'>
                        <div className='box-icon'>
                            <div className='box-icon-content'><Icon icon="ph:headset" className='box-icons-content' /></div>
                        </div>
                        <div className='desc_&&_header'>
                            <h1 className='services_trust_boxes_header'>24/7 CUSTOMER SERVICE</h1>
                            <p className='services_trust_boxes_header_desc'>Friendly 24/7 customer support</p>
                        </div>
                    </div>
                </div>
                <div className='services_trust_boxes'>
                    <div className='services_trust_boxes'>
                        <div className='box-icon'>
                            <div className='box-icon-content'><Icon icon="ion:shield-checkmark-outline" className='box-icons-content' /></div>
                        </div>
                        <div className='desc_&&_header'>
                            <h1 className='services_trust_boxes_header'>MONEY BACK GUARANTEE</h1>
                            <p className='services_trust_boxes_header_desc'>We return money within 30 days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
