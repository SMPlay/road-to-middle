const { serverConnection } = require("./server-connection");
const { WARNING } = require("./constants");

class Logger {
  constructor(config) {
    if (Logger.exists) {
      return Logger.instance;
    }

    Logger.instance = this;
    Logger.exists = true;
    this._config = config;
    this.connection = false;
  }

  _info(message) {
    console.log({ config: this._config, message });
    this.closeConnectionAtEndTime();
  }

  _warning(message) {
    console.log({ config: this._config, message });
    this.closeConnectionAtEndTime();
  }

  _error(message) {
    console.log({ config: this._config, message });
  }

  async openConnection() {
    try {
      const response = await serverConnection();
      this.connection = true;

      if (response === WARNING) {
        this._warning(response);
        return;
      }

      this._info(response);
    } catch (err) {
      this._error(err);
      this.closeConnection("Connection not established!");
    }
  }

  closeConnection(message) {
    this.connection = false;
    console.log(message);
  }

  closeConnectionAtEndTime() {
    setTimeout(() => {
      this.closeConnection("Timeout exceeded!");
    }, 10000);
  }
}

const config = {
  url: "www.myurl.com",
  email: "my.email@gmail.com",
  password: "123456",
};

const logger = new Logger(config);
logger.openConnection();
