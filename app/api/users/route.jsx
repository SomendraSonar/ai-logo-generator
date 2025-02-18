// import { db } from "@/configs/FirebaseConfig"
// import { doc, getDoc , setDoc} from "firebase/firestore"
// // import { NextResponse } from "next/server";
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//     const {userEmail, userName} = await req.json()
//     try {
//         // If user already exist
//         const docRef = doc(db, "users", userEmail);
//         const docSnap = await getDoc(docRef);

//         if(docSnap.exists()){
//             return NextResponse.json(docSnap.data())
//         }
//         else {
//             // Insert new User
//             const data = {
//                 name: userName,
//                 email: userEmail,
//                 credits: 5
//             }
//             await setDoc(doc(db, "users", userEmail), {
//                 ...data
//             })
//              return NextResponse.json(data)
//         }
//     }
//     catch(e) {
//     }
// }





// Rename this file to route.js (or route.ts if using TypeScript)
// app/api/users/route.js
import { db } from "@/configs/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userEmail, userName } = await req.json();

    if (!userEmail || !userName) {
      return NextResponse.json(
        { error: "Missing userEmail or userName" },
        { status: 400 }
      );
    }

    const userDocRef = doc(db, "users", userEmail);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return NextResponse.json(userDocSnap.data(), { status: 200 });
    } else {
      const data = {
        name: userName,
        email: userEmail,
        credits: 5,
      };
      await setDoc(doc(db, "users", userEmail), data);
      return NextResponse.json(data, { status: 201 });
    }
  } catch (error) {
    console.error("Error in POST /api/users:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
