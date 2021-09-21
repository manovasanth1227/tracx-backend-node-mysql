const sql = require("../connectDB");

const Category = {};

Category.create = (category, result) => {
  sql.query("INSERT INTO categories SET ?", category, (err, res) => {
    if (err) {
      console.log("Error : " + err);
      result(err, null);
      return;
    }
    console.log(
      "Category Successfully created :" + { id: res.insertId, ...category }
    );
    result(null, { id: res.insertId, ...category });
  });
};

Category.findByUserId = (userId, result) => {
  sql.query(`SELECT * FROM categories WHERE userId = ${userId}`, (err, res) => {
    if (err) {
      console.log("Error : " + err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      console.log("Found Categories : " + res);
      result(null, res);
      return;
    }

    result({ message: "Not Found" }, null);
  });
};

Category.findById = (categoryId, result) => {
  sql.query(`SELECT * FROM categories WHERE id = ${categoryId}`, (err, res) => {
    if (err) {
      console.log("Error : " + err);
      result(err, null);
      return;
    }

    if (res.length > 0) {
      result(null, res);
      return;
    }

    result({ message: "Not Found" }, null);
  });
};

Category.remove = (categoryId, result) => {
  sql.query(`DELETE FROM categories WHERE Id = ${categoryId}`, (err, res) => {
    if (err) {
      console.log("Error : " + err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ message: "Not Found" }, null);
      return;
    }

    console.log("Deleted Categories with Id :" + categoryId);
    result(null, res);
  });
};

Category.update = (category, result) => {
  sql.query(
    "UPDATE categories SET categoryName = ?, categoryExpense = ? WHERE id = ?",
    [category.categoryName, category.categoryExpense, category.id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ message: "Not Found" }, null);
        return;
      }

      result(null, { message: "Category Details Updated Successfully!" });
    }
  );
};
module.exports = Category;
