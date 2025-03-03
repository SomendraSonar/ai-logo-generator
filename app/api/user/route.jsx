import { db } from "@/configs/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
    console.log("Received POST request"); // Logging

    try {
        const { userEmail, userName } = await req.json();
        console.log("Request data:", userEmail, userName); // Logging

        if (!userEmail || !userName) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        // Check if user already exists
        const docRef = doc(db, "users", userEmail);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return NextResponse.json(docSnap.data(), { status: 200 });
        } else {
            // Insert new user
            const data = {
                name: userName,
                email: userEmail,
                credits: 5,
            };

            await setDoc(docRef, data);
            return NextResponse.json(data, { status: 201 });
        }
    } catch (error) {
        console.error("Error in POST /api/user:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
