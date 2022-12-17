const dummy = (blogs) => {
    let num = 1
    return num
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikedBlog = blogs[0]
    blogs.forEach((blog) => {
        if (blog.likes > mostLikedBlog.likes) {
            mostLikedBlog = blog
        }
    })
    const mostLikedBlogEdited = {
        title: mostLikedBlog.title,
        author: mostLikedBlog.author,
        likes: mostLikedBlog.likes
    }
    return mostLikedBlogEdited
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}