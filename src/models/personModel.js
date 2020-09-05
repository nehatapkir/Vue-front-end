export default class Person {
constructor(personId,firstName, surName, emailAddress,gender, dateOfBirth, phoneNumber)
{
	this.personId = personId;
     this.firstName = firstName;
    this.surName = surName;
	this.gender = gender,
	this.emailAddress = emailAddress;
	this.dateOfBirth = dateOfBirth;
	this.phoneNumber = phoneNumber;
}
}