const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");
let router = new express.Router();

router.get("/", async function (req, res, next) {
  const results = await db.query(`SELECT code,name FROM companies`);
  console.log(results.rows);
  return res.send({ companies: results.rows });
});

router.get("/:code", async function (req, res, next) {
  let code = req.params.code;
  const results = await db.query(`SELECT * FROM companies WHERE code = $1`, [
    code,
  ]);
  if (results.rows.length == 0) {
    throw new ExpressError(`Company does not exist in database: ${code}`, 404);
  } else {
    return res.send(results.rows);
  }
});

router.post("/", async function (req, res, next) {
  let name = req.body.name;
  let description = req.body.description;
  let code = name.toLowerCase();
  try {
    const results = await db.query(
      `INSERT INTO companies (code, name, description) 
            VALUES ($1, $2, $3) 
            RETURNING code, name, description`,
      [code, name, description]
    );
    // return res.send(results);
    return res.send(results.rows);
  } catch (err) {
    next(err);
  }
});

router.put("/:code", async function (req, res, next) {
  let newName = req.body.name;
  let newDescription = req.body.description;
  let code = req.params.code;
  try {
    const results = await db.query(
      `UPDATE companies
            SET name=$1,description=$2 WHERE code=$3
            RETURNING code,name,description`,
      [newName, newDescription, code]
    );
    if (results.rows.length == 0) {
      throw new ExpressError(
        `Company does not exist in database: ${code}`,
        404
      );
    } else {
      return res.send(results.rows);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:code", async function (req, res, next) {
  try {
    let code = req.params.code;
    results = await db.query(`DELETE FROM companies WHERE code=$1`, [code]);

    return res.send({
      status: "deleted",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
