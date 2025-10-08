import { FieldValues } from "react-hook-form";

export default async function Register(data: FieldValues) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    if (!res?.ok) {
        console.error("User registration failed", await res.text())
    }
    return await res.json();
}

export async function Login(data: FieldValues) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        console.error("User logged succesfully", await res.text())
    };
    return await res.json()
}