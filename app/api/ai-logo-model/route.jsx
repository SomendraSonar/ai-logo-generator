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





import { NextResponse } from 'next/server';
import { AILogoPrompt } from '@/configs/AiModel';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';

export async function POST(req) {
    const { prompt, email, title, desc, type, userCredits } = await req.json();
    let base64ImageWithMime = '';

    try {
        // Generate AI Text Prompt for Logo
        const AiPromptResult = await AILogoPrompt.sendMessage(prompt);

        // Await text response and parse JSON
        const responseText = await AiPromptResult.response.text();
        const parsedResponse = JSON.parse(responseText);
        const AIPrompt = parsedResponse.prompt;

        console.log("Generated AI Prompt:", AIPrompt);

        // Send request to Hugging Face API
        if (type === 'Free') {
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA',
                { inputs: AIPrompt },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    responseType: "arraybuffer",
                    timeout: 300000 // Set timeout to 5 minutes (300,000 ms)
                }
            );

            const buffer = Buffer.from(response.data, "binary");
            const base64Image = buffer.toString("base64");
            base64ImageWithMime = `data:image/png;base64,${base64Image}`;
        } else {
            console.error("Error: Invalid type");
        }

        console.log("Generated Image:", base64ImageWithMime);

        try {
            await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
                image: base64ImageWithMime,
                title: title,
                desc: desc
            });
        } catch (e) {
            console.error("Firestore Error:", e);
        }

        return NextResponse.json({ image: base64ImageWithMime });
    } catch (e) {
        console.error("Error details:", e?.response?.data || e.message);
        return NextResponse.json({ error: e.message }, { status: e.response?.status || 500 });
    }
}