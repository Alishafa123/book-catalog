import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { verifySession } from "../../../lib/auth";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const book = await prisma.book.findUnique({ where: { id: params.id } });
  if (!book || book.userId !== session.sub) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.book.delete({ where: { id: params.id } });

  return NextResponse.json({ ok: true });
}
