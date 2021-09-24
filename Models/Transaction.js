const sql = require("../connectDB");

const Transaction = {};

Transaction.create = (transaction, result) => {
  sql.query("INSERT INTO transactions SET ?", transaction, (err, res) => {
    if (err) {
      console.log("Error : " + err);
      result(err, null);
      return;
    }

    console.log("Transaction Created Successfully : ", {
      ...transaction,
      id: res.insertId,
    });
    result(null, { ...transaction });
  });
};

Transaction.findById = (reqParams, result) => {
  sql.query(
    `SELECT * FROM transactions WHERE id = ${reqParams.transactionId} AND userId = ${reqParams.userId}`,
    (err, res) => {
      if (err) {
        console.log("Error : " + err);
        result(err, null);
        return;
      }
      if (res.length > 0) {
        console.log("Found transactions : " + res);
        result(null, res);
        return;
      }

      result({ message: "Not Found" }, null);
    }
  );
};

Transaction.findByUserId = (userId, result) => {
  sql.query(
    `SELECT * FROM transactions WHERE userId = ${userId}`,
    (err, res) => {
      if (err) {
        console.log("Error : " + err);
        result(err, null);
        return;
      }
      if (res.length > 0) {
        console.log("Found Transaction : " + res);
        result(null, res);
        return;
      }

      result({ message: "Not Found" }, null);
    }
  );
};

Transaction.findByBankId = (reqParams, result) => {
  sql.query(
    `SELECT * FROM transactions WHERE bankId = ${reqParams.bankId} AND userId = ${reqParams.userId}`,
    (err, res) => {
      if (err) {
        console.log("Error : " + err);
        result(err, null);
        return;
      }
      if (res.length > 0) {
        console.log("Found transactions : " + res);
        result(null, res);
        return;
      }

      result({ message: "Not Found" }, null);
    }
  );
};

Transaction.findByCategoryId = (reqParams, result) => {
  sql.query(
    `SELECT * FROM transactions WHERE categoryId = ${reqParams.categoryId} AND userId = ${reqParams.userId}`,
    (err, res) => {
      if (err) {
        console.log("Error : " + err);
        result(err, null);
        return;
      }
      if (res.length > 0) {
        console.log("Found transactions : " + res);
        result(null, res);
        return;
      }

      result({ message: "Not Found" }, null);
    }
  );
};

Transaction.remove = (transactionId, result) => {
  sql.query(
    `DELETE FROM transactions WHERE Id = ${transactionId}`,
    (err, res) => {
      if (err) {
        console.log("Error : " + err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ message: "Not Found" }, null);
        return;
      }

      console.log("Deleted Transaction with Id :" + transactionId);
      result(null, res);
    }
  );
};

Transaction.removeByBankId = (reqParams, result) => {
  sql.query(
    `DELETE FROM transactions WHERE userId = ${reqParams.userId} AND bankId = ${reqParams.bankId}`,
    (err, res) => {
      if (err) {
        console.log("Error : " + err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ message: "Not Found" }, null);
        return;
      }

      console.log("Deleted Transaction with Id :" + reqParams.bankId);
      result(null, res);
    }
  );
};

Transaction.removeByCategoryId = (reqParams, result) => {
  sql.query(
    `DELETE FROM transactions WHERE userId = ${reqParams.userId} AND categoryId = ${reqParams.categoryId}`,
    (err, res) => {
      if (err) {
        console.log("Error : " + err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ message: "Not Found" }, null);
        return;
      }

      console.log(
        "Deleted Transaction with categoryId :" + reqParams.categoryId
      );
      result(null, res);
    }
  );
};

Transaction.updateById = (transaction, result) => {
  sql.query(
    "UPDATE transactions SET transactionAmount  = ?, transactionDescription = ? WHERE id = ? and userId = ?",
    [
      transaction.transactionAmount,
      transaction.transactionDescription,
      transaction.id,
      transaction.userId,
    ],
    (err, res) => {
      if (err) {
        console.log("Error : " + err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ message: "Not Found" }, null);
        return;
      }

      result(null, { message: "Transaction Details Updated Successfully!" });
    }
  );
};

module.exports = Transaction;
