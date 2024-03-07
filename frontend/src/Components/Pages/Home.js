import React, { useEffect, useState, useRef } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

import appleLogo from '../../images/apple-logo.svg'
import nextIcon from '../../images/icon-next-white.svg'
import { Icon } from '@iconify/react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";





function Home() {
    const [products, setProducts] = useState([])
    const initialCountdownDuration = 4 * 24 * 60 * 60 * 1000;
    const [timeLeft, setTimeLeft] = useState(initialCountdownDuration);
    const [dispProducts, setDispProducts] = useState([])
    const [bestProducts, setBestProducts] = useState([])



    useEffect(() => {
        fetch('https://exclusive-e-commerce-site.onrender.com/products').then((res) => res.json()).then((data) => {
            setProducts(data)
            setDispProducts(data.slice(0, 17));
            setBestProducts(data.slice(28, 32))
        }).catch(() => {
            console.log("error loading data")
        })
    }, [])

    useEffect(() => {
        document.title = "Home"
        return (() => {
            document.title = ""
        })
    })

    useEffect(() => {
        // Exit early when we reach 0
        if (!timeLeft) return;

        // Save intervalId to clear the interval when the component re-renders
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1000);
        }, 1000);

        // Clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft === 0) {
            setTimeLeft(initialCountdownDuration);
        }
    }, [timeLeft]);

    //FORMAT TIME FUNCTION
    const formatTimeLeft = (time) => {
        let seconds = Math.floor((time / 1000) % 60);
        let minutes = Math.floor((time / (1000 * 60)) % 60);
        let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        let days = Math.floor(time / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds }
    };

    const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
        const originalPrice = discountedPrice / (1 - (discountPercentage / 100));
        return originalPrice.toFixed(2);
    }

    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -1100, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 1100, behavior: 'smooth' });
    }

    
