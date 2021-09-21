const Category = require("../Models/Category");

exports.createCategory = (req, res) => {
  if (!req.body || !req.body.id || !req.body.userId) {
    res.status(400).send({
      message: "Request Body must not be empty",
    });
    return;
  }

  const category = {
    id: req.body.id,
    userId: req.body.userId,
    categoryName: req.body.categoryName,
  };

  Category.create(category, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Bank.",
      });
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  if (!req.headers.userid) {
    res.status(400).send({
      message: "UserId cannot be empty",
    });
    return;
  }
  Category.findByUserId(req.headers.userid, (err, data) => {
    if (err) {
      if (err.message === "Not Found") {
        res.status(404).send({
          message: `Not Found Categories with UserId ${req.headers.userid}`,
        });
      } else {
        res.status(500).send({
          message: `Error while retrieving Categories with userId ${req.headers.userid}`,
        });
      }
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  if (!req.params.categoryId) {
    res.status(400).send("Request Parameter must not be empty");
  }
  Category.findById(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.message === "Not Found") {
        res.status(404).send({
          message: `Not Found category with id ${req.params.categoryId}`,
        });
      } else {
        res.status(500).send({
          message: `Error while category Bank with id ${req.params.categoryId}`,
        });
      }
    } else res.send(data[0]);
  });
};

exports.deleteById = (req, res) => {
  if (!req.params.categoryId) {
    res.status(400).send("Request Parameter must not be empty");
  }
  Category.remove(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.message === "Not Found") {
        res.status(404).send({
          message: `Not Found category with id ${req.params.categoryId}`,
        });
      } else {
        res.status(500).send({
          message: `Error while category Bank with id ${req.params.categoryId}`,
        });
      }
    } else res.send({ message: "Deleted successfully" });
  });
};

exports.updateById = (req, res) => {
  if (!req.body || !req.body.id || !req.body.userId) {
    res.status(400).send("Request Body must not be empty");
    return;
  }
  const category = {
    id: req.body.id,
    userId: req.body.userId,
    categoryName: req.body.categoryName,
    categoryExpense: req.body.categoryExpense,
  };
  Category.update(category, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the category.",
      });
    } else res.send(data);
  });
};
