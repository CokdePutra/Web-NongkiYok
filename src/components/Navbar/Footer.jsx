import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 w-full bottom-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tentang Section */}
          <div>
            <h2 className="text-lg font-bold uppercase mb-4 poppins-bold">
              Tentang Nongki Yok
            </h2>
            <p className="text-md leading-6 assistant-normal">
              Nongki Yok adalah platform yang membantu kamu menemukan tempat
              nongkrong seperti kedai kopi dan restoran yang asik dan nyaman di
              sekitarmu. Kami hadir untuk memberikan rekomendasi terbaik,
              lengkap dengan info lokasi, harga, dan suasana tempat.
            </p>
          </div>

          {/* Navigasi Section */}
          <div>
            <h2 className="text-lg font-bold uppercase mb-4 poppins-bold">
              Navigasi
            </h2>
            <ul className="space-y-2 text-md assistant-normal">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/map" className="hover:underline">
                  Map
                </a>
              </li>
              <li>
                <a href="/homecard" className="hover:underline">
                  List Lokasi
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak Section */}
          <div>
            <h2 className="text-lg font-bold uppercase mb-4 poppins-bold">
              Kontak
            </h2>
            <ul className="space-y-2 text-md assistant-normal">
              <li>
                <span className="font-bold">Email:</span>{" "}
                <a
                  href="mailto:support@nongkiyok.com"
                  className="hover:underline"
                >
                  support@nongkiyok.com
                </a>
              </li>
              <li>
                <span className="font-bold">Website:</span>{" "}
                <a
                  href="https://nongkiyok.com"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.nongkiyok.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm assistant-normal">
          <p>&copy; 2024 Nongki Yok. All Rights Reserved.</p>
          <p>
            Created with ❤️ by{" "}
            <a
              href="https://github.com/CokdePutra/Web-NongkiYok"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Nongki Yok Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
