const db = require('../models/db');

exports.getAll = (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'Item não encontrado' });
    res.json(row);
  });
};

exports.create = (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Campo name obrigatório' });
  db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Item não encontrado' });
    res.json({ updated: this.changes });
  });
};

exports.remove = (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM items WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Item não encontrado' });
    res.json({ deleted: this.changes });
  });
};
