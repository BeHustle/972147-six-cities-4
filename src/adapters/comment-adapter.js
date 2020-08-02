export const commentAdapter = (comment) => ({
  id: comment.id,
  author: {
    name: comment.user.name,
    avatar: comment.user.avatar_url
  },
  text: comment.comment,
  rating: comment.rating,
  date: new Date(comment.date)
});
