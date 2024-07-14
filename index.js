// Import the Entry model
const Entry = require('./models/entry');

// Connect to the MongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a new entry
app.post('/entries', (req, res) => {
  const entry = new Entry({
    title: req.body.title,
    content: req.body.content
  });
  entry.save((err, entry) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(entry);
    }
  });
});

// Read all entries
app.get('/entries', (req, res) => {
  Entry.find().then(entries => {
    res.send(entries);
  }).catch(err => {
    res.status(500).send(err);
  });
});

// Read a single entry
app.get('/entries/:id', (req, res) => {
  Entry.findById(req.params.id).then(entry => {
    if (!entry) {
      res.status(404).send({ message: 'Entry not found' });
    } else {
      res.send(entry);
    }
  }).catch(err => {
    res.status(500).send(err);
  });
});

// Update an entry
app.put('/entries/:id', (req, res) => {
  Entry.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content
  }, { new: true }).then(entry => {
    res.send(entry);
  }).catch(err => {
    res.status(500).send(err);
  });
});

// Delete an entry
app.delete('/entries/:id', (req, res) => {
  Entry.findByIdAndRemove(req.params.id).then(() => {
    res.send({ message: 'Entry deleted' });
  }).catch(err => {
    res.status(500).send(err);
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});