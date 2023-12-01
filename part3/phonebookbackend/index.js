require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Number = require("./models/number");

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({});
  }
  next(error);
};

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response) => {
  Number.find({}).then((numbers) => {
    response.json(numbers);
  });
});

app.get("/info", (request, response) => {
  const numberOfPersons = phonebook.length;
  const currentDateAndTime = new Date();
  response.send(
    `<p>Phonebook has info for ${numberOfPersons} people</p>
     <p>${currentDateAndTime}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const reqID = Number(request.params.id);
  const personData = phonebook.find((person) => person.id === reqID);
  personData ? response.json(personData) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  Number.findByIdAndDelete(request.params.id).then((number) => {
    response.json(number);
  });
});

app.post("/api/persons", (request, response) => {
  const postData = request.body;
  if (!postData) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (!postData.name || !postData.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const record = new Number({
    name: postData.name,
    number: postData.number,
  });

  record.save().then((result) => {
    response.json(result);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const postData = request.body;
  const newContact = {
    name: postData.name,
    number: postData.number,
  };

  if (!postData) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (!postData.name || !postData.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  Number.findByIdAndUpdate(request.params.id, newContact, { new: true })
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const findExistingName = phonebook.find(
//   (p) => p.name.toLowerCase() === postData.name.toLowerCase()
// );
// if (findExistingName) {
//   return response.status(400).json({
//     error: "name must be unique",
//   });
// }

// const person = {
//   id: Math.floor(Math.random() * 1000000),
//   name: postData.name,
//   number: postData.number,
// };

// phonebook = phonebook.concat(person);
// response.json(person);
