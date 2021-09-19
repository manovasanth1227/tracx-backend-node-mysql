const sql = require("../connectDB");

const Bank = (bank) => {};

Bank.create = (bank, result) => {
  sql.query("INSERT INTO banks SET ?", bank, (err, res) => {
    if (err) {
      console.log("Error : " + err);
      result(err, null);
      return;
    }

    console.log("Bank Created Successfully : ", {
      id: res.insertId,
      ...bank,
    });
    result(null, { id: res.insertId, ...bank });
  });
};

Bank.findById = (bankId, result) => {
  sql.query(`SELECT * FROM banks WHERE id = ${bankId}`, (err, res) => {
    if (err) {
      console.log("Error : " + err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      console.log("Found Banks : " + res);
      result(null, res);
      return;
    }

    result({ message: "Not Found" }, null);
  });
};

Bank.findByUserId = (userId, result) => {
  sql.query(`SELECT * FROM banks WHERE userId = ${userId}`, (err, res) => {
    if (err) {
      console.log("Error : " + err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      console.log("Found Banks : " + res);
      result(null, res);
      return;
    }

    result({ message: "Not Found" }, null);
  });
};

Bank.remove = (bankId, result) => {
  sql.query(`DELETE FROM banks WHERE Id = ${bankId}`, (err, res) => {
    if (err) {
      console.log("Error : " + err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ message: "Not Found" }, null);
      return;
    }

    console.log("Deleted Bank with Id :" + bankId);
    result(null, res);
  });
};

Bank.updateById = (bank, result) => {
  console.log(bank);
  sql.query(
    "UPDATE banks SET bankBalance  = ?, bankName = ?, bankSymbol = ? WHERE id = ?",
    [bank.bankBalance, bank.bankName, bank.bankSymbol, bank.id],
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

      result(null, { message: "Bank Details Updated Successfully!" });
    }
  );
};

module.exports = Bank;
