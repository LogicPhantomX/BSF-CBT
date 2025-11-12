
const path = require('path');
const fs = require('fs-extra');

const questionBankDir = path.join(__dirname, '..', 'questionBank');

async function ensureCourseFile(course) {
  await fs.ensureDir(questionBankDir);
  const file = path.join(questionBankDir, `${course}.json`);
  if (!(await fs.pathExists(file))) {
    await fs.writeFile(file, JSON.stringify([], null, 2));
  }
  return file;
}

async function readCourseQuestions(course) {
  const file = await ensureCourseFile(course);
  const data = await fs.readFile(file, 'utf-8');
  return data ? JSON.parse(data) : [];
}

async function writeCourseQuestions(course, questions) {
  const file = await ensureCourseFile(course);
  await fs.writeFile(file, JSON.stringify(questions, null, 2));
}

module.exports = { readCourseQuestions, writeCourseQuestions, questionBankDir };

