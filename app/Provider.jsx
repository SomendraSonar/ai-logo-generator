import React from 'react'
import Header from './_components/Header'

function Provider({children}) {

  //save user data
  const CheckUserAuth=()=>{
    //save user to data base
  }
  return (
    <>
        <Header/>
        
        
      
        <div className='px-10 lg:px-32 xl:px-40 2xl:px-56'>
        {children}
        </div>
        
    </>
  )
}

export default Provider;