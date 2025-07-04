import React from "react";
import { useNavigate } from "react-router";
import { FaMapMarkedAlt, FaLeaf, FaBell, FaRoad } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png"; // ✅ Import your logo

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // Redirect to your form page
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Navbar */}
  

      {/* Hero Section */}
     <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto max-w-6xl px-4 py-20 lg:py-28 text-center">
          {/* Logo */}
          <motion.img
            src={logo}
            alt="EcoRoute Logo"
            className="mx-auto w-40 h-40 mb-6 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Title & Tagline */}
          <motion.h1
            className="text-5xl lg:text-6xl font-extrabold text-green-800 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Smarter Routes. Greener Future.
          </motion.h1>
          <motion.p
            className="mt-4 text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Plan your journeys like never before. Get live weather, checkpoints,
            and CO₂ tracking — all in one place.
          </motion.p>

          {/* Get Started Button */}
          <motion.button
            onClick={handleGetStarted}
            className="btn btn-success btn-lg mt-8 px-10 py-3 rounded-full shadow-lg hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Features, Map, CTA, Footer (keep as is)... */}
    </div>
      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
            Why Choose EcoRoute?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                Icon: FaMapMarkedAlt,
                title: "Visualized Routes",
                desc: "Shortest routes with turn-by-turn directions and live maps."
              },
              {
                Icon: FaBell,
                title: "Custom Checkpoints",
                desc: "Set checkpoints & get notified on long trips."
              },
              {
                Icon: FaLeaf,
                title: "CO₂ Tracking",
                desc: "Know your carbon footprint & drive sustainably."
              },
              {
                Icon: FaRoad,
                title: "Live Weather",
                desc: "Get weather updates at every point along your route."
              }
            ].map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-green-50 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition"
              >
                <f.Icon className="text-green-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Summary */}
     <section className="bg-green-50 py-16">
  <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
    {/* Summary */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-5"
    >
      <h2 className="text-4xl font-bold text-green-700">
        All Your Trip Data At a Glance
      </h2>
      <p className="text-lg text-gray-700">
        Quickly view your total time, distance, CO₂ emissions, and get
        step-by-step directions with live weather updates.
      </p>
      <ul className="space-y-2 text-gray-600">
        <li>✅ Total Time, Distance & Emissions</li>
        <li>✅ Interactive Route with Checkpoints</li>
        <li>✅ Weather Insights at Every Stop</li>
      </ul>
    </motion.div>

    {/* Map */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
    >
      <iframe
        title="Route Map"
        src="https://www.openstreetmap.org/export/embed.html"
        className="w-full h-64 md:h-80 lg:h-72 rounded-xl border-2 border-green-300"
      ></iframe>
    </motion.div>
  </div>
</section>


      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-700 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold mb-4"
        >
          Ready to Plan Smarter?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 text-lg"
        >
          Join EcoRoute and make your journeys sustainable.
        </motion.p>
        <motion.button
          onClick={handleGetStarted}
          whileHover={{ scale: 1.05 }}
          className="btn btn-light btn-lg text-green-800 font-semibold rounded-full shadow-lg"
        >
          Get Started
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="footer p-6 bg-gray-100 text-center text-gray-600">
        <p>© 2025 EcoRoute. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
