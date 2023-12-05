const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((acc, current) => {
        return acc + current.likes
    }, 0)
    return sum
}

module.exports = {
    dummy,
    totalLikes
}