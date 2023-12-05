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
    if (blogs.length === 0){
        return "Blog list is empty"
    }

    const favoriteBlog = blogs.reduce((acc, currentBlog) => acc.likes > currentBlog.likes ? acc : currentBlog)
    
    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}