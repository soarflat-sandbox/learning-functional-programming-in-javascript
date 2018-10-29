const Person = require('./Person.js').Person;

exports.Student = class Student extends Person {
  constructor(
    firstName,
    lastName,
    ssn,
    school,
    birthYear = null,
    address = null
  ) {
    super(firstName, lastName, ssn, birthYear, address);
    this._school = school;
  }

  get school() {
    return this._school;
  }

  studentsInSameCountryAndSchool(friends) {
    const closeFriends = super.peopleInSameCountry(friends);
    let result = [];

    closeFriends.forEach(friend => {
      if (this.school === friend.school) {
        result.push(friend);
      }
    });

    return result;
  }
};
