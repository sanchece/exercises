const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");
let router = new express.Router();

router.get("/", async function (req, res, next) {
  const results = await db.query(`SELECT code,name FROM companies ORDER BY NAME`);
  // console.log(results.rows);
  return res.json({ "companies": results.rows });
});

router.get("/:code", async function (req, res, next) {
  try {
  let code = req.params.code;
  const company = await db.query(`SELECT * FROM companies WHERE code = $1`, [
    code,
  ]);
  if (company.rows.length == 0) {
    throw new ExpressError(`Company does not exist in database: ${code}`, 404);
  } 
  const companyInvoices= await db.query(
    `SELECT id
    FROM invoices WHERE comp_code=$1`,[code]
  );
  



  let companyAndInvoices=company.rows[0];
  let invoices= companyInvoices.rows;
  companyAndInvoices.invoices=invoices.map(invoice => invoice.id);

   return res.json({"company": companyAndInvoices});
  }


  catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
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
    return res.status(201).json({"company":results.rows[0]});
  } catch (err) {
    next(err);
  }
}
catch (err) {
  return next(err);
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
      return res.json({"company":results.rows[0]});
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:code", async function (req, res, next) {
  try {
    let code = req.params.code;
    results = await db.query(`DELETE FROM companies WHERE code=$1 RETURNING code`, [code]);
    if (results.rows.length == 0) {
      throw new ExpressError(
        `Company does not exist in database: ${code}`,
        404
      );
    }
    return res.json({
      "status": "deleted",
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
