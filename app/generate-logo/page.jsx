// "use client"
// import React, { useState,useContext } from 'react';
// import { UserDetailContex} from '../_context/UserDetailContext';
// import { useEffect } from 'react';
// // import Prompt from "@/utils/Prompt"; // Adjust the path as needed
// import Prompt from '../_data/Prompt';
// import axios from 'axios';
// import Image from 'next/image';
// import { useSearchParams } from 'next/navigation';
// import { DownloadIcon, LayoutDashboard, LoaderIcon } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// function GenerateLogo() {
//   const { userDetail, setuserDetail } = useContext(UserDetailContex);
//   const [formData, setFormData] = useState();
//   const[loading,setLoading]=useState(false);
//   const[logoImage,setLogoImage]=useState();

//   const searchParams = useSearchParams();
// const modelType = searchParams.get('type');

//   useEffect(() => {
//       if (typeof window != undefined && userDetail?.email) {
//           const storage = localStorage.getItem('formData');
//           if (storage) {
//               setFormData(JSON.parse(storage));
//               console.log(JSON.parse(storage));
//           }
//       }
//   }, [userDetail]);
//   useEffect(() => {
//     if (formData?.title) {
//         GenerateAILogo();
//     }
// }, [formData]);

//   const GenerateAILogo = async() => {
//     setLoading(true)
//     const PROMPT = Prompt.LOGO_PROMPT
//         .replace('{logoTitle}', formData?.title)
//         .replace('{logoDesc}', formData?.desc)
//         .replace('{logoColor}', formData.palette)
//         .replace('{logoDesign}', formData?.design?.title)
//         .replace('{logoPrompt}', formData?.design?.prompt);

//     console.log(PROMPT);



//     //generate logo prompt from ai
//     //genarte logo image

//     const result = await axios.post('/api/ai-logo-model', {
//       prompt: PROMPT,
//       email:userDetail?.email,
//       title:formData.title,
//       desc:formData.desc,
//       type:modelType,
//       userCredits:userDetail?.credits
//   });
//   console.log(result?.data);
//   setLogoImage(result.data?.image)
//   setLoading(false)
// }

// const onDownload=()=>{
//     console.log(logoImage)
//     const imageWindow= window.open ();
//     imageWindow.document.write(`<img src="${logoImage}" alt="base64Image"`)

// }

//     return (
//         <div>
//             <h2>{loading&&'Loading...'}</h2>
//             {!loading&&<Image src={logoImage} alt='logo' width={200} height={200} />}
//         </div>
//     );
// }

// export default GenerateLogo;




"use client"
import React, { useState, useContext, useEffect } from 'react';
import { UserDetailContex } from '../_context/UserDetailContext';
import Prompt from '../_data/Prompt';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

function GenerateLogo() {
    const { userDetail } = useContext(UserDetailContex);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [logoImage, setLogoImage] = useState(null);

    const searchParams = useSearchParams();
    const modelType = searchParams.get('type');

    useEffect(() => {
        if (typeof window !== "undefined" && userDetail?.email) {
            const storage = localStorage.getItem('formData');
            if (storage) {
                setFormData(JSON.parse(storage));
                console.log("Stored Form Data:", JSON.parse(storage));
            }
        }
    }, [userDetail]);

    useEffect(() => {
        if (formData?.title) {
            GenerateAILogo();
        }
    }, [formData]);

    const GenerateAILogo = async () => {
        if (!formData) return;
        
        setLoading(true);
        
        const PROMPT = Prompt.LOGO_PROMPT
            .replace('{logoTitle}', formData.title || '')
            .replace('{logoDesc}', formData.desc || '')
            .replace('{logoColor}', formData.palette || '')
            .replace('{logoDesign}', formData?.design?.title || '')
            .replace('{logoPrompt}', formData?.design?.prompt || '');

        console.log("Generated Prompt:", PROMPT);

        try {
            const result = await axios.post('/api/ai-logo-model', {
                prompt: PROMPT,
                email: userDetail?.email,
                title: formData.title,
                desc: formData.desc,
                type: modelType,
                userCredits: userDetail?.credits,
            });

            console.log("AI Response:", result?.data);
            setLogoImage(result.data?.image);
        } catch (error) {
            console.error("Error generating AI logo:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDownload = () => {
        if (!logoImage) return;
        const link = document.createElement("a");
        link.href = logoImage;
        link.download = "logo.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <h2>{loading ? 'Loading...' : 'Your Logo'}</h2>
            {!loading && logoImage && <Image src={logoImage} alt='logo' width={200} height={200} />}
            {!loading && logoImage && <Button onClick={onDownload}>Download</Button>}
        </div>
    );
}

export default GenerateLogo;