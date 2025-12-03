import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const showStatusModal = (message, status) => {
    setModalMessage(message);
    setSubmitStatus(status);
    setShowModal(true);
    
    // Auto-hide modal after 5 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        showStatusModal("Message sent successfully! I'll get back to you soon.", 'success');
      } else {
        console.error('Failed to send email:', result.error);
        showStatusModal("Failed to send message. Please try again or contact me directly at clarence11soriano@gmail.com", 'error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      showStatusModal("Network error. Please check your connection and try again.", 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-[#111827] to-[#0f172a] py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 font-oswald mb-6">
            Contact Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's start a conversation and create something amazing together.
          </p>
        </div>

        {/* Modal Dialog */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className={`p-8 rounded-t-2xl relative overflow-hidden`}>
                {/* Decorative gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${submitStatus === 'success' ? 'from-green-500/10 to-emerald-500/10' : 'from-red-500/10 to-pink-500/10'} rounded-t-2xl`}></div>
                
                <div className="relative z-10">
                  <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full ${submitStatus === 'success' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                    {submitStatus === 'success' ? (
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    )}
                  </div>
                  <h3 className={`text-xl font-bold text-center mb-4 ${submitStatus === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                    {submitStatus === 'success' ? 'Success!' : 'Error!'}
                  </h3>
                  <p className="text-gray-300 text-center leading-relaxed">{modalMessage}</p>
                </div>
              </div>
              <div className="bg-gray-800/50 px-6 py-4 rounded-b-2xl border-t border-gray-700">
                <button
                  type="button"
                  className={`w-full inline-flex justify-center rounded-xl border-2 shadow-lg px-6 py-3 text-base font-semibold text-white ${submitStatus === 'success' ? 'bg-green-600 border-green-500 hover:bg-green-700 hover:border-green-400 focus:ring-green-500' : 'bg-red-600 border-red-500 hover:bg-red-700 hover:border-red-400 focus:ring-red-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105`}
                  onClick={closeModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <form 
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border border-gray-700/50 p-10 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden" 
              onSubmit={handleSubmit}
            >
              {/* Form decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-t-3xl"></div>
              
              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-gray-200 font-semibold mb-3 text-lg">
                      Name
                      <span className="text-blue-400 ml-1">*</span>
                    </label>
                    <input
                      className="w-full p-4 bg-gray-800/60 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 outline-none hover:border-gray-500"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-200 font-semibold mb-3 text-lg">
                      Email
                      <span className="text-blue-400 ml-1">*</span>
                    </label>
                    <input
                      className="w-full p-4 bg-gray-800/60 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 outline-none hover:border-gray-500"
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-10">
                  <label className="block text-gray-200 font-semibold mb-3 text-lg">
                    Message
                    <span className="text-blue-400 ml-1">*</span>
                  </label>
                  <textarea
                    className="w-full p-4 bg-gray-800/60 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 outline-none resize-none hover:border-gray-500"
                    name="message"
                    placeholder="Tell me about your project, ideas, or just say hello! I'd love to hear from you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                  ></textarea>
                </div>
                
                <button
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white py-5 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-lg hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none disabled:hover:shadow-lg relative overflow-hidden group"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
                  
                  <div className="relative z-10 flex items-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                        Send Message
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;