//RATING STAR FUNCTION
    function RatingStar({ rating }) {
        const stars = Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            if (rating >= starValue) {
                return <FaStar color="#FFAD33" key={index} className='rating-stars' />;
            } else if (rating > starValue - 1 && rating < starValue) {
                return <FaStarHalfAlt color="#FFAD33" key={index} className='rating-stars' />;
            } else {
                return <FaRegStar color="#FFAD33" key={index} className='rating-stars' />;
            }
        });

        return <div>{stars}</div>;
    }
    return (
        <div>

            <div className='category-section'>
                <section className='categories'>
                    <ul>
                        <li><Link to='#'>Women's Fashion</Link></li>
                        <li><Link to='#'>Men's Fashion</Link></li>
                        <li><Link to='#'>Electronics</Link></li>
                        <li><Link to='#'>Gaming</Link></li>
                        <li><Link to='#'>Computing</Link></li>
                        <li><Link to='#'>Home & Lifestyle</Link></li>
                        <li><Link to='#'>Groceries</Link></li>
                        <li><Link to='#'>Phones & Tablets</Link></li>
                        <li><Link to='#'>Toys</Link></li>
                    </ul>
                </section>
                <div className='divider'></div>
                <div className='advert-board'>
                    <div className='texts'>
                        <div className='apple-logo-text'>
                            <div className='apple-logo'><img src={appleLogo} alt='apple Logo' /></div>
                            <p>iPhone 14 Series</p>
                        </div>
                        <div className='percent-off'>
                            <p>Up to 10% off Voucher</p>
                        </div>
                        <div className='shop-now-link'>
                            <Link to='#'>Shop Now</Link>
                            <img src={nextIcon} alt='next-icon'></img>
                        </div>
                    </div>
                    <div className='image'>

                    </div>
                </div>
            </div>
            <div className='products-session'>
                <div className='flash_sales'>
                    <div className='flash_sales_timer_arrow'>
                        <div className='flash_sales_timer'>
                            <div className='flash_bar_div'>
                                <div className='flash_bar'></div><span className='todays'>Today's</span>
                            </div>
                            <div className='timer'>
                                <p className='flash_sales_text'>Flash Sales</p>
                                <p className='countdown_timer'>0{formatTimeLeft(timeLeft).days}<span className='timer_units'>d</span> <span className='timer_colon'>:</span> {formatTimeLeft(timeLeft).hours}<span className='timer_units'>h</span> <span className='timer_colon'>:</span> {formatTimeLeft(timeLeft).minutes}<span className='timer_units'>m</span> <span className='timer_colon'>:</span> {formatTimeLeft(timeLeft).seconds}<span className='timer_units'>s</span></p>
                            </div>
                        </div>
                        <div className='navigate_scroll_arrows'>
                            <button className='scroll-arrow' type='button' onClick={scrollLeft}><Icon icon="formkit:arrowleft" width="24" height="24" /></button>
                            <button className='scroll-arrow' type='button' onClick={scrollRight}><Icon icon="formkit:arrowright" width="24" height="24" /></button>
                        </div>
                    </div>
                    <div className='products-order-sesion' ref={scrollContainerRef} >
                        {

                            dispProducts.map((val, ind) => {
                                return (
                                    <div className='products-card' key={ind}>
                                        <div className='image-show'>
                                            <div className='products-discount-wishlist'>
                                                <span className='discount-perc'>-{dispProducts[ind].discountPercentage}%</span>
                                                <button type='button' className='products-add-wishlist'><Icon icon="mdi:heart-outline" className='products-icon' /></button>
                                            </div>
                                            <img src={dispProducts[ind].thumbnail} alt='products image' className='products-imgs'></img>
                                            <button type='button' className='products-btn'>Add To Cart</button>
                                        </div>
                                        <h2 className='products-name'>{dispProducts[ind].title}</h2>
                                        <div className='products-original-price'>
                                            <p className='products-price'>${dispProducts[ind].price}</p>
                                            <p className='original_price'>${calculateOriginalPrice(dispProducts[ind].price, dispProducts[ind].discountPercentage)}</p>
                                        </div>
                                        <div className='rating-session'>
                                            <RatingStar rating={dispProducts[ind].rating} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className='view-products'>View All Products</button>
                </div>
            </div>
            {/* <div className='middle-line'></div> */}
            <div className='products-session products-session-2'>
                <div className='flash_sales'>
                    <div className='flash_sales_timer_arrow'>
                        <div className='flash_sales_timer'>
                            <div className='flash_bar_div'>
                                <div className='flash_bar'></div><span className='todays'>This Month</span>
                            </div>
                            <div className='timer'>
                                <p className='flash_sales_text'>Best Selling Products</p>
                            </div>
                        </div>
                        <div className='navigate_scroll_arrows'>
                            <button className='view-all-best'>View all</button>
                        </div>
                    </div>
                    <div className='products-order-sesion'>{
                        bestProducts.map((val, ind) => {
                            return (
                                <div className='products-card'>
                                    <div className='image-show'>
                                        <div className='products-discount-wishlist'>
                                            <span className='discount-perc'>-{bestProducts[ind].discountPercentage}%</span>
                                            <button type='button' className='products-add-wishlist'><Icon icon="mdi:heart-outline" className='products-icon' /></button>
                                        </div>
                                        <img src={bestProducts[ind].thumbnail} alt='products' className='products-imgs'></img>
                                        <button type='button' className='products-btn'>Add To Cart</button>
                                    </div>
                                    <h2 className='products-name'>{bestProducts[ind].title}</h2>
                                    <div className='products-original-price'>
                                        <p className='products-price'>${bestProducts[ind].price}</p>
                                        <p className='original_price'>${calculateOriginalPrice(bestProducts[ind].price, bestProducts[ind].discountPercentage)}</p>
                                    </div>
                                    <div className='rating-session'>
                                        <RatingStar rating={bestProducts[ind].rating} />
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>

            </div>

            <div className='experience-music-ad'>
                <div className='experience-music-ad-text-session'>
                    <h1 className='enhance-text'>Enhance Your Music Experience</h1>
                    <div className='timer-session'>
                        <div className='timer_counter'>0{formatTimeLeft(timeLeft).days}<span className='timer_counter_units'>Days</span></div>
                        <div className='timer_counter'>{formatTimeLeft(timeLeft).hours}<span className='timer_counter_units'>Hours</span></div>
                        <div className='timer_counter'>{formatTimeLeft(timeLeft).minutes}<span className='timer_counter_units'>Minutes</span></div>
                        <div className='timer_counter'>{formatTimeLeft(timeLeft).seconds}<span className='timer_counter_units'>Seconds</span></div>
                    </div>
                    <button className='buy-now-btn'>Buy Now!</button>
                </div>


                <div className='jbl_speaker'></div>

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
        </div >
    )
}

export default Home
