const Blog = ({ blog }) => (
  <div>
    {blog.title} <span><strong>{blog.author}</strong></span>
  </div>  
)

export default Blog