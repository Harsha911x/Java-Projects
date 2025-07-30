import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const AddJob = () => {
  const [data, setData] = useState({
    postProfile: '',
    postDesc: '',
    reqExperience: '',
    postTechStack: '',
  });

  const navigate = useNavigate();

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post('/jobs', {
      ...data,
      postTechStack: data.postTechStack.split(',').map(s => s.trim()),
    });
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="postProfile" className="input" placeholder="Job Title" onChange={handleChange} />
        <textarea name="postDesc" className="textarea" placeholder="Description" onChange={handleChange}></textarea>
        <input name="reqExperience" className="input" placeholder="Experience" type="number" onChange={handleChange} />
        <input name="postTechStack" className="input" placeholder="Tech Stack (comma separated)" onChange={handleChange} />
        <button className="button">Submit</button>
      </form>
    </div>
  );
};

export default AddJob;
