const os = require('os');

class AppInfo {
  constructor(name, version, url) {
    this.name = name;
    this.version = version;
    this.url = url;
  }

  toString() {
    return `${this.name}/${this.version} (${this.url})`
  }
}

class Config {
  setbaseUrl(url) {
    this.baseURL = url;
    return this;
  }

  setTimeout(t) {
    this.timeout = t;
    return this;
  }

  setAccessId(id) {
    this.accessId = id;
    return this;
  }

  setSecretKey(key) {
    this.secretKey = key;
    return this;
  }

  setVersion(version) {
    this.version = version;
    return this;
  }


  setAppInfo(name, version, url) {
    this.appInfo = new AppInfo(name, version, url);
    return this;
  }

  headers() {
    return {
      "Content-Type": "application/json",
      "X-Payabbhi-Client-User-Agent": this.clientUserAgent(),
      "User-Agent": this.userAgent()
    };
  }

  userAgent() {
    return `Payabbhi/v1 NodeBindings/${this.version} ${this.appInfo}`;
  }

  uname() {
    return `${os.platform()} ${os.hostname()} ${os.release()} ${os.arch()}`;
  }

  clientUserAgent() {
    return JSON.stringify({
      "binding_version": this.version,
      "lang": "node.js",
      "lang_version": process.version,
      "publisher": "payabbhi",
      "uname": this.uname(),
      "application":this.appInfo
    });
  }
}

module.exports = Config;
