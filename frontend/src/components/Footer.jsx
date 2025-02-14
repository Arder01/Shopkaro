import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className='section__container footer__container'>
        <div className='footer__col'>
        <h4>Contact Info</h4>
        <p>
            <span><i className='ri-map-pin-2-fill'/></span>
            123, E-City, Bengaluru,India
        </p>
        <p>
            <span><i className='ri-mail-fill'/></span>
            Shopkaro@support.com
        </p>
        <p>
            <span><i className='ri-phone-fill'/></span>
            +91 1234556789
        </p>
        </div>
        <div className='footer__col'>
            <h4>Shopkaro</h4>
            <a href="/">Home</a>
            <a href="/">About Us</a>
            <a href="/">Work With Us</a>
            <a href="/">Our Blogs</a>
            <a href="/">Terms and Conditions</a>
        </div>
    </footer>
    </>
  )
}

export default Footer
