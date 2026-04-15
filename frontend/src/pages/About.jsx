import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#FDE2E4]/70 via-[#F7F5F2]/70 to-[#E3AFBC]/70 text-[#5D001E]">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow px-6 py-16 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#7A1C3C] drop-shadow-lg text-center">
          About HireTech
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-3xl text-center text-[#5D001E]/90 leading-relaxed">
          HireTech is your trusted platform for connecting talented professionals
          with top technical job opportunities. Whether you're a candidate looking
          for your dream role or a recruiter seeking skilled talent, HireTech is
          here to simplify the journey.
        </p>

        {/* Mission Section */}
        <div className="mt-16 max-w-5xl w-full grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-[#7A1C3C]">Our Mission</h2>
            <p className="text-[#5D001E]/90 text-lg leading-relaxed">
              At HireTech, our mission is to empower individuals seeking
              technical jobs by providing them with a seamless platform to
              discover, apply, and track opportunities. We bridge the gap
              between talent and recruiters, making career growth accessible
              and effortless.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-[#7A1C3C]">Our Vision</h2>
            <p className="text-[#5D001E]/90 text-lg leading-relaxed">
              We envision a world where every technical professional has access
              to the right opportunities, and every recruiter finds the perfect
              fit for their roles. HireTech is committed to creating meaningful
              connections that drive growth, learning, and innovation.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-5xl w-full grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold mb-2 text-[#7A1C3C]">For Candidates</h3>
            <p className="text-[#5D001E]/90">
              Explore thousands of technical job listings, apply directly, and
              track your applications in one place.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold mb-2 text-[#7A1C3C]">For Recruiters</h3>
            <p className="text-[#5D001E]/90">
              Post jobs easily, manage applications, and connect with qualified
              candidates efficiently and effectively.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold mb-2 text-[#7A1C3C]">Seamless Experience</h3>
            <p className="text-[#5D001E]/90">
              HireTech offers a user-friendly interface, real-time updates, and
              smart filters to make your job search or recruitment process
              smoother than ever.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 flex flex-col items-center text-center gap-6">
          <h2 className="text-4xl font-bold text-[#7A1C3C]">Ready to Get Started?</h2>
          <p className="text-[#5D001E]/90 max-w-2xl leading-relaxed">
            Join HireTech today and take the next step in your career or
            recruitment journey. Discover, connect, and grow.
          </p>
          <button
            onClick={() => window.location.href = "/jobs"}
            className="mt-4 px-6 py-3 bg-[#E3AFBC] text-[#5D001E] font-semibold rounded-lg hover:bg-[#F7F5F2] transition shadow-lg"
          >
            Explore Jobs
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;