import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../images/hero.jpeg";
import { loginUser } from "../redux/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // ✅ Cleaner handleChange
  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return;

    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main
        className="flex items-center justify-center flex-grow px-4"
        style={{
          background: `linear-gradient(rgba(145,85,104,0.85), rgba(93,0,30,0.8)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-[#E3E2DF]">
            Welcome Back
          </h2>
          <p className="text-center text-[#E3AFBC] mt-2">Login to continue to HireTech</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-[#E3E2DF] mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-white text-[#5D001E] focus:outline-none"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
            </div>

            <div>
              <label className="block text-sm text-[#E3E2DF] mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-white text-[#5D001E] focus:outline-none"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#E3AFBC] text-[#5D001E] font-semibold rounded-lg hover:bg-[#E3E2DF] transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-[#E3E2DF] mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#E3AFBC] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;