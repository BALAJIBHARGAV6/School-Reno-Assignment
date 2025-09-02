'use client';

import { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface SchoolModalProps {
  school: School | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SchoolModal({ school, isOpen, onClose }: SchoolModalProps) {
  if (!school) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
              className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative">
                <div className="w-full h-72 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                  {school.image ? (
                    <img
                      src={school.image}
                      alt={school.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-8xl text-blue-400">
                      🏫
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-full p-3 hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* School Name Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{school.name}</h2>
                  <div className="flex items-center space-x-4">
                    <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                      📍 {school.city}, {school.state}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                        <span className="text-2xl">📍</span>
                        <span>Location Details</span>
                      </h3>
                      <div className="bg-blue-50 rounded-2xl p-6 space-y-4">
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">Full Address</p>
                          <p className="text-gray-600 leading-relaxed">{school.address}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold text-gray-800 mb-1">City</p>
                            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                              🏙️ {school.city}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 mb-1">State</p>
                            <span className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                              🗺️ {school.state}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                        <span className="text-2xl">📞</span>
                        <span>Contact Information</span>
                      </h3>
                      <div className="bg-indigo-50 rounded-2xl p-6 space-y-4">
                        <div className="bg-white rounded-xl p-4 border border-gray-200">
                          <p className="font-semibold text-gray-800 mb-2">Phone Number</p>
                          <p className="text-gray-700 text-lg font-medium">{school.contact}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-200">
                          <p className="font-semibold text-gray-800 mb-2">Email Address</p>
                          <p className="text-gray-700 font-medium break-all">{school.email_id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`tel:${school.contact}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl font-semibold"
                  >
                    <span className="text-xl">📞</span>
                    <span>Call School</span>
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`mailto:${school.email_id}?subject=Inquiry about ${school.name}`}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl font-semibold"
                  >
                    <span className="text-xl">✉️</span>
                    <span>Send Email</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}
