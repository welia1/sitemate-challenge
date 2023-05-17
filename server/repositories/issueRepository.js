const fs = require('fs');
const logger = require('./logger');

class IssueRepository {
  constructor() {
    this.issues = this.loadIssues();
  }

  loadIssues() {
    try {
      return JSON.parse(fs.readFileSync('issues.json'));
    } catch (err) {
      logger.error(`Issue not found: ${req.params.id}`);
      return {};
    }
  }

  saveIssues() {
    fs.writeFileSync('data/issues.json', JSON.stringify(this.issues));
  }

  create(issue) {
    this.issues[issue.id] = issue;
    this.saveIssues();
    return issue;
  }

  get(id) {
    return this.issues[id];
  }

  getAll() {
    return this.issues;
  }

  update(id, issue) {
  }

  delete(id) {
  }
}

module.exports = IssueRepository;
