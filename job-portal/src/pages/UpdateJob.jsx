import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const UpdateJob = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/jobs/${id}`).then(res => {
      const job = res.data;
      setData({
        ...job,
        postTechStack: job.postTechStack.join(', '),
      });
    });
  }, [id]);

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.put(`/jobs/${id}`, {
      ...data,
      postTechStack: data.postTechStack.split(',').map(s => s.trim()),
    });
    navigate('/');
  };

  if (!data) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>Update Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="postProfile" className="input" value={data.postProfile} onChange={handleChange} />
        <textarea name="postDesc" className="textarea" value={data.postDesc} onChange={handleChange}></textarea>
        <input name="reqExperience" className="input" type="number" value={data.reqExperience} onChange={handleChange} />
        <input name="postTechStack" className="input" value={data.postTechStack} onChange={handleChange} />
        <button className="button">Update</button>
      </form>
    </div>
  );
};

export default UpdateJob;
