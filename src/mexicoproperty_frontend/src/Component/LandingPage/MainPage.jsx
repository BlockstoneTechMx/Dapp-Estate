"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import swal from "sweetalert"; // Import SweetAlert
const images = [
  "/images/LandingPage/1M.webp",
  "/images/LandingPage/2M.webp",
  "/images/LandingPage/3M.webp",
  // Add more images as needed
];
import TestimonialCarousel from "../../Testimonial";
import ic from "ic0";
const ledger = ic("jqlpl-3aaaa-aaaap-anr2a-cai");

export default function Component() {
  const [openIndex, setOpenIndex] = useState(null);
  const [email, setEmail] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const generateRandomCode = () => {
    return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
  };

  const steps = [
    {
      name: "Register and Verify",
      description:
        "Sign up and complete a quick verification process to securely access BlockStone’s investment platform.",
      icon: (
        <svg
          className="w-8 h-8 text-white-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 12a4 4 0 10-8 0m8 0a4 4 0 11-8 0m8 0v1a4 4 0 01-8 0v-1m4 4v1m0 0a4 4 0 01-4-4h8a4 4 0 01-4 4z"
          />
        </svg>
      ),
    },
    {
      name: "Explore High-Value Properties",
      description:
        "Browse our curated selection of high-growth properties with rental income potential and price appreciation.",
      icon: (
        <svg
          className="w-8 h-8 text-white-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      name: "Invest from 1 Sq Meter",
      description:
        "Start investing in fractional properties, track returns, and build your portfolio—all in one platform.",
      icon: (
        <svg
          className="w-8 h-8 text-white-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c1.1046 0 2 .8954 2 2v8m-4 0v-8c0-1.1046.8954-2 2-2z"
          />
        </svg>
      ),
    },
  ];

  const faqs = [
    {
      question: "Why invest in real estate with BlockStone?",
      answer: `
        BlockStone provides accessible real estate investments starting from just 1 square meter.
        Our unique model allows investors to benefit from stable and appreciating assets with annual returns
        of 9% for property appreciation and 7.5% for rental income.`,
    },
    {
      question: "What services does BlockStone offer?",
      answer: `
        We manage the identification, acquisition, and development of high-potential properties. Our services
        also include financial management, ensuring our investors get maximum returns while minimizing risks.`,
    },
    {
      question: "How does BlockStone ensure transparency?",
      answer: `
        Through our app, investors have access to real-time updates on their investment status, returns,
        and other key metrics, ensuring a transparent and fluid communication experience.`,
    },
    {
      question: "What are the benefits of real estate investment in Mexico?",
      answer: `
        The Mexican real estate market has shown steady growth, with projected increases of up to 8% by 2030.
        Investing with BlockStone allows you to benefit from this stable, appreciating market with protections against inflation.`,
    },
  ];

  const featuredSnippets = [
    {
      title: "React Hooks Collection",
      description: "A set of custom React hooks for common use cases",
      language: "JavaScript",
      price: 0.5,
    },
    {
      title: "Python Data Structures",
      description: "Efficient implementations of various data structures",
      language: "Python",
      price: 0.75,
    },
    {
      title: "Vue.js State Management",
      description: "A lightweight state management solution for Vue.js",
      language: "JavaScript",
      price: 0.6,
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true); // Start loader

    try {
      const randomCode = generateRandomCode(); // Generate random 4-digit code
      const response = await ledger.call(
        "createContact",
        "",
        randomCode.toString(),
        formData.name,
        formData.email,
        formData.message,
        formData.title
      );
      console.log("contact Response:", response);
      if (response) {
        swal(
          "Success!",
          "Your form has been submitted successfully.",
          "success"
        );
        // Clear form fields after the alert
        setFormData({
          name: "",
          email: "",
          title: "",
          message: "",
        });
      }
    } catch (e) {
      console.log("Error making contact:", e);
    } finally {
      setLoading(false); // Stop loader
      console.log("Contact form finished");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log("Signed up with email:", email);
    setEmail("");
  };

  return (
    <main className="isolate">
      {/* Hero section */}
      <div className="relative pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mx-auto max-w-5xl text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Accessible Real Estate Investment with BlockStone
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                At BlockStone, we make real estate investment accessible to
                everyone. Invest in high-value, appreciating properties starting
                from 1 square meter, with an estimated annual return of 9% on
                property value and 7.5% rental income.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/market"
                  className="rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-transform"
                >
                  Start Investing
                </motion.a>
                <Link
                  to="/aboutus"
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors"
                >
                  Learn More <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="mt-16 flow-root sm:mt-24"
            >
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="/images/LandingPage/hero-image.png"
                  alt="BlockStone App Screenshot"
                  width={2432}
                  height={1042}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </motion.div> */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="mt-16 flow-root sm:mt-24"
            >
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 overflow-hidden relative h-[400px]">
                <AnimatePresence>
                  <motion.img
                    key={images[currentImage]}
                    src={images[currentImage]}
                    alt="BlockStone App Screenshot"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10 w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32"
        id="how-it-works"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wider">
              Invest with Confidence
            </h2>
            <p className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              How BlockStone Works
            </p>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Start your real estate investment journey with BlockStone. Follow
              these simple steps to take advantage of a high-growth, accessible
              market.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center text-center p-8 bg-white shadow-xl rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md mb-4 transform transition-transform duration-300 hover:rotate-12 hover:scale-110">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 hover:text-indigo-600">
                  {step.name}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      {/* Featured Snippets section */}
      <TestimonialCarousel/>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100"
        id="features"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-xl font-bold text-indigo-600 tracking-wide uppercase">
              Discover BlockStone
            </h2>
            <p className="mt-4 text-5xl font-extrabold text-gray-900 leading-tight">
              Empowering Accessible Real Estate Investment
            </p>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Join BlockStone and unlock opportunities to invest in high-growth
              properties. Start from as little as 1 square meter and enjoy
              annual returns on value and rental income.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
            {[
              {
                title: "Flexible Investments",
                content:
                  "Invest from just 1 square meter with no large capital requirements.",
                gradient: "from-green-400 to-blue-500",
              },
              {
                title: "Real-Time Transparency",
                content:
                  "Stay informed with clear, real-time updates on investment status.",
                gradient: "from-purple-400 to-indigo-600",
              },
              {
                title: "Managed Process",
                content:
                  "Benefit from expertly managed acquisition, development, and profit distribution.",
                gradient: "from-yellow-400 to-red-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className={`flex flex-col items-center p-8 text-center rounded-xl shadow-lg transform transition-transform hover:scale-105 bg-gradient-to-r ${item.gradient}`}
              >
                {/* <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md">
                  {item.icon}
                </div> */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Blog Preview section */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Latest from our Blog
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Stay updated with the latest trends, tips, and insights in the
              world of code snippets and blockchain technology.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                className="flex flex-col items-start justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative w-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={post.date} className="text-gray-500">
                      {post.date}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      {post.readTime}
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-indigo-600">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href="#">
                          <span className="absolute inset-0" />
                          {post.author}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-indigo-600 py-20"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start space-y-16 lg:space-y-0">
            {/* Contact Form */}
            <div className="w-full lg:w-1/2 space-y-10 p-8 bg-gradient-to-r from-purple-800 to-indigo-600 rounded-xl shadow-2xl">
              <h2 className="text-5xl font-bold text-white sm:text-6xl">
                Contact Us
              </h2>
              <p className="text-lg leading-8 text-indigo-200">
                We'd love to hear from you! Whether you have questions,
                feedback, or just want to connect, reach out to us here.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-white/10 px-5 py-4 text-white placeholder-indigo-300 shadow-md focus:ring-4 focus:ring-indigo-500 transition duration-200 sm:text-lg"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-white/10 px-5 py-4 text-white placeholder-indigo-300 shadow-md focus:ring-4 focus:ring-indigo-500 transition duration-200 sm:text-lg"
                />

                <input
                  type="text"
                  name="title"
                  placeholder="Subject"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-white/10 px-5 py-4 text-white placeholder-indigo-300 shadow-md focus:ring-4 focus:ring-indigo-500 transition duration-200 sm:text-lg"
                />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-white/10 px-5 py-4 text-white placeholder-indigo-300 shadow-md focus:ring-4 focus:ring-indigo-500 transition duration-200 sm:text-lg resize-none"
                />

                <motion.button
                  whileHover={!loading ? { scale: 1.05 } : {}}
                  whileTap={!loading ? { scale: 0.95 } : {}}
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-lg bg-indigo-600 px-5 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 ${
                    loading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "hover:bg-indigo-500 hover:shadow-2xl"
                  } focus:ring-4 focus:ring-indigo-500`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </div>

            {/* Social Media & Contact Information */}
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">
                  Contact Information
                </h3>
                <p className="text-indigo-200">support@yourwebsite.com</p>
                <p className="text-indigo-200">+1 (555) 123-4567</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">Follow Us</h3>
                <div className="flex items-center space-x-6 mt-2">
                  {[
                    {
                      platform: "facebook",
                      path: "M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z",
                    },
                    {
                      platform: "twitter",
                      path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                    },
                    {
                      platform: "linkedin",
                      path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 3a2 2 0 110 4 2 2 0 010-4z",
                    },
                    {
                      platform: "instagram",
                      path: "M12 2.2A9.8 9.8 0 002.2 12 9.8 9.8 0 0012 21.8 9.8 9.8 0 0021.8 12 9.8 9.8 0 0012 2.2zm0 17.3A7.5 7.5 0 114.5 12 7.5 7.5 0 0112 19.5zm4.5-10.8a1.1 1.1 0 100-2.3 1.1 1.1 0 000 2.3zm-4.5 1.2a4.3 4.3 0 100 8.5 4.3 4.3 0 000-8.5zm0 7a2.7 2.7 0 112.7-2.7 2.7 2.7 0 01-2.7 2.7z",
                    },
                  ].map(({ platform, path }) => (
                    <motion.a
                      key={platform}
                      href={`https://${platform}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      className="transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg transition-all duration-300">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d={path} />
                        </svg>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="faq"
        className="mx-auto my-32 max-w-7xl px-6 lg:px-8 py-16 bg-gradient-to-br from-indigo-200 to-blue-300 rounded-lg shadow-xl"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold leading-10 tracking-tight text-purple-700 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="p-6 flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <dt className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </dt>
                  {openIndex === index ? (
                    <ChevronUpIcon className="h-6 w-6 text-indigo-600" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6 text-indigo-600" />
                  )}
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: openIndex === index ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {openIndex === index && (
                    <dd className="p-6 text-base leading-7 text-gray-600 bg-indigo-50 rounded-b-lg">
                      {faq.answer}
                    </dd>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500"
      >
        <div className="mx-auto max-w-7xl py-20 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-16 shadow-xl sm:rounded-3xl sm:px-12 lg:flex lg:gap-x-20 lg:px-20 lg:py-24">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[60rem] w-[60rem] -translate-y-1/2 transform-gpu blur-2xl opacity-40 sm:left-full sm:-ml-60 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#enhancedGradient)"
                fillOpacity="0.3"
              />
              <defs>
                <radialGradient id="enhancedGradient">
                  <stop stopColor="#E94F8B" />
                  <stop offset={1} stopColor="#742DA8" />
                </radialGradient>
              </defs>
            </svg>
            <div className="max-w-md mx-auto text-center lg:mx-0 lg:flex-auto lg:text-left">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
              >
                Why Invest with BlockStone?
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-4 text-lg leading-8 text-gray-200"
              >
                At BlockStone, we make real estate investment accessible for
                everyone. With our platform, invest in properties starting from
                as little as 1 square meter. Enjoy a stable return with an
                estimated growth rate of 9% and additional rental income of
                7.5%.
              </motion.p>
              <div className="mt-8 flex items-center justify-center gap-x-6 lg:justify-start">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  href="/market"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-all duration-300 focus:ring-4 focus:ring-pink-400"
                >
                  Start Investing
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, color: "#F9A8D4" }}
                  href="/aboutus"
                  className="text-sm font-semibold leading-6 text-white hover:text-pink-300 transition-colors duration-300"
                >
                  Learn More <span aria-hidden="true">→</span>
                </motion.a>
              </div>
            </div>
            <div className="relative mt-16 h-60 lg:mt-0 lg:ml-10">
              <motion.img
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute left-0 top-0 w-[40rem] max-w-none rounded-lg shadow-lg ring-1 ring-white/10"
                src="/images/LandingPage/performance.webp"
                alt="App screenshot"
                width={1224}
                height={780}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
