import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import Herosection from './Herosection'
import TrendingProducts from '../Shop/TrendingProducts'
import DealsSection from './DealsSection'
import PromoBanner from './PromoBanner'
import Blogs from '../blogs/Blogs'

const Home = () => {
  return (
    <>
      <Banner />
      <Categories />
      <Herosection />
      <TrendingProducts />
      <DealsSection />
      <PromoBanner />
      <Blogs /> 
    </>
  )
}

export default Home
