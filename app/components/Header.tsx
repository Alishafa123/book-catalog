"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";


export default function Header() {
const { data: session } = useSession();


return (
<header className="border-b">
<nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
<Link href="/" className="font-semibold">Book Catalog</Link>
<div className="flex items-center gap-3">
{session?.user ? (
<>
<span className="text-sm mr-2 hidden sm:inline">{session.user.name ?? session.user.email}</span>
<button 
onClick={() => signOut()} 
className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
>
Logout
</button>
</>
) : (
<>
<Link className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50" href="/auth/signin">Sign in</Link>
<Link className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50" href="/auth/signup">Sign up</Link>
</>
)}
</div>
</nav>
</header>
);
}