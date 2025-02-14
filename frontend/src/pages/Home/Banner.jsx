import React from 'react'
import {Link} from 'react-router-dom'
import bannerImg from "../../assets/header.png"

const Banner = () => {
  return (
    <div className = 'section__container header__container'>
      <div className='header__content z-30'> 
        <h4 className='uppercase'>Up to 30% discount</h4>
        <h1>Fashion</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem reprehenderit nesciunt suscipit, facilis ducimus quidem. Velit ipsam quibusdam dicta ea veniam optio sint odio necessitatibus. Assumenda corporis asperiores officia beatae?</p>
        <button className = 'btn'><Link to ='/shop'>Explore Now</Link></button>
      </div>
      <div>
        <img src={bannerImg} alt="banner image" />
      </div>
    </div>
  )
}

export default Banner
