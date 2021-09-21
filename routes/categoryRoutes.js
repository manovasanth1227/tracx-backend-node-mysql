const categoryController = require("../Controllers/categoryController");

module.exports = (app) => {
  app.post("/category/create", categoryController.createCategory);
  app.post("/category/update", categoryController.updateById);
  app.get("/category/:categoryId", categoryController.findOne);
  app.get("/categories", categoryController.findAll);
  app.delete("/category/:categoryId", categoryController.deleteById);
};
