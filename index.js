const fs = require('fs');
const path = require('path');
const parseEDIFile = require('./edimapping');

const inputDirectory = path.join(__dirname, 'inputFiles');
const outputDirectory = path.join(__dirname, 'outputFiles');

function generateRandomId() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

function main() {
  try {
    const files = fs.readdirSync(inputDirectory);
    files.forEach((filename) => {
      if (path.extname(filename) === '.edi') {
        const inputFilePath = path.join(inputDirectory, filename);
        const ediData = fs.readFileSync(inputFilePath, 'utf8');
        const parsedData = parseEDIFile(ediData);

        // Generate random ID
        const randomId = generateRandomId();
        const outputFileName = `${path.basename(filename, '.edi')}_${randomId}.edi`;
        const outputFilePath = path.join(outputDirectory, outputFileName);

        // Write parsed data to output file
        fs.writeFileSync(outputFilePath, JSON.stringify(parsedData, null, 2));

        console.log(`File processed: ${filename}`);
        console.log(`Output file created: ${outputFileName}`);

        // Delete the input file
        fs.unlinkSync(inputFilePath);
        console.log(`Input file deleted: ${filename}`);
      }
    });
  } catch (error) {
    console.error('Error processing files:', error.message);
  }
}

main();