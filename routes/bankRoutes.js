const bankController = require("../Controllers/bankController");

module.exports = (app) => {
  app.post("/bank/create", bankController.createBank);
  app.post("/bank/update", bankController.update);
  app.get("/bank/:bankId", bankController.findOne);
  app.delete("/bank/:bankId", bankController.delete);
  app.get("/banks", bankController.findAll);
};
