const { ERROR, SUCCESS, WARNING } = require("./constants");

module.exports = {
  serverConnection: (serverConnection = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomNumber = Math.random() * (10 - 1) + 1;

        if (randomNumber === 5) {
          return resolve(WARNING);
        }

        randomNumber > 5 ? resolve(SUCCESS) : reject(ERROR);
      }, 2000);
    });
  }),
};
