export const getAllUsers = (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
};

export const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  if (userId === 1) {
    res.json({ id: 1, name: 'John Doe', email: 'john@example.com' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const createUser = (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({
    id: 3,
    name,
    email,
    message: 'User created successfully'
  });
};