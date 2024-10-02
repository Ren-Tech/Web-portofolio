import React from "react";

const Home = () => {
  return (
    <section className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-gray-800">Hi, I'm Clarence</h1>
      <p className="text-xl mt-4 text-gray-600">
        A passionate Mobile and Web Application Developer
      </p>
      <a
        href="#projects"
        className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg"
      >
        See My Work
      </a>
    </section>
  );
};

export default Home;
