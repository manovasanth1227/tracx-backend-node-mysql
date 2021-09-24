const Transaction = require("../Models/Transaction");

exports.createTransaction = (req, res) => {
  if (!req.body || !req.body.id || !req.body.userId || !req.body.categoryId) {
    res.status(400).send({
      message: "Request Body cannot be empty",
    });
    return;
  }

  const transaction = {
    id: req.body.id,
    userId: req.body.userId,
    categoryId: req.body.categoryId,
    bankId: req.body.bankId,
    transactionAmount: req.body.transactionAmount,
    transactionDescription: req.body.transactionDescription,
  };

  if (!transaction.transactionDescription) {
    delete transaction.transactionDescription;
  }

  Transaction.create(transaction, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Bank.",
      });
    else res.send(data);
  });
};

exports.findByOne = (req, res) => {
  if (!req.params.transactionId || !req.headers.userid) {
    res.status(400).send({
      message: "TransactionId or UserId cannot be empty",
    });
    return;
  }
  Transaction.findById(
    { transactionId: req.params.transactionId, userId: req.headers.userid },
    (err, data) => {
      if (err) {
        if (err.message === "Not Found") {
          res.status(404).send({
            message: `Not Found Transaction with id ${req.params.transactionId} and userId ${req.headers.userid}`,
          });
        } else {
          res.status(500).send({
            message: `Error while retrieving Transaction with id ${req.params.transactionId} and userId ${req.headers.userid}`,
          });
        }
      } else res.send(data[0]);
    }
  );
};

exports.findAllByUserId = (req, res) => {
  if (!req.headers.userid) {
    res.status(400).send({
      message: "UserId cannot be empty",
    });
    return;
  }
  Transaction.findByUserId(req.headers.userid, (err, data) => {
    if (err) {
      if (err.message === "Not Found") {
        res.status(404).send({
          message: `Not Found Transactions with userId ${req.headers.userid}`,
        });
      } else {
        res.status(500).send({
          message: `Error while retrieving Transaction with userId ${req.headers.userid}`,
        });
      }
    } else res.send(data);
  });
};

exports.findAllByBankId = (req, res) => {
  if (!req.headers.userid || !req.params.bankId) {
    res.status(400).send({
      message: "UserId or BankId cannot be empty",
    });
    return;
  }
  Transaction.findByBankId(
    { bankId: req.params.bankId, userId: req.headers.userid },
    (err, data) => {
      if (err) {
        if (err.message === "Not Found") {
          res.status(404).send({
            message: `Not Found Transaction with userId ${req.headers.userid} and bankId ${req.params.bankId}`,
          });
        } else {
          res.status(500).send({
            message: `Error while retrieving Transaction with userId ${req.headers.userid} and bankId  ${req.params.bankId}`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.findAllByCategoryId = (req, res) => {
  if (!req.headers.userid || !req.params.categoryId) {
    res.status(400).send({
      message: "UserId or CategoryId cannot be empty",
    });
    return;
  }
  Transaction.findByCategoryId(
    { categoryId: req.params.categoryId, userId: req.headers.userid },
    (err, data) => {
      if (err) {
        if (err.message === "Not Found") {
          res.status(404).send({
            message: `Not Found Transaction with userId ${req.headers.userid} and categoryId ${req.params.categoryId}`,
          });
        } else {
          res.status(500).send({
            message: `Error while retrieving Transaction with userId ${req.headers.userid} and categoryId  ${req.params.categoryId}`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.deleteById = (req, res) => {
  if (!req.params.transactionId) {
    res.status(400).send({
      message: "TransactionId cannot be empty",
    });
    return;
  }
  Transaction.remove(req.params.transactionId, (err, data) => {
    if (err) {
      if (err.message === "Not Found") {
        res.status(404).send({
          message: `Not Found Transaction with id ${req.params.transactionId}`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete Transaction with id ${req.params.transactionId}`,
        });
      }
    } else res.send({ message: `Transaction was deleted successfully! ` });
  });
};

exports.deleteByBankId = (req, res) => {
  if (!req.headers.userid || !req.params.bankId) {
    res.status(400).send({
      message: "BankId or UserId cannot be empty",
    });
    return;
  }
  Transaction.removeByBankId(
    { bankId: req.params.bankId, userId: req.headers.userid },
    (err, data) => {
      if (err) {
        if (err.message === "Not Found") {
          res.status(404).send({
            message: `Not Found Transaction with bankId ${req.params.bankId}`,
          });
        } else {
          res.status(500).send({
            message: `Could not delete Transaction with bankId ${req.params.bankId}`,
          });
        }
      } else res.send({ message: `Transaction was deleted successfully! ` });
    }
  );
};

exports.deleteByCategoryId = (req, res) => {
  if (!req.headers.userid || !req.params.categoryId) {
    res.status(400).send({
      message: "CategoryId or UserId cannot be empty",
    });
    return;
  }
  Transaction.removeByCategoryId(
    { categoryId: req.params.categoryId, userId: req.headers.userid },
    (err, data) => {
      if (err) {
        if (err.message === "Not Found") {
          res.status(404).send({
            message: `Not Found Transaction with CategoryId ${req.params.categoryId}`,
          });
        } else {
          res.status(500).send({
            message: `Could not delete Transaction with CategoryId ${req.params.categoryId}`,
          });
        }
      } else res.send({ message: `Transaction was deleted successfully! ` });
    }
  );
};

exports.update = (req, res) => {
  if (!req.body || !req.body.id || !req.body.userId) {
    res.status(400).send({
      message: "UserId or TransactionId cannot be empty",
    });
    return;
  }

  const transaction = {
    id: req.body.id,
    userId: req.body.userId,
    transactionAmount: req.body.transactionAmount,
    transactionDescription: req.body.transactionDescription,
  };

  Transaction.updateById(transaction, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the transaction.",
      });
    else res.send(data);
  });
};
