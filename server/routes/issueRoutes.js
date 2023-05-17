const express = require('express');

module.exports = function(issueService) {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    try {
      const issue = await issueService.create(req.body);
      res.status(201).json(issue);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      console.log(req.params.id);
      const issue = await issueService.read(req.params.id);
      res.status(200).json(issue);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const issue = await issueService.update(req.params.id, req.body);
      res.status(200).json(issue);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      await issueService.delete(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  });

  router.get('/', async (req, res, next) => {
    try {
      const issues = await issueService.list();
      res.status(200).json(issues);
    } catch (err) {
      next(err);
    }
  });

  return router;
};