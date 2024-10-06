import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="bg-[#111827] py-16">
      <h2 className="text-3xl font-bold text-center text-white">Contact Me</h2>
      <h3 className="font-bold text-center text-white">
        Wanna talk? Message me and I'll get back to you as soon as I can.
      </h3>

      {/* Adjust form container width */}
      <div className="flex justify-center mt-8 px-4">
        <form className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              className="w-full p-3 border rounded-lg"
              type="text"
              placeholder="Your name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              className="w-full p-3 border rounded-lg"
              type="email"
              placeholder="Your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Message
            </label>
            <textarea
              className="w-full p-3 border rounded-lg"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
