

const dummy = (blogs) => {
    return(1)
}

const totalLikes = (listWithBlogs) => {
    const likeList = listWithBlogs.map(likes => likes.likes )
    const addition = (res, cur) => res + cur;

    let total = likeList.reduce(addition)

    return(total)
}

const favouriteBlog = (listWithBlogs) => {
    const likeList = listWithBlogs.map(likes => likes.likes)
    let mostLikedBlog = listWithBlogs.filter(like => like.likes === Math.max(...likeList))
    return (mostLikedBlog)
}

module.exports = {dummy, totalLikes, favouriteBlog}