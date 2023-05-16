# Node EDI Mapping

This project demonstrates a Node.js implementation for parsing and mapping EDI (Electronic Data Interchange) files to JSON format. It provides a command-line interface for processing EDI files and generating corresponding JSON output.

## Overview

The Node EDI Mapping code reads EDI files from the `inputFiles` directory, parses them, and maps the data to a JSON structure. The resulting JSON data is then written to output files in the `outputFiles` directory. Each output file is uniquely identified by appending a random UUID to the original EDI file name.

## Prerequisites

To run the Node EDI Mapping code, ensure you have the following installed:

- Node.js (https://nodejs.org)

## Getting Started

1. Clone the project repository:

```$ git clone [<repository_url>](https://github.com/AlejoCode/nodejsEdiMapperToJSON.git)```

2. Prepare your EDI files by placing them in the `inputFiles` directory.

3. Run the code:

```$ node index```

5. Check the `outputFiles` directory for the generated JSON files.

## Project Structure

The project directory contains the following files:

- `index.js`: The main entry point of the application.
- `edimapping.js`: Module that implements the EDI mapping logic.
- `inputFiles/`: Directory to place the input EDI files.
- `outputFiles/`: Directory where the generated JSON files will be saved.

## Customization

The `edimapping.js` file. This file contains the logic for parsing and mapping the EDI data. Adjust the code as needed to handle different EDI transaction types and map them to the desired JSON structure.
