function ValidationMiddleware(req, res, next) {
  const { id, title, description } = req.body;

  if (req.path === '/issues' && req.method === 'POST') {
    if (!id || !title || !description) {
      return res.status(400).send('Invalid issue format');
    }
  }

  if (req.path.startsWith('/issues') && req.method === 'PUT') {
    if (!id || !title || !description) {
      return res.status(400).send('Invalid issue format');
    }
  }

  next();
}

module.exports = ValidationMiddleware;
