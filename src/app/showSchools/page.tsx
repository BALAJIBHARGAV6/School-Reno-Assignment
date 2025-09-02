'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SchoolModal from '../../components/SchoolModal';

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  image: string;
  email_id: string;
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchSchools = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/getSchools');
      if (response.ok) {
        const data = await response.json();
        setSchools(data);
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const filterSchools = useCallback(() => {
    let filtered = schools;

    if (searchTerm) {
      filtered = filtered.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy !== 'all') {
      filtered = filtered.filter(school =>
        school.state.toLowerCase() === filterBy.toLowerCase()
      );
    }

    setFilteredSchools(filtered);
  }, [schools, searchTerm, filterBy]);

  useEffect(() => {
    filterSchools();
  }, [filterSchools]);

  const handleSchoolClick = (school: School) => {
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSchool(null);
  };

  const states = [...new Set(schools.map(school => school.state))];

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
                <div className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 backdrop-blur-md border border-gray-100 hover:border-gray-200">
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
                <div className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
                  <span className="text-lg">📚</span>
                  <span className="hidden sm:block">View Schools</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-50">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.05),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.05),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 py-12 px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
              <span className="text-4xl text-white">📚</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent mb-4">
              School Directory
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover educational institutions in your area and explore their offerings
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search schools by name, city, or state..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div className="md:w-48">
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900"
                  >
                    <option value="all">All States</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Found {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''}
              </div>
            </div>
          </motion.div>

          {/* Schools Grid */}
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading schools...</p>
              </div>
            ) : filteredSchools.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl text-gray-300 mb-4">🏫</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No schools found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchools.map((school, index) => (
                  <motion.div
                    key={school.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => handleSchoolClick(school)}
                    className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                      {school.image ? (
                        <img
                          src={school.image}
                          alt={school.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-6xl text-blue-400">
                          🏫
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {school.name}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="text-blue-500 mr-2">📍</span>
                          <span className="line-clamp-1">{school.address}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-blue-500 mr-2">🏙️</span>
                          <span>{school.city}, {school.state}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-blue-500 mr-2">📞</span>
                          <span>{school.contact}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* School Modal */}
        {isModalOpen && selectedSchool && (
          <SchoolModal
            school={selectedSchool}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
}
