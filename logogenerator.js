const fs = require('fs');
const inquirer = require('inquirer');

async function getUserInput() {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (keyword or hexadecimal):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hexadecimal):',
    },
  ]);
  return userInput;
}

function generateSVG({ text, textColor, shape, shapeColor }) {
  const svgMarkup = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${shapeColor}"/>
      <${shape} width="100" height="100" fill="${textColor}"></${shape}>
      <text x="50%" y="50%" dy="0.35em" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;
  return svgMarkup;
}

function saveSVGToFile(svg, filename) {
  fs.writeFileSync(filename, svg);
  console.log(`Generated ${filename}`);
}

async function main() {
  try {
    const userInput = await getUserInput();
    const svgMarkup = generateSVG(userInput);
    saveSVGToFile(svgMarkup, 'logo.svg');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
