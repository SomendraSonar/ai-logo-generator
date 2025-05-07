// import { NextResponse } from 'next/server';
// import { AILogoPrompt } from '@/configs/AiModel';
// import axios from 'axios';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '@/configs/FirebaseConfig';

// export async function POST(req) {
//     const { prompt,email,title,desc,type,userCredits} = await req.json();
//     let base64ImageWithMime='';

//     try {
//         // Generate AI Text Prompt for Logo
//         const AiPromptResult = await AILogoPrompt.sendMessage(prompt);

//         // Await text response and parse JSON
//         const responseText = await AiPromptResult.response.text();
//         const parsedResponse = JSON.parse(responseText);
//         const AIPrompt = parsedResponse.prompt;

//         console.log("Generated AI Prompt:", AIPrompt);

//         // Send request to Hugging Face API
//         if(type='Free')
//         {
//         const response = await axios.post(
//             'https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA',
//             { inputs: AIPrompt }, // Ensure correct payload structure
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`, // Fixed formatting
//                     "Content-Type": "application/json",
//                 },
//                 responseType: "arraybuffer",
//                 timeout: 300000 // Set timeout to 5 minutes (300,000 ms)
//             }
//         )
//         const buffer = Buffer.from(response.data, "binary");
//         const base64Image = buffer.toString("base64");
//         base64ImageWithMime = `data:image/png;base64,${base64Image}`;

// //         const docRef = doc(db, 'users', email)
// //         await updateDoc(docRef, {
// //              credits: Number(userCredits) - 1
// // })
//     }
//     else{
//         console.log("eror");
//     }

//         // Convert response to base64
//         // const buffer = Buffer.from(response.data, "binary");
//         // const base64Image = buffer.toString("base64");
//         // const base64ImageWithMime = `data:image/png;base64,${base64Image}`;

//         console.log("Generated Image:", base64ImageWithMime)

//         try {
//             await setDoc(doc(db,"users",email,"logos",date.now().toString()),{
//                 image:base64ImageWithMime,
//                 title:title,
//                 desc:desc
//             })
//         } 
//         catch (e) {
            
//         }




       

//         return NextResponse.json({ image: base64ImageWithMime });

//     } catch (e) {
//         console.error("Error details:", e?.response?.data || e.message);
//         return NextResponse.json({ error: e.message }, { status: e.response?.status || 500 });
//     }
// }








// it is stranger midflux lora module that not working now and i have to chaneg it now
// import { NextResponse } from 'next/server';
// import { AILogoPrompt } from '@/configs/AiModel';
// import axios from 'axios';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '@/configs/FirebaseConfig';

// export async function POST(req) {
//     const { prompt, email, title, desc, type, userCredits } = await req.json();
//     let base64ImageWithMime = '';

//     try {
//         // Generate AI Text Prompt for Logo
//         const AiPromptResult = await AILogoPrompt.sendMessage(prompt);

//         // Await text response and parse JSON
//         const responseText = await AiPromptResult.response.text();
//         const parsedResponse = JSON.parse(responseText);
//         const AIPrompt = parsedResponse.prompt;

//         console.log("Generated AI Prompt:", AIPrompt);

//         // Send request to Hugging Face API
//         if (type === 'Free') {
//             const response = await axios.post(
//                 'https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA',
//                 { inputs: AIPrompt },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
//                         "Content-Type": "application/json",
//                     },
//                     responseType: "arraybuffer",
//                     timeout: 300000 // Set timeout to 5 minutes (300,000 ms)
//                 }
//             );

//             const buffer = Buffer.from(response.data, "binary");
//             const base64Image = buffer.toString("base64");
//             base64ImageWithMime = `data:image/png;base64,${base64Image}`;
//         } else {
//             console.error("Error: Invalid type");
//         }

//         console.log("Generated Image:", base64ImageWithMime);

//         try {
//             await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
//                 image: base64ImageWithMime,
//                 title: title,
//                 desc: desc
//             });
//         } catch (e) {
//             console.error("Firestore Error:", e);
//         }

//         return NextResponse.json({ image: base64ImageWithMime });
//     } catch (e) {
//         console.error("Error details:", e?.response?.data || e.message);
//         return NextResponse.json({ error: e.message }, { status: e.response?.status || 500 });
//     }
// }







// now working with nebius stable diffusion xl base1.0

// import { NextResponse } from 'next/server';
// import { AILogoPrompt } from '@/configs/AiModel';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '@/configs/FirebaseConfig';

// export async function POST(req) {
//     const { prompt, email, title, desc, type, userCredits } = await req.json();
//     let base64ImageWithMime = '';

//     try {
//         // Step 1: Generate AI text prompt for logo
//         const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
//         const responseText = await AiPromptResult.response.text();
//         const parsedResponse = JSON.parse(responseText);
//         const AIPrompt = parsedResponse.prompt;

//         console.log("Generated AI Prompt:", AIPrompt);

//         // Step 2: Generate image using Nebius Stable Diffusion (sdxl) model
//         if (type === 'Free') {
//             const hfResponse = await fetch(
//                 'https://router.huggingface.co/nebius/v1/images/generations',
//                 {
//                     method: 'POST',
//                     headers: {
//                         Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         response_format: 'b64_json',
//                         prompt: AIPrompt,
//                         model: 'stability-ai/sdxl'
//                     })
//                 }
//             );

//             if (!hfResponse.ok) {
//                 const errorText = await hfResponse.text();
//                 throw new Error(`Hugging Face API Error: ${hfResponse.status} - ${errorText}`);
//             }

//             const hfJson = await hfResponse.json();

//             // Handle Hugging Face base64 JSON format
//             if (!hfJson.data || !hfJson.data[0]?.b64_json) {
//                 throw new Error("Invalid image response from API");
//             }

//             base64ImageWithMime = `data:image/png;base64,${hfJson.data[0].b64_json}`;
//         } else {
//             throw new Error("Only 'Free' type is supported at this time.");
//         }

//         console.log("Generated Image:", base64ImageWithMime.slice(0, 100) + "...");

//         // Step 3: Save the image to Firestore
//         try {
//             await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
//                 image: base64ImageWithMime,
//                 title,
//                 desc
//             });
//         } catch (firestoreError) {
//             console.error("Firestore Error:", firestoreError);
//         }

//         return NextResponse.json({ image: base64ImageWithMime });
//     } catch (e) {
//         console.error("Error details:", e?.message || e);
//         return NextResponse.json({ error: e.message || 'Unexpected error' }, { status: 500 });
//     }
// }









// NEW MODEL
import { NextResponse } from 'next/server';
import { AILogoPrompt } from '@/configs/AiModel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';

export async function POST(req) {
    const { prompt, email, title, desc, type, userCredits } = await req.json();
    let base64ImageWithMime = '';

    try {
        // Step 1: Generate AI text prompt for logo
        const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
        const responseText = await AiPromptResult.response.text();
        const parsedResponse = JSON.parse(responseText);
        const AIPrompt = parsedResponse.prompt;

        console.log("Generated AI Prompt:", AIPrompt);

        // Step 2: Generate image using Nebius Stable Diffusion (SDXL) model
        if (type === 'Free') {
            const hfResponse = await fetch(
                'https://router.huggingface.co/nebius/v1/images/generations',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        response_format: 'b64_json',
                        prompt: AIPrompt,
                        model: 'stability-ai/sdxl',
                    }),
                }
            );

            if (!hfResponse.ok) {
                const errorText = await hfResponse.text();
                throw new Error(`Hugging Face API Error: ${hfResponse.status} - ${errorText}`);
            }

            const hfJson = await hfResponse.json();

            // Handle Hugging Face base64 JSON format
            if (!hfJson.data || !hfJson.data[0]?.b64_json) {
                throw new Error("Invalid image response from API");
            }

            base64ImageWithMime = `data:image/png;base64,${hfJson.data[0].b64_json}`;
        } else {
            throw new Error("Only 'Free' type is supported at this time.");
        }

        console.log("Generated Image:", base64ImageWithMime.slice(0, 100) + "...");

        // Step 3: Save the image to Firestore
        try {
            await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
                image: base64ImageWithMime,
                title,
                desc,
            });
        } catch (firestoreError) {
            console.error("Firestore Error:", firestoreError);
        }

        return NextResponse.json({ image: base64ImageWithMime });
    } catch (e) {
        console.error("Error details:", e?.message || e);
        return NextResponse.json({ error: e.message || 'Unexpected error' }, { status: 500 });
    }
}
