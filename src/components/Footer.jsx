import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white text-sm py-3 px-6 flex justify-between items-center">
      <span>© 2024 TaskMaster</span>
      <div className="space-x-4">
        <a href="#" className="hover:underline">Privacy</a>
        <a href="#" className="hover:underline">Terms</a>
      </div>
    </footer>
  );
}

export default Footer;
