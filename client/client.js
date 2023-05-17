// client.js

import inquirer from 'inquirer';
import axios from 'axios';
const baseUrl = 'http://localhost:3000/issues';

async function main() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: ['Create', 'Read', 'Update', 'Delete', 'List'],
    },
  ]);

  let id;
  switch (action) {
    case 'Create':
      const { title, description } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the title:' },
        { type: 'input', name: 'description', message: 'Enter the description:' },
      ]);
      await axios.post(baseUrl, { title, description });
      console.log('Issue created successfully');
      break;

    case 'Read':
      id = await getIssueId();
      const issue = await axios.get(`${baseUrl}/${id}`);
      console.log(issue.data);
      break;

    case 'Update':
      id = await getIssueId();
      const update = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the new title:' },
        { type: 'input', name: 'description', message: 'Enter the new description:' },
      ]);
      await axios.put(`${baseUrl}/${id}`, update);
      console.log('Issue updated successfully');
      break;

    case 'Delete':
      id = await getIssueId();
      await axios.delete(`${baseUrl}/${id}`);
      console.log('Issue deleted successfully');
      break;

    case 'List':
      const issues = await axios.get(baseUrl);
      console.log(issues.data);
      break;
  }
}

async function getIssueId() {
  const { id } = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'Enter the issue id:' },
  ]);
  return id;
}

main().catch(err => console.error(err));
