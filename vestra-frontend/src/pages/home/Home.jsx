import React from 'react'
import Navbar from '../../components/layout/Navbar'
import Hero from '../../components/layout/Hero'
import Footer from '../../components/layout/Footer'
import VeeAssistant from '../../components/layout/VeeAssistant'

const Home = () => {
  return (
     <>
     <Navbar cartCount={0}/>
     <Hero/>
     <Footer/>
     <VeeAssistant/>
     </>
  )
}

export default Home