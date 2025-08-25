import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/nextauth";

// GET /api/books → list my books
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const books = await prisma.book.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(books);
}

// POST /api/books → create a book
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, author, genre } = await req.json();

  if (!title || !author) {
    return NextResponse.json({ error: "Title and author required" }, { status: 400 });
  }

  const book = await prisma.book.create({
    data: {
      title,
      author,
      genre,
      userId: session.user.id,
    },
  });

  return NextResponse.json(book, { status: 201 });
}
