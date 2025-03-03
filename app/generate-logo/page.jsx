'use client';
import React, { useContext, useEffect, useState } from 'react';
import { UserDetailContext } from '../_context/UserDetailContext';

function GenerateLogo() {
  const { userDetail, setuserDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && userDetail?.email) {
      const storage = localStorage.getItem('formData');
      if (storage) {
        setFormData(JSON.parse(storage)); // Assuming you want to set the form data from local storage
        console.log(JSON.parse(storage))
      }
    }
  }, [userDetail]);

  return (
    <div>GenerateLogo</div>
  );
}

export default GenerateLogo;
