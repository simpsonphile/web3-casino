import { Client } from "colyseus.js";

class Remote {
  constructor({ address }) {
    this._client = new Client(import.meta.env.VITE_WEBSOCKET_URL);
    window.client = this._client;
    this._remote = {};
    this.address = address;
  }

  add(name, Class, data) {
    if (Object.hasOwn(this._remote, name)) {
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
    if (!Object.hasOwn(this._remote, property)) {
      console.error(`${property} does'nt exist in remote`);
      return;
    }
    return this._remote[property];
  }
}

export default Remote;
