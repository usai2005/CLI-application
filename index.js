const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listOfContacts = await listContacts();

      console.table(listOfContacts);

      break;

    case "get":
      const searchedContact = await getContactById(id);

      console.log(searchedContact);

      break;

    case "add":
      const addedContact = await addContact(name, email, phone);

      console.log(addedContact);

      break;

    case "remove":
      const removeById = await removeContact(id);

      console.log(removeById);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
