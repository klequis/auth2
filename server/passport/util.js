
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send(true);
  }
}

export default { isAuthenticated }
