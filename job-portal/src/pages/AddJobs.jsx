import { useEffect, useState } from 'react';
import API from '../api';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get('/jobs').then(res => setJobs(res.data));
  }, []);

  const handleDelete = id => {
    setJobs(jobs.filter(job => job.postId !== id));
  };

  return (
    <div className="container">
      <div className="header">
        <h1>All Jobs</h1>
        <Link to="/add"><button className="button">Add Job</button></Link>
      </div>
      {jobs.map(job => (
        <JobCard key={job.postId} job={job} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default AllJobs;
