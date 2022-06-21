const fs = require('fs');
const faker = require('faker/locale/ro');
const COUNT = 100;

const entry = () => ({
  occupation: faker.name.jobTitle(),
  age: (Math.floor(Math.random() * 70) + 18).toString(),
  content: faker.lorem.paragraphs(),
  name: faker.name.firstName()
});

const jsonString = JSON.stringify(
  [...Array(COUNT).keys()].map(() => entry())
);

fs.writeFile('./import.json', jsonString, (err) => {
  if (err) {
    console.log('Error writing file', err);
  } else {
    console.log('Successfully wrote file');
  }
});
