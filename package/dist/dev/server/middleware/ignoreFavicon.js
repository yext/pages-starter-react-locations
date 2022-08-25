const ignoreFavicon = (req, res, next) => {
  if (req.originalUrl.includes("favicon")) {
    res.status(204).end();
    return;
  }
  next();
};
export {
  ignoreFavicon
};
