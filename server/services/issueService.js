const IssueRepository = require('./repositories/issueRepository');

class IssueService {
  constructor() {
    this.repository = new IssueRepository();
  }

  create(issue) {
    // Add your business logic here
    return this.repository.create(issue);
  }

  get(id) {
    return this.repository.get(id);
  }

  getAll() {
    return this.repository.getAll();
  }

  update(id, issue) {
  }

  delete(id) {
  }
}

module.exports = IssueService;
