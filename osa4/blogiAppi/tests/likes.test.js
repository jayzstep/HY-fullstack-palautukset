const blogHelper = require('../utils/blog_helper')

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

test('dummy returns one', () => {
    const result = blogHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {


    test('of empty list is zero', () => {
        const result = blogHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = blogHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test('of a bigger list is calculated correctly', () => {
        const result = blogHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('blog with most likes', () => {

    test ('empty list gives an empty object in correct format', () => {
        const result = blogHelper.favoriteBlog([])
        expect(result).toEqual({
            title: '',
            author: '',
            likes: null
        })
    })

    test('when list has only one blog, equals that', () => {
        const result = blogHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of a bigger list is returned correctly', () => {
        const result = blogHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })
})

describe('Author with most blogs', () => {
    test('empty list gives an empty object in correct format', () => {
        const result = blogHelper.mostBlogs([])
        expect(result).toEqual({
            author: '',
            blogs: null
        })
    
    })

    test('list with one blog returns that author', () => {
        const result = blogHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('list with many blogs returns the correct top author and amount of blogs', () => {
        const result = blogHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

describe('Author with most likes', () => {

    test('empty list gives an empty object in correct format', () => {
        const result = blogHelper.mostLikes([])
        expect(result).toEqual({
            author: '',
            likes: null
        })
    
    })

    test('list with one blogs returns that author and likes', () => {
        const result = blogHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })



    test('list with many blogs returns correct author and amount', () => {
        const result = blogHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})