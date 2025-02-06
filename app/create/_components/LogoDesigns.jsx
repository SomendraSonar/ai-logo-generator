import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import LogoDesig from '@/app/_data/LogoDesig'
import Image from 'next/image'

function LogoDesigns({ onHandelInputChange }) { // Pass as a prop
  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div className='my-10'>
      <HeadingDescription
        title={Lookup.LogoDesignTitle}
        description={Lookup.LogoDesignDesc} 
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {LogoDesig.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design.title)
              if (onHandelInputChange) onHandelInputChange(design) // Call function safely
            }}
            className={`flex flex-col items-center p-1 hover:border-2 rounded-xl cursor-pointer
              ${selectedOption === design.title ? 'border-2 border-primary' : ''}`}
          >
            <Image
              src={design.image}
              alt={design.title}
              width={300}
              height={200}
              className="w-full rounded-xl shadow-lg"
            />
            <p className="mt-2 text-center font-medium">{design.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoDesigns
