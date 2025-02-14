const _ = require("lodash");

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    }, 0)

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    const authorCounts = _.countBy(blogs, 'author');    
    const topAuthor = _.maxBy(Object.keys(authorCounts), author => authorCounts[author]);
    return {
        author: topAuthor,
        blogs: authorCounts[topAuthor]
    }
}

const mostLikes = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, 'author');
    const likesByAuthor = _.mapValues(groupedBlogs, authorBlogs =>
        _.sumBy(authorBlogs, 'likes')
    );
    const topAuthor = _.maxBy(Object.keys(likesByAuthor), author => likesByAuthor[author]);
    return {
        author: topAuthor,
        likes: likesByAuthor[topAuthor]
    }
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}