import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Save } from 'lucide-react';
import { jobAPI } from '../services/api';
import '../styles/global.css';

const AddJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    postProfile: '',
    postDesc: '',
    reqExperience: '',
    postTechStack: []
  });
  const [techInput, setTechInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.postTechStack.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        postTechStack: [...prev.postTechStack, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      postTechStack: prev.postTechStack.filter(tech => tech !== techToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.postProfile || !formData.postDesc || !formData.reqExperience) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const jobData = {
        ...formData,
        reqExperience: parseInt(formData.reqExperience)
      };

      await jobAPI.createJob(jobData);
      navigate('/', { state: { message: 'Job created successfully!' } });
    } catch (err) {
      setError('Failed to create job. Please try again.');
      console.error('Error creating job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech();
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-dark-green to-medium-green rounded-full flex items-center justify-center mr-4">
                <Plus size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Add New Job</h1>
            <p className="text-text-gray text-lg">Create a new job posting</p>
          </motion.div>

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => navigate('/')}
            className="flex items-center text-text-gray hover:text-white mb-6 transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Jobs
          </motion.button>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <form onSubmit={handleSubmit}>
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

              {/* Job Profile */}
              <div className="form-group">
                <label className="form-label">Job Profile *</label>
                <input
                  type="text"
                  name="postProfile"
                  value={formData.postProfile}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior React Developer"
                  className="form-input"
                  required
                />
              </div>

              {/* Job Description */}
              <div className="form-group">
                <label className="form-label">Job Description *</label>
                <textarea
                  name="postDesc"
                  value={formData.postDesc}
                  onChange={handleInputChange}
                  placeholder="Describe the job responsibilities and requirements..."
                  className="form-input form-textarea"
                  required
                />
              </div>

              {/* Required Experience */}
              <div className="form-group">
                <label className="form-label">Required Experience (years) *</label>
                <input
                  type="number"
                  name="reqExperience"
                  value={formData.reqExperience}
                  onChange={handleInputChange}
                  placeholder="e.g., 3"
                  min="0"
                  className="form-input"
                  required
                />
              </div>

              {/* Tech Stack */}
              <div className="form-group">
                <label className="form-label">Tech Stack</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., React, Node.js"
                    className="form-input flex-1"
                  />
                  <motion.button
                    type="button"
                    onClick={handleAddTech}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-secondary px-4"
                  >
                    Add
                  </motion.button>
                </div>
                
                {/* Tech Stack Tags */}
                {formData.postTechStack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.postTechStack.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center px-3 py-1 bg-dark-green text-white text-sm rounded-full"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(tech)}
                          className="ml-2 text-white hover:text-red-300 transition-colors"
                        >
                          ×
                        </button>
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6 border-t border-border-color">
                <motion.button
                  type="button"
                  onClick={() => navigate('/')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-secondary flex-1"
                  disabled={loading}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary flex-1 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Create Job
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;