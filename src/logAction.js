const { LogMessage } = require('../constants');
const fs = require('fs');
const successLogPath = '../log/successLog.txt';
const errorLogPath = '../log/errorLog.txt';
const notModifiedLogPath = '../log/notModifiedLog.txt';
const blockErrorLogPath = '../log/blockErrorLog.txt';
const connectionErrorLogPath = '../log/connectionErrorLog.txt';

function writeLog(path, msg) {
  fs.appendFile(path, msg + '\n', (err) => {
    if (err) console.log(err);
  });
}

function writeSuccessLog(contractAddress, tokenId, state, { modifiedCount, matchedCount }) {
  if (matchedCount === 0) {
    writeLog(notModifiedLogPath, LogMessage.itemNotMatched(state, contractAddress, tokenId));
    return;
  }
  if (modifiedCount === 1) {
    writeLog(successLogPath, LogMessage.itemSuccess(state, contractAddress, tokenId));
    return;
  }
  if (modifiedCount === 0) {
    writeLog(notModifiedLogPath, LogMessage.itemNotModified(state, contractAddress, tokenId));
    return;
  }
}
function writeErrorLogUpdateDB(error, chain) {
  writeLog(errorLogPath, LogMessage.mongoDbUpdateError(error, chain));
}

function writeErrorLogSubscribe(error, chain) {
  writeLog(blockErrorLogPath, LogMessage.subscribeError(error, chain));
}

function writeErrorLogConnection(error, chain) {
  writeLog(connectionErrorLogPath, LogMessage.connecntionError(error, chain));
}

module.exports = {
  writeSuccessLog,
  writeErrorLogUpdateDB,
  writeErrorLogSubscribe,
  writeErrorLogConnection,
};
