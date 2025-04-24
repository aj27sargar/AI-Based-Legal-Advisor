import React from 'react';
import { useLocation } from 'react-router-dom';

const BlogDetail = () => {
  const location = useLocation();
  const blog = location.state?.blog;

  if (!blog) {
    return <h2 style={styles.notFound}>Blog not found</h2>;
  }

  return (
    <div style={styles.blogDetailContainer}>
      <h1 style={styles.title}>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} style={styles.image} />
      <p style={styles.content}>{blog.content}</p>
      <p style={styles.content1}>{blog.content1}</p>
      <p style={styles.content1}>{blog.content2}</p>
      <p style={styles.content1}>{blog.content3}</p>
      <p style={styles.content1}>{blog.content4}</p>
      <p style={styles.content1}>{blog.content5}</p>
      <p style={styles.content1}>{blog.content6}</p>
      <p style={styles.content1}>{blog.content7}</p>
      <p style={styles.content1}>{blog.content8}</p>
      <p style={styles.content1}>{blog.content9}</p>
      <p style={styles.content1}>{blog.content10}</p>
      
      <p style={styles.author}>Author: {blog.author}</p>
      <p style={styles.content1}>{blog.content11}</p>
    </div>
  );
};

// Inline CSS styles
const styles = {
  blogDetailContainer: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '15px',
  },
  image: {
    width: '75%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
  },
    content: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'left',
    },
    content1: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'left',
    },
    content2: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'left',
    },
    content3: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'left',
    },
    content4: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'left',
    },
    content5: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'left',
    },
    content6: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'left',
    },
    content7: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'left',
    },
    content8: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'left',
    },
    content9: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'left',
    },
    content10: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#555',
      textAlign: 'left',
    },
  
  content11: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#555',
  },
  author: {
    fontSize: '1rem',
    color: '#888',
    marginTop: '15px',
  },
  notFound: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: 'red',
  },
};

export default BlogDetail;
