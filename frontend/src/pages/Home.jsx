import React from 'react'
import Header from '../components/Header'
import SpecialityMenue from '../components/SpecialityMenue.jsx'
import TopDoctors from '../components/TopDoctors.jsx'
import Banner from '../components/Banner.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenue/>
      <TopDoctors/>
      <Banner/>
    
    </div>
  )
}

export default Home
