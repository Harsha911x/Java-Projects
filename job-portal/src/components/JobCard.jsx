import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api';

const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    await API.delete(`/jobs/${job.postId}`);
    onDelete(job.postId);
  };

  return (
    <motion.div className="card" whileHover={{ scale: 1.02 }}>
      <h2>{job.postProfile}</h2>
      <p>{job.postDesc}</p>
      <p><strong>Experience:</strong> {job.reqExperience} yrs</p>
      <p><strong>Tech Stack:</strong> {job.postTechStack.join(', ')}</p>
      <div style={{ marginTop: '1rem' }}>
        <button className="button" onClick={handleDelete}>Delete</button>{' '}
        <button className="button" onClick={() => navigate(`/update/${job.postId}`)}>Update</button>
      </div>
    </motion.div>
  );
};

export default JobCard;
