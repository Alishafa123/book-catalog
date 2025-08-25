import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signSession } from "@/app/lib/auth";


const Body = z.object({
email: z.string().email(),
password: z.string().min(6),
});


export async function POST(req: Request) {
try {
const json = await req.json();
const { email, password } = Body.parse(json);


const user = await prisma.user.findUnique({ where: { email } });
if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });


const ok = await bcrypt.compare(password, user.password);
if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });


const token = signSession({ sub: user.id, email: user.email, name: user.name ?? undefined });


const res = NextResponse.json({
user: { id: user.id, email: user.email, name: user.name },
});


res.cookies.set("session", token, {
httpOnly: true,
sameSite: "lax",
secure: process.env.NODE_ENV === "production",
path: "/",
maxAge: 60 * 60 * 24 * 7,
});


return res;
} catch (err: unknown) {
const errorMessage = err instanceof Error ? err.message : "Invalid request";
return NextResponse.json({ error: errorMessage }, { status: 400 });
}
}