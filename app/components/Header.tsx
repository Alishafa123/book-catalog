import Link from "next/link";
import { verifySession } from "@/lib/auth";


export default function Header() {
const session = verifySession(); // server-side read cookie
const user = session ? { email: session.email, name: session.name } : null;


return (
<header className="border-b">
<nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
<Link href="/" className="font-semibold">Book Catalog</Link>
<div className="flex items-center gap-3">
{user ? (
<form action="/api/auth/logout" method="post">
<span className="text-sm mr-2 hidden sm:inline">{user.name ?? user.email}</span>
<button className="rounded-md border px-3 py-1 text-sm">Logout</button>
</form>
) : (
<>
<Link className="rounded-md border px-3 py-1 text-sm" href="/auth/signin">Sign in</Link>
<Link className="rounded-md border px-3 py-1 text-sm" href="/auth/signup">Sign up</Link>
</>
)}
</div>
</nav>
</header>
);
}