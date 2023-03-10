const Newblog = ({ blog, setNewBlog, handleCreate }) => (

    <div>
        <h2>Create New Entry</h2>
        <form>
            <div>Title:<input type="text"
                value={blog.title}
                onChange={({ target }) => setNewBlog({ ...blog, title: target.value })} >
            </input>
            </div>
            <div>Author:<input type="text"
                value={blog.author}
                onChange={({ target }) => setNewBlog({ ...blog, author: target.value })}>
            </input>
            </div>
            <div>Url:<input type="text"
                value={blog.url}
                onChange={({ target }) => setNewBlog({ ...blog, url: target.value })}>
            </input>
            </div>

            <button onClick={handleCreate}>create</button>
        </form>
    </div>

)

export default Newblog