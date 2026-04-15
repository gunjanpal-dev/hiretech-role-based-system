import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import heroImage from "../images/hero.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
  });

  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { name, email, password, role } = form;

    const result = await dispatch(signupUser({ name, email, password, role }));

    if (signupUser.fulfilled.match(result)) {
      // ✅ Redirect to login page after successful signup
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main
        className="flex flex-grow w-full min-h-screen"
        style={{
          background: `linear-gradient(rgba(145, 85, 104, 0.85), rgba(93,0,30,0.85)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center w-1/2 px-16 text-[#E3E2DF]">
          <h1 className="text-5xl font-bold leading-tight">
            Start Your <span className="text-[#E3AFBC]">Career Journey</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-md">
            Join HireTech and connect with companies looking for talented
            developers, designers, and professionals like you.
          </p>

          <ul className="mt-8 space-y-3 text-[#E3AFBC]">
            <li>✔ Find top tech jobs</li>
            <li>✔ Connect with recruiters</li>
            <li>✔ Build your professional profile</li>
          </ul>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="flex items-center justify-center w-full md:w-1/2 px-6 py-10">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-10">
            <h2 className="text-3xl font-bold text-center text-[#E3E2DF]">
              Create Account
            </h2>

            <p className="text-center text-[#E3AFBC] mt-2">
              Join HireTech today
            </p>

            {loading && <Loader />}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#5D001E] focus:outline-none"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#5D001E] focus:outline-none"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#5D001E] focus:outline-none"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#5D001E] focus:outline-none"
                required
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#5D001E] focus:outline-none"
              >
                <option value="candidate">Candidate</option>
                <option value="recruiter">Recruiter</option>
              </select>

              <button
                type="submit"
                className="w-full py-3 bg-[#E3AFBC] text-[#5D001E] font-semibold rounded-lg hover:bg-[#E3E2DF] transition"
                disabled={loading}
              >
                Sign Up
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/40"></div>
              <span className="text-[#E3E2DF] text-sm">OR</span>
              <div className="flex-1 h-px bg-white/40"></div>
            </div>

            <p className="text-center text-[#E3E2DF] mt-6 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#E3AFBC] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;