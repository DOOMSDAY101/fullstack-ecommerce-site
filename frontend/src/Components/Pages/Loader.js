import React from 'react'
import './Loader.css'

function Loader() {
    return (
        <div className='loader'>
            <div class="three-body">
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
            </div>
            <p>Loading...</p>
        </div>
    )
}

export default Loader
