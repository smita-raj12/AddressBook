// Business Logic for AddressBook ---------
function AddressBook(){
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

function Addresses() {
  this.addresses = {};
  this.currentId = 0;
}


Addresses.prototype.addAddress = function(address) {
  
  address.id = this.assignAddressId();
  console.log("test1",address.id)
  
  this.addresses[1] = address;
  console.log("this.addresses",this.addresses)
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
function Contact(firstName, lastName, phoneNumber,emailAddress,addresses){
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.addresses = addresses;
}

function Address(type, street, region, postalCode, country) {

  this.type = type;
  this.street = street;
  this.region = region;
  this.postalCode = postalCode;
  this.country = country;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();


function displayAddressDetails(contact) {
  console.log("contact",contact)
  let addressList = $("ul#addresses");
  let htmlForAddressInfo = "";
  Object.keys(contact.addresses).forEach(function (key) {
    const address = contact.findAddress(key);
    htmlForAddressInfo += "<li id=" + address.id + ">" + address.type + "</li>";
  });
  addressList.html(htmlForAddressInfo);
}

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName +  "</li>";
  });
  contactsList.html(htmlForContactInfo);
}
function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".address").html(displayAddressDetails(contact.addresses));
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
 $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  
  $("form#new-contact").submit(function(event) {
    attachContactListeners();
    event.preventDefault();
    
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedAddressType = $("input[name='type']:checked").val();
    const inputtedAddressStreet = $("input#new-street").val();
    const inputtedAddressRegion = $("input#new-region").val();
    const inputtedAddressPostalCode = $("input#new-postal-code").val();
    const inputtedAddressCountry = $("input#new-country").val();

    console.log("inputtedAddressCountry",inputtedAddressCountry)
   // $("input#new-first-name").val("");
   // $("input#new-last-name").val("");
   // $("input#new-phone-number").val("");
   // $("input#new-email-address").val("");
   // $("input#new-type").val("");
   // $("input#new-street").val("");
   // $("input#new-region").val("");
   // $("input#new-postal-code").val("");
   // $("input#new-country").val("");
   
    let newAddresses = new Addresses();
    let FullAddress = new Address(inputtedAddressType, inputtedAddressStreet, inputtedAddressRegion, inputtedAddressPostalCode, inputtedAddressCountry)
    console.log("FullAddress",FullAddress)
    newAddresses.addAddress(FullAddress)
    console.log("NewAddress",newAddresses)

    const newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, newAddresses);
   // const newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, newAddress);
    console.log("newContact ",newContact)
    addressBook.addContact(newContact);
   // displayAddressDetails(newAddress);
      console.log("contact",Contact)
    displayContactDetails(addressBook); 
  });
});