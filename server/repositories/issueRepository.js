const fs = require('fs').promises;
const path = require('path');
const logger = require('../utils/logger');

class IssueRepository {
  constructor() {
    this.dataFilePath = path.resolve(__dirname, '../data/issues.json');
  }

  async readData() {
    try {
      const data = await fs.readFile(this.dataFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        // File not found, return empty data
        return { issues: [], nextId: 1 };
      } else {
        throw err;
      }
    }
  }

  async writeData(data) {
    await fs.writeFile(this.dataFilePath, JSON.stringify(data, null, 2));
  }

  async create(issue) {
    const data = await this.readData();
    issue.id = String(data.nextId++);
    data.issues.push(issue);
    await this.writeData(data);
    return issue;
  }

  async read(id) {
    const data = await this.readData();
    if (!data.issues || !Array.isArray(data.issues)) {
      throw new Error('Issue data not found');
    }
    const issue = data.issues.find(issue => issue.id === issueId);
    if (!issue) {
      throw new Error('Issue not found');
    }
    return issue;
  }

  async list() {
    const data = await this.readData();
    return data.issues;
  }

  async update(id, update) {
    const data = await this.readData();
    const issue = data.issues.find(issue => issue.id === id);
    if (!issue) {
      throw new Error('Issue not found');
    }
    Object.assign(issue, update);
    await this.writeData(data);
    return issue;
  }

  async delete(id) {
    const data = await this.readData();
    const index = data.issues.findIndex(issue => issue.id === id);
    if (index === -1) {
      throw new Error('Issue not found');
    }
    data.issues.splice(index, 1);
    await this.writeData(data);
  }
}

module.exports = IssueRepository;
