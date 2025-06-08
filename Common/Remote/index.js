import { Client } from "colyseus.js";

class Remote {
  constructor({ address, nickname, asGuest }) {
    this._client = new Client(import.meta.env.VITE_WEBSOCKET_URL);
    window.client = this._client;
    this._remote = {};
    this.address = address;
    this.nickname = nickname;
    this.asGuest = asGuest;
  }

  add(name, Class, data) {
    if (Object.hasOwn(this._remote, name)) {
      console.error(`${name} already exist in remote`);
      return;
    }

    console.log("add", this.asGuest, this.nickname);

    this._remote[name] = new Class({
      ...data,
      client: this._client,
      options: {
        address: this.address,
        asGuest: this.asGuest,
        nickname: this.nickname,
      },
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
