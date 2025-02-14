import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
        <div className='banner__card'>
            <span><i className='ri-truck-line'/></span>
            <h4>Free Delivery</h4>
            <p>Offers Convenience and the abiltiy to shop from anywhere,anytime</p>
        </div>
        <div className='banner__card'>
            <span><i className='ri-money-dollar-circle-line'/></span>
            <h4>Money Guarantee</h4>
            <p>Offers Convenience and the abiltiy return the items</p>
        </div>
        <div className='banner__card'>
            <span><i className='ri-user-voice-fill'/></span>
            <h4>Good Customer Care</h4>
            <p>Offers Convenience and the abiltiy to connect to Customer Care anywhere,anytime</p>
        </div>
    </section>
  )
}

export default PromoBanner
