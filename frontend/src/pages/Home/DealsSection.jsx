import React from 'react'
import dealsImg from '../../assets/deals.png'
const DealsSection = () => {
  return (
    <section className='section__container deals__container'>
        <div className='deals__imgae'>
            <img src={dealsImg} alt=""/>
        </div>
        <div className='deals__content'>
            <h5>Get Up to 30% Discount</h5>
            <h4>Deals of the month</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ut minus sed culpa possimus nesciunt quas harum, repudiandae est quaerat eos ab. Quaerat ex veritatis asperiores accusamus rem ratione quam?</p>
            <div className='deals__countdown flex-wrap'>
                <div className='deals__countdown__card'>
                    <h4>14</h4>
                    <p>Days</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>20</h4>
                    <p>Hrs</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>15</h4>
                    <p>Mins</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>07</h4>
                    <p>Sec</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default DealsSection
