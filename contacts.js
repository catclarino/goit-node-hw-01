const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts(chek) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    if (!chek) {
      console.table(contacts);
    }
    return contacts;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts(true);
    const getContact = contacts.find(
      (contact) => contact.id.toString() === contactId
    );
    console.table(getContact);
    return getContact;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts(true);
    const newContacts = contacts.filter(
      (contact) => contact.id.toString() !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.table(newContacts);
    return newContacts;
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  try {
    const contacts = await listContacts(true);
    const newContacts = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.table(newContacts);
    return newContacts;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
