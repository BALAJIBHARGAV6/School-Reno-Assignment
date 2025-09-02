'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

interface SchoolFormData {
  name: string;
  address: string;
  city: string;
  customCity?: string;
  state: string;
  contact: string;
  emailId: string;
  image: FileList;
}

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 
  'Pune', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Other'
];

const states = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 
  'Telangana', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Kerala'
];

export default function AddSchool() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showCustomCity, setShowCustomCity] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<SchoolFormData>();

  const watchImage = watch('image');
  const watchCity = watch('city');

  // Handle image preview
  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [watchImage]);

  // Handle custom city selection
  useEffect(() => {
    if (watchCity === 'Other') {
      setShowCustomCity(true);
    } else {
      setShowCustomCity(false);
      setValue('customCity', '');
    }
  }, [watchCity, setValue]);

  const onSubmit = async (data: SchoolFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city === 'Other' ? data.customCity || '' : data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('emailId', data.emailId);
      formData.append('image', data.image[0]);

      const response = await fetch('/api/addSchool', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('School added successfully!');
        reset();
        setImagePreview(null);
        setShowCustomCity(false);
      } else {
        throw new Error('Failed to add school');
      }
    } catch (error) {
      toast.error('Failed to add school. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Simple Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-3">
                <span className="text-3xl">🏛️</span>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Elite School System
                  </span>
                  <div className="text-sm text-gray-500 font-medium -mt-1">
                    Excellence in Education
                  </div>
                </div>
              </a>
            </div>
            
            <div className="flex items-center space-x-2">
              <a href="/">
                <div className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 backdrop-blur-md border border-gray-100 hover:border-gray-200">
                  <span className="text-lg">🏛️</span>
                  <span className="hidden sm:block">Home</span>
                </div>
              </a>
              <a href="/addSchool">
                <div className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
                  <span className="text-lg">✨</span>
                  <span className="hidden sm:block">Add School</span>
                </div>
              </a>
              <a href="/showSchools">
                <div className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 backdrop-blur-md border border-gray-100 hover:border-gray-200">
                  <span className="text-lg">📚</span>
                  <span className="hidden sm:block">View Schools</span>
                </div>
              </a>
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
        <Toaster position="top-right" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
              <span className="text-4xl text-white">✨</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent mb-4">
              Add New School
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Register a new educational institution with complete details and documentation
            </p>
          </motion.div>

          {/* Form Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200 p-8 md:p-10">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* School Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  School Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('name', { 
                    required: 'School name is required',
                    minLength: { value: 3, message: 'Name must be at least 3 characters' }
                  })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Enter school name"
                />
                {errors.name && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="mr-1">⚠️</span>
                    {errors.name.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('address', { required: 'Address is required' })}
                  rows={3}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 resize-none"
                  placeholder="Enter full address"
                />
                {errors.address && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="mr-1">⚠️</span>
                    {errors.address.message}
                  </motion.p>
                )}
              </motion.div>

              {/* City and State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('city', { required: 'City is required' })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900"
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors.city && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center"
                    >
                      <span className="mr-1">⚠️</span>
                      {errors.city.message}
                    </motion.p>
                  )}
                  
                  {/* Custom City Input */}
                  {showCustomCity && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3"
                    >
                      <input
                        {...register('customCity', { 
                          required: watchCity === 'Other' ? 'Please enter city name' : false 
                        })}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Enter city name"
                      />
                      {errors.customCity && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center"
                        >
                          <span className="mr-1">⚠️</span>
                          {errors.customCity.message}
                        </motion.p>
                      )}
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('state', { required: 'State is required' })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900"
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center"
                    >
                      <span className="mr-1">⚠️</span>
                      {errors.state.message}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Contact and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('contact', { 
                      required: 'Contact number is required',
                      pattern: { value: /^[0-9]{10}$/, message: 'Contact must be 10 digits' }
                    })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="10-digit contact number"
                  />
                  {errors.contact && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center"
                    >
                      <span className="mr-1">⚠️</span>
                      {errors.contact.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('emailId', { 
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
                    })}
                    type="email"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="school@example.com"
                  />
                  {errors.emailId && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center"
                    >
                      <span className="mr-1">⚠️</span>
                      {errors.emailId.message}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Image Upload */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  School Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white font-medium">Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="text-6xl text-gray-400 mb-4">📸</span>
                        <p className="mb-2 text-sm text-gray-600 font-medium">
                          <span>Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                      </div>
                    )}
                    <input
                      {...register('image', { required: 'Image is required' })}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.image && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="mr-1">⚠️</span>
                    {errors.image.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Adding School...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl">✨</span>
                      <span>Add School</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
