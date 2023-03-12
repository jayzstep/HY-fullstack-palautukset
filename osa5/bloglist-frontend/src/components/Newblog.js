import { useState } from "react"


const Newblog = ({ handleCreate }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

    const addBlog = (event) => {
        event.preventDefault()
        handleCreate({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
            likes: 0

        })

        setNewBlog({ title: '', author: '', url: '' })
    }

    return (
    <div>
        <h2>Create New Entry</h2>
        <form onSubmit={addBlog}>
            <div>Title:<input type="text"
                value={newBlog.title}
                onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} >
            </input>
            </div>
            <div>Author:<input type="text"
                value={newBlog.author}
                onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}>
            </input>
            </div>
            <div>Url:<input type="text"
                value={newBlog.url}
                onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}>
            </input>
            </div>

            <button type="submit">create</button>
        </form>
    </div>
    )
}

export default Newblog