// Middleware to validate product data for creation
export const validateProduct = (req, res, next) => {
  const { name, brand, variants, emiPlans } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(400);
    return next(new Error('Product name is required and must be a string'));
  }

  if (!brand || typeof brand !== 'string') {
    res.status(400);
    return next(new Error('Product brand is required and must be a string'));
  }

  if (!variants || !Array.isArray(variants) || variants.length === 0) {
    res.status(400);
    return next(new Error('At least one product variant is required'));
  }

  if (!emiPlans || !Array.isArray(emiPlans) || emiPlans.length === 0) {
    res.status(400);
    return next(new Error('At least one EMI plan is required'));
  }

  // If all validation passes, move to the next middleware (the controller)
  next();
};
