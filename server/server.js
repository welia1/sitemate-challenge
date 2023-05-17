const express = require('express');
const bodyParser = require('body-parser');
const IssueService = require('services/issueService');
const logger = require('./logger');

const app = express();
const issueService = new IssueService();

app.use(bodyParser.json());

app.post('/issues', (req, res) => {
    const issue = issueService.create(req.body);
    res.status(201).json(issue);
});

app.get('/issues/:id', (req, res) => {
    const issue = issueService.get(req.params.id);
    if (!issue) {
        logger.error(`Issue not found: ${req.params.id}`);
        return res.status(404).send('Issue not found');
    }
    res.json(issue);
});

app.get('/issues', (req, res) => {
    const issues = issueService.getAll();
    res.json(issues);
});

app.put('/issues/:id', (req, res) => {
});

app.delete('/issues/:id', (req, res) => {
});

module.exports = app;
