const fs = require('fs');
const inquirer = require('inquirer');
const svgBuilder = require('svg-builder');

async function getUserInput() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter text for the logo:',
    },
    {
      type: 'list',
      name: 'color',
      message: 'Select a color:',
      choices: ['red', 'green', 'blue'],
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['square', 'circle', 'triangle'],
    },
  ]);
}
  function generateSVG({ color, shape, text }) {
    const shapeAttributes = {
      square: { width: 100, height: 100 },
      circle: { r: 50 },
      triangle: { points: '50,0 100,100 0,100' },
    };
  
    return `<svg width="200" height="200">
              <${shape} fill="${color}" ${Object.entries(shapeAttributes[shape]).map(([key, value]) => `${key}="${value}"`).join(' ')}></${shape}>
              <text x="50%" y="50%" dy="0.35em" text-anchor="middle" fill="white">${text}</text>
            </svg>`;
  }


function saveSVGToFile(svg, filename) {
  fs.writeFileSync(filename, svg);
  console.log(`SVG saved to ${filename}`);
}

async function main() {
  const userInput = await getUserInput();
  const svgMarkup = generateSVG(userInput);
  saveSVGToFile(svgMarkup, 'logo.svg');
}

main();
