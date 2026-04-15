// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#5D001E] text-[#E3E2DF] py-6 mt-auto">
      <div className="px-6 text-center">
        
        <p className="text-sm">
          &copy; {new Date().getFullYear()} HireTech. All rights reserved.
        </p>

        <p className="mt-1 text-sm">
          Built with React, Tailwind & Redux
        </p>

        {/* Footer Links */}
        <div className="mt-3 flex justify-center space-x-6">
          <a
            href="#"
            className="text-[#E3E2DF] hover:text-[#E3AFBC] transition"
          >
            About
          </a>

          <a
            href="#"
            className="text-[#E3E2DF] hover:text-[#E3AFBC] transition"
          >
            Contact
          </a>

          <a
            href="#"
            className="text-[#E3E2DF] hover:text-[#E3AFBC] transition"
          >
            Privacy
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;