const transactionController = require("../Controllers/transactionController");

module.exports = (app) => {
  /*
  ! - POST
  ? - Body {userId, transactionId, bankId,categoryId, transactionAmount}
  ? - Params NONE
  ? - Headers NONE
    */
  app.post("/transactions/create", transactionController.createTransaction);
  /*
  /*
  ! - POST
  ? - Body {userId, transactionId, transactionAmount, transactionDescription}
  ? - Params NONE
  ? - Headers NONE
    */
  app.post("/transactions/update", transactionController.update);
  /*
  ! - GET
  ? - Params transactionId
  ? - Headers userId
    */
  app.get("/transactions/:transactionId", transactionController.findByOne);
  /*
  ! - GET
  ? - Params NONE
  ? - Headers userId
    */
  app.get("/transactions", transactionController.findAllByUserId);
  /*
  ! - GET
  ? - Params bankId
  ? - Headers userId
    */
  app.get("/transactions/bank/:bankId", transactionController.findAllByBankId);
  /*
  ! - GET
  ? - Params categoryId
  ? - Headers userId
    */
  app.get(
    "/transactions/category/:categoryId",
    transactionController.findAllByCategoryId
  );
  /*
  ! - DELETE
  ? - Params Id
  ? - Headers NONE
    */
  app.delete("/transactions/:transactionId", transactionController.deleteById);
  /*
  ! - DELETE
  ? - Params categoryId
  ? - Headers userId
    */
  app.delete(
    "/transactions/category/:categoryId",
    transactionController.deleteByCategoryId
  );
  /*
  ! - DELETE
  ? - Params bankId
  ? - Headers userId
    */
  app.delete(
    "/transactions/bank/:bankId",
    transactionController.deleteByBankId
  );
};
