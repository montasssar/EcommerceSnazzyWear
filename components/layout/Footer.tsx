import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Snazzy Wear. Crafted with care by{' '}
        <a
          href="https://github.com/montasssar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:underline"
        >
          Montassar
        </a>
        .
      </div>
    </footer>
  );
}
