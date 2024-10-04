import { Client } from "colyseus.js";

class Remote {
  constructor({ address }) {
    this._client = new Client("ws://localhost:2567");
    window.client = this._client;
    this._remote = {};
    this.address = address;
  }

  add(name, Class, data) {
    if (this._remote.hasOwnProperty(name)) {
      console.error(`${name} already exist in remote`);
      return;
    }

    this._remote[name] = new Class({
      ...data,
      client: this._client,
      address: this.address,
    });
  }

  get(property) {
    if (!this._remote.hasOwnProperty(property)) {
      console.error(`${property} does'nt exist in remote`);
      return;
    }
    return this._remote[property];
  }
}

export default Remote;
