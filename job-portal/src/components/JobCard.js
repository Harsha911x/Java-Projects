import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Calendar, Code, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate('/update-job', { state: { job } });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      onDelete(job.postId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="card"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{job.postProfile}</h3>
          <div className="flex items-center text-text-light-gray text-sm mb-2">
            <Calendar size={16} className="mr-1" />
            <span>Experience: {job.reqExperience} years</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpdate}
            className="btn btn-secondary p-2"
            title="Update Job"
          >
            <Edit size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="btn btn-danger p-2"
            title="Delete Job"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-text-gray leading-relaxed">{job.postDesc}</p>
      </div>

      {job.postTechStack && job.postTechStack.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Code size={16} className="mr-2 text-dark-green" />
            <span className="text-text-gray font-medium">Tech Stack:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.postTechStack.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1 bg-dark-green text-white text-xs rounded-full font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-border-color">
        <div className="flex items-center text-text-light-gray text-sm">
          <MapPin size={16} className="mr-1" />
          <span>Job ID: {job.postId}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpdate}
          className="btn btn-primary"
        >
          Update Job
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobCard;