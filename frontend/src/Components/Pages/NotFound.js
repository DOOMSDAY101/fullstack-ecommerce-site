import React, { useEffect } from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom'

function NotFound() {

    useEffect(() => {
        document.title = "404 | Page Not Found"
        return (() => {
            document.title = ""
        })
    })
    return (
        <div className='not-found'>

            <h1 className='not-found-text'>404 Not Found</h1>
            <p className='not-found-desc-text'>visited page not found. You may go to the home page</p>
            <Link to='/' className='not-found-link'>Back to Home Page</Link>

        </div>
    )
}

export default NotFound
