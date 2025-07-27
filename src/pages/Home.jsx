import React from "react";

function HomePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://www.stockvault.net/data/2016/11/20/216415/preview16.jpg')",
      }}
    >
      <h1 className="text-6xl font-extrabold mb-6 text-black text-center">
        Welcome to TaskMaster
      </h1>
      <p className="text-2xl text-black text-center max-w-3xl font-medium">
        Organize your projects, manage your tasks, and boost your productivity!
      </p>
    </main>
  );
}

export default HomePage;
