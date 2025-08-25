import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signSession } from "@/app/lib/auth";

const Body = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(1, "Name is required").optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email, password, name } = Body.parse(json);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hash, name } });

    const token = signSession({ sub: user.id, email: user.email, name: user.name ?? undefined });

    const res = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
    }, { status: 201 });

    res.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err: unknown) {
    // Handle Zod validation errors specifically
    if (err instanceof z.ZodError) {
      const errors = err.issues.map(issue => {
        // Map field names to user-friendly labels
        const fieldMap: Record<string, string> = {
          email: "Email",
          password: "Password",
          name: "Name"
        };
        
        const pathKey = issue.path[0];
        const fieldName = typeof pathKey === 'string' ? fieldMap[pathKey] || pathKey : String(pathKey);
        return `${fieldName}: ${issue.message}`;
      });
      
      return NextResponse.json({ 
        error: errors.join(", ") 
      }, { status: 400 });
    }
    
    // Handle other errors
    const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
} 