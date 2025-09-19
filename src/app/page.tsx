"use client"

import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
const Home = () => {
const Router=useRouter()

useEffect(()=>{
  if(window.location.hostname === "localhost")
    Router.push("/signup")
},[Router])


  return (
   <></>
  )
}

export default Home