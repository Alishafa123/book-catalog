"use client";

import { useEffect, useState } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  genre?: string;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadBooks() {
    setLoading(true);
    const res = await fetch("/api/books");
    if (!res.ok) {
      setError("You must be logged in to view books.");
      setBooks([]);
    } else {
      setBooks(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function addBook(formData: FormData) {
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (res.ok) loadBooks();
  }

  async function deleteBook(id: string) {
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    loadBooks();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Books</h1>

      <form
        action={async (formData) => addBook(formData)}
        className="space-y-3 border p-4 rounded-md"
      >
        <input name="title" placeholder="Title" required className="w-full border rounded px-2 py-1" />
        <input name="author" placeholder="Author" required className="w-full border rounded px-2 py-1" />
        <input name="genre" placeholder="Genre (optional)" className="w-full border rounded px-2 py-1" />
        <button className="rounded-md bg-black px-3 py-2 text-white">Add Book</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ul className="space-y-2">
        {books.map((b) => (
          <li key={b.id} className="flex justify-between items-center border-b pb-1">
            <div>
              <strong>{b.title}</strong> by {b.author}
              {b.genre && <span className="text-sm text-gray-500"> ({b.genre})</span>}
            </div>
            <button
              onClick={() => deleteBook(b.id)}
              className="text-sm text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
