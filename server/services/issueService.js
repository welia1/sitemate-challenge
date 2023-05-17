class IssueService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(issueData) {
    if (!issueData.title || !issueData.description) {
      throw new Error('Invalid issue data');
    }
    return this.repository.create(issueData);
  }

  async read(issueId) {
    if (!issueId) {
      throw new Error('Invalid issue ID');
    }
    return this.repository.read(issueId);
  }

  async update(issueId, updatedData) {
    if (!issueId || (!updatedData.title && !updatedData.description)) {
      throw new Error('Invalid issue data');
    }
    return this.repository.update(issueId, updatedData);
  }

  async delete(issueId) {
    if (!issueId) {
      throw new Error('Invalid issue ID');
    }
    return this.repository.delete(issueId);
  }

  async list() {
    return this.repository.list();
  }
}

module.exports = IssueService;
