"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BookOpen, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <BookOpen className="w-8 h-8 text-blue-600" />
          BookCatalog
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {session?.user ? (
            <>
              <Link 
                href="/books" 
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                <BookOpen className="w-4 h-4" />
                My Library
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {session.user.name ?? session.user.email}
                  </span>
                </div>
                <button 
                  onClick={() => signOut()} 
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 font-medium transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href="/auth/signin" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup" 
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-4">
            {session?.user ? (
              <>
                <Link 
                  href="/books" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5" />
                  My Library
                </Link>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {session.user.name ?? session.user.email}
                      </p>
                      <p className="text-sm text-gray-500">Signed in</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }} 
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg text-center hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
