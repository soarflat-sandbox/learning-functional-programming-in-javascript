exports.Address = class Address {
  constructor(country) {
    this._country = country;
  }

  get country() {
    return this._country;
  }
};
