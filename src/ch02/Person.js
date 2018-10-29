exports.Person = class Person {
  constructor(firstName, lastName, ssn, birthYear = null, address = null) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._ssn = ssn;
    this._birthYear = birthYear;
    this._address = address;
  }

  get ssn() {
    return this._ssn;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(firstName) {
    this._firstName = firstName;
    return this;
  }

  get lastName() {
    return this._lastName;
  }

  get birthYear() {
    return this._birthYear;
  }

  get address() {
    return this._address;
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  set address(address) {
    this._address = address;
  }

  peopleInSameCountry(friends) {
    let result = [];

    friends.forEach(friend => {
      if (this.address.country === friend.address.country) {
        result.push(friend);
      }
    });

    return result;
  }
};
