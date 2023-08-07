// class CustomError extends Error {
//     constructor(statusCode, message, errors) {
//       super(message);
//       this.statusCode = statusCode;
//       this.errors = errors;
//     }
//   }
  
//   module.exports = CustomError;
  


const fs = require('fs');

class CustomError extends Error {
  constructor(statusCode, message, errors) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }

  logErrorToFile() {
    const errorLog = {
      timestamp: new Date().toISOString(),
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
    };

    // Convert the errorLog object to a string
    const errorLogString = JSON.stringify(errorLog, null, 2);

    // Choose the file path where you want to save the error log
    const filePath = './errorLog.txt';

    // Append the error log to the file
    fs.appendFile(filePath, errorLogString + '\n', (err) => {
      if (err) {
        console.error('Error writing to error log file:', err);
      }
    });
  }
}

module.exports = CustomError;
