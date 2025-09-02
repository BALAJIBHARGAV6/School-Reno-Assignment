'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  const [particles, setParticles] = useState<Array<{id: number, size: number, left: number, top: number, duration: number, delay: number}>>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Simple Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <span className="text-3xl">🏛️</span>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Elite School System
                  </span>
                  <div className="text-sm text-gray-500 font-medium -mt-1">
                    Excellence in Education
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link href="/">
                <div className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
                  <span className="text-lg">🏛️</span>
                  <span className="hidden sm:block">Home</span>
                </div>
              </Link>
              <Link href="/addSchool">
                <div className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 backdrop-blur-md border border-gray-100 hover:border-gray-200">
                  <span className="text-lg">✨</span>
                  <span className="hidden sm:block">Add School</span>
                </div>
              </Link>
              <Link href="/showSchools">
                <div className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 backdrop-blur-md border border-gray-100 hover:border-gray-200">
                  <span className="text-lg">📚</span>
                  <span className="hidden sm:block">View Schools</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Clean White Background with Subtle Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-slate-50"></div>
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.08),transparent_50%)]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.05),transparent_70%)]"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-blue-200/30 rounded-full"
            style={{
              width: particle.size + 'px',
              height: particle.size + 'px',
              left: particle.left + '%',
              top: particle.top + '%',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="mb-12"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 rounded-full blur-xl opacity-30 animate-pulse scale-125"></div>
              <div className="relative bg-white p-8 rounded-full shadow-xl border-2 border-gray-100">
                <span className="text-7xl">🏛️</span>
              </div>
            </div>
          </motion.div>
          
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-8xl font-bold mb-8 leading-tight"
          >
            <div className="mb-4">
              <span className="bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
                ELITE
              </span>
            </div>
            <div className="mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SCHOOL
              </span>
            </div>
            <div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SYSTEM
              </span>
            </div>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Experience the pinnacle of educational administration with our 
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-medium"> sophisticated platform </span>
            designed for excellence and elegance
          </motion.p>
        </motion.div>

        {/* Action Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto w-full"
        >
          {/* Add School Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -10 }}
            className="group"
          >
            <Link href="/addSchool">
              <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-gray-100 p-10 md:p-14 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-6 rounded-2xl w-fit shadow-lg">
                      <span className="text-5xl">✨</span>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-4xl font-bold text-gray-800 mb-6 group-hover:text-blue-700 transition-colors duration-300">
                    Add School
                  </h3>
                  
                  <p className="text-gray-600 mb-10 text-xl leading-relaxed">
                    Register prestigious educational institutions with comprehensive details, 
                    professional imagery, and complete administrative information.
                  </p>
                  
                  <motion.div
                    whileHover={{ x: 15 }}
                    className="flex items-center text-blue-600 font-bold text-xl group-hover:text-indigo-700 transition-colors duration-300"
                  >
                    <span>Create Institution</span>
                    <svg className="ml-4 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* View Schools Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -10 }}
            className="group"
          >
            <Link href="/showSchools">
              <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-gray-100 p-10 md:p-14 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                  >
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-2xl w-fit shadow-lg">
                      <span className="text-5xl">📚</span>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-4xl font-bold text-gray-800 mb-6 group-hover:text-indigo-700 transition-colors duration-300">
                    View Schools
                  </h3>
                  
                  <p className="text-gray-600 mb-10 text-xl leading-relaxed">
                    Browse and discover all registered educational institutions with 
                    advanced search capabilities and elegant filtering options.
                  </p>
                  
                  <motion.div
                    whileHover={{ x: 15 }}
                    className="flex items-center text-indigo-600 font-bold text-xl group-hover:text-purple-700 transition-colors duration-300"
                  >
                    <span>Explore Directory</span>
                    <svg className="ml-4 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-24 grid grid-cols-3 gap-12 max-w-5xl mx-auto"
        >
          {[
            { number: "1000+", label: "Elite Institutions", color: "from-blue-600 to-indigo-600" },
            { number: "100+", label: "Cities Covered", color: "from-indigo-600 to-purple-600" },
            { number: "99.9%", label: "Excellence Rate", color: "from-purple-600 to-pink-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center group cursor-default"
            >
              <div className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {stat.number}
              </div>
              <div className="text-gray-500 text-lg md:text-xl font-medium group-hover:text-gray-700 transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-3 bg-gray-50 backdrop-blur-md border border-gray-200 rounded-full px-8 py-4 shadow-lg">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-150"></div>
            </div>
            <span className="text-gray-700 font-medium text-lg">
            </span>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
