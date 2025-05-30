import React from 'react'
import Footer from '../Components/Footer'
import RecruitingCompanies from '../Components/RecruitingCompanies'
import JobSearch from '../Components/JobSearch'
import Navbar from '../Components/Navbar'

function Home() {
  return (
    <div>
      <Navbar />
      <JobSearch />
      <RecruitingCompanies />
      <Footer />
    </div>
  )
}

export default Home