import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Briefcase, Search, Filter } from 'lucide-react';
import JobCard from '../components/JobCard';
import SuccessMessage from '../components/SuccessMessage';
import { jobAPI } from '../services/api';
import '../styles/global.css';

const AllJobs = () => {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExperience, setFilterExperience] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getAllJobs();
      setJobs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await jobAPI.deleteJob(jobId);
      setJobs(jobs.filter(job => job.postId !== jobId));
    } catch (err) {
      setError('Failed to delete job. Please try again.');
      console.error('Error deleting job:', err);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.postProfile.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.postDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExperience = !filterExperience || job.reqExperience >= parseInt(filterExperience);
    return matchesSearch && matchesExperience;
  });

  if (loading) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="spinner"></div>
              <p className="text-text-gray mt-4">Loading jobs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-dark-green to-medium-green rounded-full flex items-center justify-center mr-4">
              <Briefcase size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">All Jobs</h1>
          <p className="text-text-gray text-lg">Discover amazing opportunities</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-secondary-black rounded-lg p-6 mb-8 border border-border-color"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light-gray" />
              <input
                type="text"
                placeholder="Search jobs by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            <div className="relative">
              <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light-gray" />
              <select
                value={filterExperience}
                onChange={(e) => setFilterExperience(e.target.value)}
                className="form-input pl-10"
              >
                <option value="">All Experience Levels</option>
                <option value="0">0+ years</option>
                <option value="1">1+ years</option>
                <option value="2">2+ years</option>
                <option value="3">3+ years</option>
                <option value="5">5+ years</option>
                <option value="10">10+ years</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-900 border border-red-700 text-white p-4 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-secondary-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={48} className="text-text-light-gray" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
            <p className="text-text-gray">
              {searchTerm || filterExperience 
                ? 'Try adjusting your search or filter criteria.'
                : 'No jobs available at the moment.'
              }
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.postId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <JobCard job={job} onDelete={handleDelete} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Results Count */}
        {filteredJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-8 text-text-gray"
          >
            Showing {filteredJobs.length} of {jobs.length} jobs
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;