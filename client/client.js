const axios = require('axios');
const inquirer = require('inquirer');

const client = axios.create({
  baseURL: 'http://localhost:3000'
});

async function main() {
  const choices = [
    'Create an issue',
    'View an issue',
    'Update an issue',
    'Delete an issue',
    'View all issues',
    'Quit'
  ];

  while (true) {
    const { operation } = await inquirer.prompt([
      { type: 'list', name: 'operation', message: 'What do you want to do?', choices }
    ]);

    try {
      switch (operation) {
        case 'Create an issue':
          await createIssue();
          break;
        case 'View an issue':
          await viewIssue();
          break;
        case 'Update an issue':
          await updateIssue();
          break;
        case 'Delete an issue':
          await deleteIssue();
          break;
        case 'View all issues':
          await viewAllIssues();
          break;
        case 'Quit':
          process.exit(0);
      }
    } catch (err) {
      console.error(`Operation failed: ${err.message}`);
    }
  }
}

async function createIssue() {
  const { title, description } = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Issue title?' },
    { type: 'input', name: 'description', message: 'Issue description?' }
  ]);

  const response = await client.post('/issues', { title, description });
  console.log(`Created issue: ${response.data.id}`);
}

async function viewIssue() {
  const { id } = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'Issue ID?' }
  ]);

  const response = await client.get(`/issues/${id}`);
  console.log(response.data);
}

async function viewAllIssues() {
  const response = await client.get('/issues');
  console.log(response.data);
}

async function updateIssue() {
}

async function deleteIssue() {
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
