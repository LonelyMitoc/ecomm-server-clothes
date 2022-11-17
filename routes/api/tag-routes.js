const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag
        }
      ]
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagIdSearch = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag
        }
      ]
    });

    if (!tagIdSearch) {
      res.status(404).json({ message: `No Tag found using inputted ID`});
      return;
    }

    res.status(200).json(tagIdSearch);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagAdd = await Tag.create(req.body);
    res.status(200).json(newTagAdd);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!updateTag) {
      res.status(404).json({ message: `No Tag found using inputted ID` });
      return;
    }

    res.status(200).json({ message: `Successfully updated ID#: ${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteTag) {
      res.status(404).json({ message: `No Tag found using inputted ID`});
      return;
    }

    res.status(200).json({ message: `Successfully deleted ID#: ${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
