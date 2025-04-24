import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogData from '../Blogs/blogs.json'; // Import JSON file

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBlogs(blogData); // Load blogs from JSON file
  }, []);

  const handleReadMore = (blog) => {
    navigate('/blog-detail', { state: { blog } });
  };

  return (
    <div style={styles.blogContainer}>
      <h1 style={styles.heading}>Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id} style={styles.blogCard}>
          <img src={blog.image} alt={blog.title} style={styles.blogImage} />
          <h2 style={styles.blogTitle}>{blog.title}</h2>
          <p style={styles.blogDescription}>{blog.description}</p>
          <button style={styles.blogButton} onClick={() => handleReadMore(blog)}>
            Read More
          </button>
        </div>
      ))}
    </div>
  );
};

// Inline CSS styles
const styles = {
  blogContainer: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  blogCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  blogImage: {
    width: '70%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  blogTitle: {
    fontSize: '1.5rem',
    margin: '10px 0',
    color: '#444',
  },
  blogDescription: {
    fontSize: '1rem',
    color: '#666',
  },
  blogButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
  },
};

export default Blogs;
