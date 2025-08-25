import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


type JWTPayload = { sub: string; email: string; name?: string };


const SECRET = process.env.JWT_SECRET!;


export function signSession(payload: JWTPayload) {
return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}


export function verifySession(): JWTPayload | null {
const token = cookies().get("session")?.value;
if (!token) return null;
try {
return jwt.verify(token, SECRET) as JWTPayload;
} catch {
return null;
}
}