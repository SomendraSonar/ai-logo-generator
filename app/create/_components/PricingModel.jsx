// // "use cilent"
// // import React, { useEffect } from 'react';
// // import HeadingDescription from './HeadingDescription';
// // import Lookup from '@/app/_data/Lookup';
// // import Image from 'next/image';  // ✅ Import Image
// // import { Button } from '@/components/ui/button';
// // import dynamic from 'next/dynamic';

// // function PricingModel({formData}) {
// //     useEffect(()=>{
// //         if(formData?.title&& typeof window!=='undefined'){
// //             localStorage.setItem('formData',JSON.stringify(formData))
// //         }

// //     },[formData])
// //   return (
// //     <div className=''>
// //       <HeadingDescription
// //         title={Lookup.LogoPricingModelTitle}
// //         description={Lookup.LogoPricingModelDesc}
// //       />

// //       <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
// //         {Lookup.pricingOption.map((pricing, index) => (
// //           <div className='flex flex-col items-center p-5 border rounded-xl mt-5' key={index}>  {/* ✅ Added key prop */}
// //             <Image 
// //               src={pricing.icon} 
// //               alt={pricing.title} 
// //               width={60} 
// //               height={60} 
// //             />
// //             <h2 className='font-medium text-xl'>{pricing.title}</h2> {/* Display the title */}
            
// //             {/* Features List */}
// //             <div className='mt-3'>
// //               <h3 className='font-semibold text-lg'>Features:</h3> 
// //               <ul className='list-disc pl-5'>
// //                 {pricing.features.map((feature, i) => (  // ✅ Fixed map syntax
// //                   <li key={i} className='text-gray-600'>{feature}</li> 
// //                 ))}
// //               </ul>
// //             </div>
// //             <Button className="mt-5">{pricing.button}</Button>

// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // export default PricingModel;

// // export default dynamic (()=>Promise.resolve(PricingModel),{ssr:false})





// "use client"; // Ensure this component is treated as a Client Component
// import React, { useEffect, useState } from 'react';
// import HeadingDescription from './HeadingDescription';
// import Lookup from '@/app/_data/Lookup';
// import Image from 'next/image'; // ✅ Import Image
// import { Button } from '@/components/ui/button';
// import dynamic from 'next/dynamic';

// function PricingModel({ formData }) {
//   const [isClient, setIsClient] = useState(false); // Track if the component is on the client

//   useEffect(() => {
//     setIsClient(true); // Set isClient to true after mounting
//     if (formData?.title) {
//       localStorage.setItem('formData', JSON.stringify(formData)); // Safely use localStorage
//     }
//   }, [formData]);

//   // If not on the client yet, return null or a loading state
//   if (!isClient) {
//     return null; // Avoid rendering on the server
//   }

//   return (
//     <div className=''>
//       <HeadingDescription
//         title={Lookup.LogoPricingModelTitle}
//         description={Lookup.LogoPricingModelDesc}
//       />

//       <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
//         {Lookup.pricingOption.map((pricing, index) => (
//           <div className='flex flex-col items-center p-5 border rounded-xl mt-5' key={index}>
//             <Image
//               src={pricing.icon}
//               alt={pricing.title}
//               width={60}
//               height={60}
//             />
//             <h2 className='font-medium text-xl'>{pricing.title}</h2>

//             {/* Features List */}
//             <div className='mt-3'>
//               <h3 className='font-semibold text-lg'>Features:</h3>
//               <ul className='list-disc pl-5'>
//                 {pricing.features.map((feature, i) => (
//                   <li key={i} className='text-gray-600'>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//             <Button className="mt-5">{pricing.button}</Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Dynamically import the component with SSR disabled
// export default dynamic(() => Promise.resolve(PricingModel), { ssr: false });



"use client";
import React, { useEffect, useState } from 'react';
import HeadingDescription from './HeadingDescription';
import Lookup from '@/app/_data/Lookup';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SignInButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';



function PricingModel() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({}); // ✅ Define formData

  const {user}=useUser();
  useEffect(() => {
    setIsClient(true); // ✅ Ensure component is on client side
    const savedFormData = localStorage.getItem('formData');

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    if (formData?.title) {
      localStorage.setItem('formData', JSON.stringify(formData));
    }
  }, [formData]); // ✅ Only runs when formData changes

  if (!isClient) {
    return null; // ✅ Prevent rendering on the server
  }

  return (
    <div className=''>
      <HeadingDescription
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {Lookup.pricingOption.map((pricing, index) => (
          <div className='flex flex-col items-center p-5 border rounded-xl mt-5' key={index}>
            <Image
              src={pricing.icon}
              alt={pricing.title}
              width={60}
              height={60}
            />
            <h2 className='font-medium text-xl'>{pricing.title}</h2>

            {/* Features List */}
            <div className='mt-3'>
              <h3 className='font-semibold text-lg'>Features:</h3>
              <ul className='list-disc pl-5'>
                {pricing.features.map((feature, i) => (
                  <li key={i} className='text-gray-600'>{feature}</li>
                ))}
              </ul>
            </div>


                {user?
                <Link href={`/generate-logo?type=${pricing.title}`}>
                <Button className="mt-5">{pricing.button}</Button>
              </Link>
              
                :<SignInButton mode='modal' forceRedirectUrl={'/generate-logo?type='+pricing.title}>
                  <Button className="mt-5">{pricing.button}</Button>
                </SignInButton>
              }

            
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingModel;
