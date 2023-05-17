// server.js

const express = require('express');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const winston = require('./utils/logger');
const issueRoutes = require('./routes/issueRoutes');
const IssueService = require('./services/issueService');
const IssueRepository = require('./repositories/issueRepository');
const errorMiddleware = require('./middleware/errorHandlerMiddleware');
const validationMiddleware = require('./middleware/validationMiddleware');

const app = express();
const issueRepository = new IssueRepository();
const issueService = new IssueService(issueRepository);

// Middleware
app.use(bodyParser.json());
// app.use(morgan('combined', { stream: winston.stream }));

// Validation middleware
app.use('/issues', validationMiddleware);

// Routes
app.use('/issues', issueRoutes(issueService));

// Error handling middleware
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
