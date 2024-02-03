import React, { lazy, Suspense } from 'react'

import { Route, Routes } from 'react-router-dom';


// import Home from './Components/Pages/Home'
// import About from './Components/Pages/About'
// import NotFound from './Components/Pages/NotFound'
// import Contact from './Components/Pages/Contact'
// import SignUp from './Components/Pages/SignUp';
// import Login from './Components/Pages/Login';
// import Wishlist from './Components/Pages/Wishlist';
// import Cart from './Components/Pages/Cart';

import ProtectedRoutes from './ProtectedRoutes';
import Loader from './Components/Pages/Loader';

const LazyLayout = lazy(() => import('./Components/Pages/Layout'))
const LazyHome = lazy(() => import('./Components/Pages/Home'))
const LazyAbout = lazy(() => import('./Components/Pages/About'));
const LazyContact = lazy(() => import('./Components/Pages/Contact'));
const LazySignUp = lazy(() => import('./Components/Pages/SignUp'));
const LazyLogin = lazy(() => import('./Components/Pages/Login'));
const LazyWishlist = lazy(() => import('./Components/Pages/Wishlist'));
const LazyCart = lazy(() => import('./Components/Pages/Cart'));
const LazyNotFound = lazy(() => import('./Components/Pages/NotFound'));


function RoutePath() {

    return (
        <>
            {/* <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />}></Route>
                    <Route path='contact' element={<Contact />}></Route>
                    <Route path='about' element={<About />}></Route>
                    <Route path='wishlist' element={<Wishlist />}></Route>
                    <Route path='cart' element={<Cart />}></Route>
                    <Route path='*' element={<NotFound />}></Route>
                </Route>

                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='/' element={<Layout />}>
                        <Route path='signup' element={<SignUp />}></Route>
                        <Route path='login' element={<Login />}></Route>
                    </Route>
                </Route>
            </Routes > */}
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Suspense fallback={<Loader />}>
                        <LazyLayout />
                    </Suspense>}>
                        <Route path='home' element={<Suspense fallback={<Loader />}>
                            <LazyHome />
                        </Suspense>} />
                        <Route index element={<Suspense fallback={<Loader />}>
                            <LazyHome />
                        </Suspense>} />
                        <Route path="contact" element={<Suspense fallback={<Loader />}>
                            <LazyContact />
                        </Suspense>} />
                        <Route path="about" element={<Suspense fallback={<Loader />}>
                            <LazyAbout />
                        </Suspense>} />
                        <Route path="wishlist" element={<Suspense fallback={<Loader />}>
                            <LazyWishlist />
                        </Suspense>} />
                        <Route path="cart" element={<Suspense fallback={<Loader />}>
                            <LazyCart />
                        </Suspense>} />
                        <Route path="*" element={<Suspense fallback={<Loader />}>
                            <LazyNotFound />
                        </Suspense>} />
                    </Route>

                    <Route path="/" element={<ProtectedRoutes />}>
                        <Route path="/" element={<Suspense fallback={<Loader />}>
                            <LazyLayout />
                        </Suspense>}>
                            <Route path="signup" element={<Suspense fallback={<Loader />}>
                                <LazySignUp />
                            </Suspense>} />
                            <Route path="login" element={<Suspense fallback={<Loader />}>
                                <LazyLogin />
                            </Suspense>} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default RoutePath
