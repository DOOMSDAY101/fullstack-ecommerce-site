import React, { useEffect, useState, useContext } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react'
import './Layout.css'

import { isUserLoggedIn } from '../../App'
import { auth } from '../../config/firebase-config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import Loader from './Loader';

import Footer from './Footer';

function Layout() {
    let location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsloggedIn] = useContext(isUserLoggedIn)
    const [isPanelOpened, setIsPanelOpened] = useState(false)
    let [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsloggedIn(true);
                console.log('user is signed in')
            } else {
                setIsloggedIn(false);
                console.log('user is signed out')
            }
        });
        return () => unsubscribe();
    }, [setIsloggedIn])

    //State to set increment the value of the wishList/UsersFavourite count
    let [favouriteCount, setFavouriteCount] = useState(0)
    let [cartCount, setCartCount] = useState(0)

    //Function to set the increment of the values
    function favouriteCounter() {
        setFavouriteCount(prev => prev + 1)
    }
    function cartCounter() {
        setCartCount(prev => prev + 1)
    }
    useEffect(() => {
        const body = document.body;

        if (menuOpen) {
            body.classList.add('body-no-scroll');
            body.classList.add('nav-bar-opened');
        } else {
            body.classList.remove('body-no-scroll');
            body.classList.remove('nav-bar-opened');
        }

        return () => {
            body.classList.remove('nav-bar-opened');
            body.classList.remove('body-no-scroll');
        };
    }, [menuOpen])

    function showPanel() {
        setIsPanelOpened(!isPanelOpened)
    }
    function logoutFn() {
        setIsLoading(true)
        signOut(auth).then(() => {
            toast.success('Signed out successfully', {
                theme: 'colored'
            })
        }).catch((err) => {
            console.log(err);
            toast.error('An error occured', {
                theme: 'colored'
            })
            setIsloggedIn(false)
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 1500)

        })
    }

    return (
        <div>
            <div className='top-header'>
                <div className='advert-text'>
                    <h2>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <Link to='/' className='shop-now'> ShopNow</Link></h2>
                </div>
            </div>

            <header>
                <div className='ham-logo'>
                    <div className={`${"hamburger"} ${menuOpen ? "open" : ""}`} onClick={() => {
                        setMenuOpen(!menuOpen)
                    }}>
                        <div className='line'></div>
                    </div>
                    <Link to='/' className='logo'>Exclusive</Link>
                </div>

                <nav className='nav-bar'>
                    <ul>
                        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                        <li><Link to='/contact' className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
                        <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
                        {isLoggedIn ? "" : (
                            <li><Link to='/signup' className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</Link></li>
                        )
                        }
                    </ul>
                </nav>
                {/* className='nav-bar-mobile' */}
                <nav className={`${"nav-bar-mobile"} ${menuOpen ? "opened" : ""}`}>
                    <div className='my-account'>
                        <h1 className='my-account-h1'>MY ACCOUNT</h1>
                        <ul>
                            <li><Link to='/signup'><Icon icon="mdi:account-outline" className='icons'></Icon>Account</Link></li>
                            <li><Link to='/wishlist'><Icon icon="material-symbols:favorite-outline" className='icons'></Icon>Wishlist</Link></li>
                            <li><Link to='/cart'><Icon icon="ph:scroll" className='icons'></Icon>Orders</Link></li>
                        </ul>
                    </div>
                    <div className='my-account'>
                        <h1 className='my-account-h1'>OUR CATEGORIES</h1>
                        <ul>
                            <li><Link to='#'><Icon icon="bi:phone" className='icons'></Icon>Phones & Tablets</Link></li>
                            <li><Link to='#'><Icon icon="ph:television" className='icons'></Icon>Electronics</Link></li>
                            <li><Link to='#'><Icon icon="solar:gamepad-outline" className='icons'></Icon>Gaming</Link></li>
                            <li><Link to='#'><Icon icon="mi:computer" className='icons'></Icon>Computing</Link></li>
                            <li><Link to='#'><Icon icon="solar:home-outline" className='icons'></Icon>Home & Lifestyle</Link></li>
                            <li><Link to='#'><Icon icon="healthicons:ppe-gown" className='icons'></Icon>Women's fashion</Link></li>
                            <li><Link to='#'><Icon icon="ri:shirt-line" className='icons'></Icon>Men's fashion</Link></li>
                            <li><Link to='#'><Icon icon="uil:food" className='icons'></Icon>Grocieries</Link></li>
                            <li><Link to='#'><Icon icon="material-symbols:toys-outline" className='icons'></Icon>Toys</Link></li>
                        </ul>
                    </div>
                    <div className='my-account'>
                        <h1 className='my-account-h1'>CONTACT</h1>
                        <ul>
                            <li><Link to='/about'><Icon icon="mdi:about-circle-outline" className='icons'></Icon>About Us</Link></li>
                            <li><Link to='/about'><Icon icon="ic:outline-policy" className='icons'></Icon>Privacy Policy</Link></li>
                            <li><Link to='/contact'><Icon icon="ph:phone-bold" className='icons'></Icon>Contact Us</Link></li>
                        </ul>
                    </div>
                </nav>
                <div className='search-group'>
                    <div className='search-bar'>
                        <input type='text' placeholder='What are you looking for?' />
                    </div>
                    <div className='favorite-cart' title='wishlist'>
                        {isLoggedIn && <Link to="/wishlist"><div className='icon-favourite' onClick={favouriteCounter} >
                            {/* If count == 0 it wouldn't display the number of the count / users favourite  it would only display from 1 upward*/}
                            <div className={`${"favourite-count"} ${favouriteCount ? 'display-block' : 'display-none'}`}>{favouriteCount}</div>
                        </div></Link>}

                        {/* If the current path of the location is either login or sign up do not display anything */}
                        {location.pathname === '/login' || location.pathname === '/signup' ? (<></>) : (<>
                            <Link to="/cart"><div className='icon-cart' onClick={cartCounter} title='cart'>
                                {/* If count == 0 it wouldn't display the number of the count / users cart number  it would only display from 1 upward*/}
                                <div className={`${"favourite-count"} ${cartCount ? 'display-block' : 'display-none'}`}>{cartCount}</div>
                            </div></Link>

                            {isLoggedIn ? (
                                <>
                                    <button className='account-loggedin' title='account' onClick={showPanel}>
                                        <Icon icon="line-md:account" width={24} height={24}></Icon>
                                    </button>
                                    <div className={`${'account-content'} ${isPanelOpened ? 'show' : ''}`}>
                                        <ul>
                                            <li title=''><Link to=''><Icon icon="line-md:account" className='account-icons'></Icon>Manage My Account</Link></li>
                                            <li title=''><Link to=''><Icon icon="solar:bag-3-linear" className='account-icons'></Icon>My Order</Link></li>
                                            <li title=''><Link to=''><Icon icon="ph:star-light" className='account-icons'></Icon>My Reviews</Link></li>
                                            <li title='' onClick={logoutFn}><Link to='#'><Icon icon="solar:logout-2-outline" className='account-icons'></Icon>Logout</Link></li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <Link to='/signup'>
                                    <div className='account' title='account'></div>
                                </Link>
                            )
                            }
                        </>)}


                    </div>
                </div>
            </header >
            {isLoading ? <Loader /> : <Outlet />
            }

            <Footer />

        </div >
    )
}

export default Layout
