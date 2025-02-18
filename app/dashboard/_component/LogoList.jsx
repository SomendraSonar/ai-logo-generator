"use client"
import { UserDetailContex } from '@/app/_context/UserDetailContext';
import {collection, getDocs } from 'firebase/firestore';
import React, { useContext, useState , useEffect} from 'react';
import { db } from '@/configs/FirebaseConfig';


function LogoList() {
    const { userDetail, setUserDetail } = useContext(UserDetailContex);
    const[logoList,setLogoList]=useState([]);

    useEffect(()=>{
        userDetail
    },[userDetail])

    const GetUserLogos =async () => {
        const querySnapShot=await getDocs(collection(db,"users",userDetail?.email,"logos"));
        setLogoList([]);
        querySnapShot.forEach((doc)=>{
            console.log(doc.data());
            setLogoList(prev=>[...prev,doc.data()])
        })
    };

    return (
        <div className="mt-10">
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {logoList?.length >0?logoList.map((logo, index) => (
              <div key={index}>
                <Image src={logo?.image} width={400} height={200} 
                className="w-full rounded-xl"/>
                <h2 className='text-center text-lg font-font-medium mt-2'>{logo?.title}</h2>
                <p className='textr-sm text-gray-500 text-center'>{logo?.desc}</p>
              </div>
            ))
          : (
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div key={index} />
            ))
          )}
        </div>
      </div>
    );
}

export default LogoList;