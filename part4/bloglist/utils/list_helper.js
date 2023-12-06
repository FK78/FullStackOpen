var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((acc, current) => {
        return acc + current.likes
    }, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return "Blog list is empty"
    }

    const favoriteBlog = blogs.reduce((acc, currentBlog) => acc.likes > currentBlog.likes ? acc : currentBlog)

    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return "Blog list is empty"
    }

    return authorWithMostBlogs = _.chain(blogs)
        .groupBy('author')
        .map((groups, author) => {
            return { author: author, blogs: groups.length }
        })
        .maxBy((obj) => obj.blogs)
        .value()
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return "Blog list is empty"
    }

    return authorWithMostLikes = _.chain(blogs)
        .groupBy('author')
        .map((groups, author) => {
            return {
                author: author, 
                likes: groups.reduce((acc, curr) => {
                    return (acc += curr.likes)
                }, 0),
            }
        })
        .maxBy((obj) => obj.likes)
        .value()
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}