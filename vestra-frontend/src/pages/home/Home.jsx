import React from 'react'
import Navbar from '../../components/layout/Navbar'
import Hero from '../../components/layout/Hero'
import Footer from '../../components/layout/Footer'

const Home = () => {
  return (
     <>
     <Navbar cartCount={0}/>
     <Hero/>
     <Footer/>
     </>
  )
}

export default Home