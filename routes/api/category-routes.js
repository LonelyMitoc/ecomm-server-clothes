const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryAll = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
        },
      ],
    });
    res.status(200).json(categoryAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryIdSearch = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
        },
      ],
    });

    if (!categoryIdSearch) {
      res.status(404).json({ message: `No category found using inputted ID` });
      return;
    }

    res.status(200).json(categoryIdSearch);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategoryAdd = await Category.create(req.body);
    res.status(200).json(newCategoryAdd);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!updateCategory) {
      res.status(404).json({ message: `No Category found using inputted ID` });
      return;
    }
    
    res.status(200).json({ message: `Successfully updated ID#: ${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteCategory) {
      res.status(404).json({ message: `No Category found using inputted ID` });
      return;
    }
    
    res.status(200).json({ message: `Successfully deleted ID#: ${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
