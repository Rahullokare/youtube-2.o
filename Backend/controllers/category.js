const Category = require("../models/category");

exports.createCategory = (req, res) => {
  const category = new Category(req.body);

  category.save((err, cate) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to Create Cate",
      });
    }
    req.category = cate;
    next();
  });
};

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to find Category",
      });
    }
    res.json(cate);
  });
};

exports.updateCategory = (req, res) => {
  Category.findByIdAndUpdate(
    { _id: req.category._id }, //find category
    { $set: req.body }, //what to update
    { new: true, useFindAndModify: false },
    (err, cate) => {
      if (err) {
        return res.status(400).json({
          err: "Failed to Update Category",
        });
      }
      res.json(cate);
    }
  );
};

exports.deleteCategory = (req, res) => {
  Category.findByIdAndDelete({ _id: req.category._id }, (err, cate) => {
    if (err) {
      return res.status(400).json({
        err: "not able to delete category",
      });
    }
  });
};
