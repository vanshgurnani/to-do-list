const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb+srv://gurnanivansh57:iz64rqtBBQss8iQ7@cluster101.nuwewcc.mongodb.net/tododb?retryWrites=true&w=majority';
const dbName = 'tododb';
const collectionName = 'todos';

// Connect to the MongoDB server
mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define a schema for the todo items
const todoSchema = new mongoose.Schema({
  item: String
});

// Create a Mongoose model for the todos collection
const Todo = mongoose.model('Todo', todoSchema, collectionName);

// Export the mongoose connection and Todo model
module.exports = {
  mongoose: mongoose,
  Todo: Todo
};
