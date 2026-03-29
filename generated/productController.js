export const getAllProducts = (req, res) => {
  res.json([
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Phone', price: 699.99 }
  ]);
};

export const getProductById = (req, res) => {
  const productId = parseInt(req.params.id);
  if (productId === 1) {
    res.json({ id: 1, name: 'Laptop', price: 999.99 });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

export const createProduct = (req, res) => {
  const { name, price } = req.body;
  res.status(201).json({
    id: 3,
    name,
    price,
    message: 'Product created successfully'
  });
};