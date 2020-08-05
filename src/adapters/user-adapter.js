export const userAdapter = (user) => ({
  img: user.avatar_url,
  email: user.email,
  name: user.name,
  isPro: user.is_pro
});
