const Bank = require("../Models/Bank");

exports.createBank = (req, res) => {
  console.log(req.body.id);
  if (!req.body || !req.body.id) {
    res.status(400).send({
      message: "Request Body cannot be empty",
    });
    return;
  }

  const bank = {
    id: req.body.id,
    userId: req.body.userId,
    bankName: req.body.bankName,
    bankSymbol: req.body.bankSymbol,
  };

  Bank.create(bank, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Bank.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  if (!req.params.bankId) {
    res.status(400).send({
      message: "BankId cannot be empty",
    });
    return;
  }
  Bank.findById(req.params.bankId, (err, data) => {
    if (err) {
      if (err.message === "Not Found") {
        res.status(404).send({
          message: `Not Found Bank with id ${req.params.bankId}`,
        });
      } else {
        res.status(500).send({
          message: `Error while retrieving Bank with id ${req.params.bankId}`,
        });
      }
    } else res.send(data[0]);
  });
};

exports.findAll = (req, res) => {
  if (!req.headers.userid) {
    res.status(400).send({
      message: "UserId cannot be empty",
    });
    return;
  }
  Bank.findByUserId(req.headers.userid, (err, data) => {
    if (err) {
      if (err.message === "Not Found") {
        res.status(404).send({
          message: `Not Found Banks with UserId ${req.headers.userid}`,
        });
      } else {
        res.status(500).send({
          message: `Error while retrieving Banks with userId ${req.headers.userid}`,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  if (!req.params.bankId) {
    res.status(400).send({
      message: "BankId cannot be empty",
    });
    return;
  }
  Bank.remove(req.params.bankId, (err, data) => {
    if (err) {
      if (err.message === "Not Found") {
        res.status(404).send({
          message: `Not Found Bank with id ${req.params.bankId}`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete Bank with id ${req.params.bankId}`,
        });
      }
    } else res.send({ message: `Bank was deleted successfully! ` });
  });
};

exports.update = (req, res) => {
  if (!req.body || !req.body.id) {
    res.status(400).send({
      message: "Request Body cannot be empty",
    });
    return;
  }

  const bank = {
    id: req.body.id,
    userId: req.body.userId,
    bankName: req.body.bankName,
    bankSymbol: req.body.bankSymbol,
    bankBalance: req.body.bankBalance,
  };

  Bank.updateById(bank, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Bank.",
      });
    else res.send(data);
  });
};
