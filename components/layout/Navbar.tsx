"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Cart } from "@/components/Cart";
import { useAuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { user, signOutUser } = useAuthContext();

  const toggleMobileMenu = () => setMobileMenuOpen((open) => !open);
  const toggleCart = () => setCartOpen((open) => !open);

  // Show Admin link only if user is admin email
  const isAdmin = user?.email === "montassar579@gmail.com";

  return (
    <>
      <nav className="bg-white shadow sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          {/* Logo and Title */}
          <Link
            href="/"
            className="flex items-center space-x-5 group transition-transform duration-300 ease-in-out hover:scale-110 focus:scale-110 focus:outline-none"
            aria-label="Snazzy Wear Home"
          >
            <Image
              src="/logo.png"
              alt="Snazzy Wear Logo"
              width={64}
              height={64}
              className="object-contain drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(219,39,119,0.7)] transition-shadow duration-500 ease-in-out"
              priority
            />
            <span className="text-4xl font-extrabold text-pink-600 tracking-wide select-none group-hover:text-pink-700 transition-colors duration-500 ease-in-out">
              Snazzy Wear
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-10 text-gray-700 font-semibold text-lg">
            <li>
              <Link href="/shop" className="relative px-1 py-1 hover:text-pink-600 transition">
                Shop
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 rounded opacity-0 hover:opacity-100 transition" />
              </Link>
            </li>
            <li>
              <Link href="/about" className="relative px-1 py-1 hover:text-pink-600 transition">
                About
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 rounded opacity-0 hover:opacity-100 transition" />
              </Link>
            </li>
            <li>
              <Link href="/contact" className="relative px-1 py-1 hover:text-pink-600 transition">
                Contact
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 rounded opacity-0 hover:opacity-100 transition" />
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link href="/admin" className="relative px-1 py-1 font-semibold text-pink-600 hover:text-pink-700 transition">
                  Admin
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-700 rounded opacity-0 hover:opacity-100 transition" />
                </Link>
              </li>
            )}
          </ul>

          {/* Cart & User Icons */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700">
            <button
              aria-label="Cart"
              className="relative hover:text-pink-600 transition text-2xl"
              onClick={toggleCart}
              style={{ padding: "8px" }}
            >
              🛒
              {/* Add cart badge here if needed */}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium truncate max-w-[160px]">{user.email}</span>
                <button
                  onClick={signOutUser}
                  className="hover:text-pink-600 transition px-3 py-1 rounded border border-pink-600 text-pink-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/register"
                className="hover:text-pink-600 transition px-3 py-1 rounded border border-pink-600 text-pink-600"
              >
                👤
              </Link>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <button
            className="md:hidden focus:outline-none text-3xl text-gray-700"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
            <ul className="flex flex-col space-y-4 px-8 py-6 text-gray-700 font-semibold text-lg">
              <li>
                <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block hover:text-pink-600 transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block hover:text-pink-600 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block hover:text-pink-600 transition">
                  Contact
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-pink-600 hover:text-pink-700 transition">
                    Admin
                  </Link>
                </li>
              )}
              <li className="flex space-x-6 pt-6 border-t border-gray-200 text-3xl justify-center">
                <button
                  aria-label="Cart"
                  className="hover:text-pink-600 transition"
                  onClick={() => {
                    toggleCart();
                    setMobileMenuOpen(false);
                  }}
                >
                  🛒
                </button>

                {user ? (
                  <button
                    aria-label="Logout"
                    className="hover:text-pink-600 transition"
                    onClick={() => {
                      signOutUser();
                      setMobileMenuOpen(false);
                    }}
                  >
                    🚪
                  </button>
                ) : (
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-pink-600 transition"
                    aria-label="Register or Sign In"
                  >
                    👤
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>

      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
}
