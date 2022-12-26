const dummy = (blogs) => {
    let num = 1
    return num
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}



const favoriteBlog = (blogs) => {
    if (blogs.length !== 0) {
        let mostLikedBlog = blogs[0]
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
    } else {
        const emptyObject = {
            title: '',
            author: '',
            likes: null
        }
        return emptyObject
    }

}



const mostBlogs = (blogs) => {
    if (blogs.length !== 0) {
        let authorBlogAmount = {}

        blogs.forEach(blog => {
            if (!authorBlogAmount[blog.author]) {
                authorBlogAmount[blog.author] = 1
            } else {
                authorBlogAmount[blog.author] += 1
            }
        })

        let mostBlogs = 0
        let authorWithMostBlogs = ''

        for (const [author, blogAmount] of Object.entries(authorBlogAmount)) {
            if (blogAmount > mostBlogs) {
                mostBlogs = blogAmount
                authorWithMostBlogs = author
            }
        }
        const authorWithMostBlogsEdited = {
            author: authorWithMostBlogs,
            blogs: mostBlogs
        }
        return authorWithMostBlogsEdited
    } else {
        const emptyObject = {
            author: '',
            blogs: null
        }
        return emptyObject
    }


}

const mostLikes = (blogs) => {

    if (blogs.length !== 0) {
        let authorsLikes = {}

        blogs.forEach((blog) => {
            if (!authorsLikes[blog.author]) {
                authorsLikes[blog.author] = blog.likes
            } else {
                authorsLikes[blog.author] += blog.likes
            }
        })

        let mostLikes = 0
        let mostLikedAuthor = ''

        for (const [author, likes] of Object.entries(authorsLikes)) {
            if (likes > mostLikes) {
                mostLikes = likes
                mostLikedAuthor = author
            }
        }

        const authorWithMostLikesEdited = {
            author: mostLikedAuthor,
            likes: mostLikes
        }

        return authorWithMostLikesEdited
    } else {
        emptyObject = {
            author: '',
            likes: null
        }
        return emptyObject
    }

}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}