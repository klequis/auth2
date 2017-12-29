
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/users/signin');
  }
}

export default { isAuthenticated }
