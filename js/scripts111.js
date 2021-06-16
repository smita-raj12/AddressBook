






















 
// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignContactId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignContactId = function () {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function (id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function (id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Addresses
function Addresses() {
  this.addresses = {};
  this.currentId = 0;
}

Addresses.prototype.addAddress = function (address) {
  address.id = this.assignAddressId();
  this.addresses[address.id] = address;
};

Addresses.prototype.assignAddressId = function () {
  this.currentId += 1;
  return this.currentId;
};

Addresses.prototype.findAddress = function (id) {
  if (this.addresses[id] != undefined) {
    return this.addresses[id];
  }
  return false;
};

Addresses.prototype.deleteAddress = function (id) {
  if (this.addresses[id] === undefined) {
    return false;
  }
  delete this.addresses[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, addresses) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.addresses = addresses;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

// Business Logic for Address
function Address(type, street, region, postalCode, country) {
  this.type = type;
  this.street = street;
  this.region = region;
  this.postalCode = postalCode;
  this.country = country;
}

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function displayAddressDetails(contact) {
  let addressList = $("ul#addresses");
  let htmlForAddressInfo = "";
  Object.keys(contact.addresses).forEach(function (key) {
    const address = contact.findAddress(key);
    htmlForAddressInfo += "<li id=" + address.id + ">" + address.type + "</li>";
  });
  addressList.html(htmlForAddressInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".address").html(displayAddressDetails(contact.addresses));
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email-address").val();
    const inputtedAddressType = $("input[name='type']:checked").val();
    const inputtedAddressStreet = $("input#new-street").val();
    const inputtedAddressRegion = $("input#new-region").val();
    const inputtedAddressPostalCode = $("input#new-postal-code").val();
    const inputtedAddressCountry = $("input#new-country").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-type").val("");
    $("input#new-street").val("");
    $("input#new-region").val("");
    $("input#new-postal-code").val("");
    $("input#new-country").val("");
    let newAddresses = new Addresses();
    const newAddress1 = new Address (inputtedAddressType, inputtedAddressStreet, inputtedAddressRegion, inputtedAddressPostalCode, inputtedAddressCountry);
    newAddresses.addAddress(newAddress1);

    console.log("newAddresses",newAddresses)
    const newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, newAddresses);
    console.log("newContact",newContact)
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});