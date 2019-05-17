const lodash = require ('lodash')

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

const mostBlogs = (listWithBlogs) => {
    const listAuthors = listWithBlogs.map(author => author.author)
    console.log(listAuthors)
    const countBlogs = lodash.countBy(listAuthors)
    console.log(countBlogs)
    const mostBlogs = countBlogs.forEach()
    
    console.log(mostBlogs)


    const list = listWithBlogs.map(o => new Object({author: o.author, blogs:countBlogs }))
    return(list)
}

module.exports = {dummy, totalLikes, favouriteBlog, mostBlogs}