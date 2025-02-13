"use client"
import React, { useState } from 'react'
import LogoTitle from './_components/LogoTitle'
// import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArrowLeft , ArrowRight } from 'lucide-react'
// import LogoColorPallet from './_components/LogoPallet'
import LogoDesigns from './_components/LogoDesigns'
// import LogoPalettel from './_components/LogoPallet'
import LogoPalette from './_components/LogoPalette'
import LogoIdea from './_components/LogoIdea'
import LogoDesc from "./_components/LogoDesc";  // Adjust path if needed
import PricingModel from './_components/PricingModel'


function CreateLogo() {
    const [step,setStep]=useState(1);
    const [formData,setFormData]=useState();

    const onHandelInputChange=(field,value)=>{

        setFormData(prev=>({
            ...prev,
            [field]:value 
        }))

        console.log(formData)

    }
  return (
    <div className='mt-28 p-10 border rounded-xl 2xl:mx-100'>
        {step==1?
         <LogoTitle onHandelInputChange={(v)=>onHandelInputChange('title',v)}
         formData={formData}/>:
         step==2?
         <LogoDesc onHandelInputChange={(v)=>onHandelInputChange('desc',v)}
         formData={formData}/>:
         step==3?
         <LogoPalette onHandelInputChange={(v)=>onHandelInputChange('palette',v)}
         formData={formData}/>:
         step==4?
         <LogoDesigns onHandelInputChange={(v)=>onHandelInputChange('design',v)}
         formData={formData}/>:
         step==5?
         <LogoIdea onHandelInputChange={(v)=>onHandelInputChange('idea',v)}
         formData={formData}/>:
         step==6?
         <PricingModel onHandelInputChange={(v)=>onHandelInputChange('pricing',v)}
         formData={formData}/>:

         null
        
    }
       

    <div className='flex items-center justify-between mt-10'>
        {step!=1&&<Button variant="outline" onClick={()=>setStep(step-1)}><ArrowLeft />Previous</Button>}
        <Button onClick={()=>setStep(step+1)}><ArrowRight />Continue</Button>
    </div>
    </div>
  )
}

export default CreateLogo