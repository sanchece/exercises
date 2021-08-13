const express = require("express");
const ExpressError = require("../expressError")
const db = require("../db");
let router = new express.Router();

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(`SELECT id, comp_code FROM invoices`);
    return res.send({"invoices": result.rows});
  }
  catch (err) {
    return next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    const result = await db.query(
          `SELECT i.id, i.comp_code, i.amt, i.paid, i.add_date, i.paid_date, 
          c.name, c.description 
          FROM invoices AS i
          INNER JOIN companies AS c 
          ON (i.comp_code = c.code)  
          WHERE id = $1`,
        [id]);

    const invoiceData = result.rows[0];
    const invoice = {"invoice":{
      id: invoiceData.id,
      company: {
        code: invoiceData.comp_code,
        name: invoiceData.name,
        description: invoiceData.description,
      },
      amt: invoiceData.amt,
      paid: invoiceData.paid,
      add_date: invoiceData.add_date,
      paid_date: invoiceData.paid_date,
    }};
    return res.send(invoice);
  }

  catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    let comp_code = req.body.comp_code;
    let amt = req.body.amt;
    const result = await db.query(
          `INSERT INTO invoices (comp_code, amt) 
           VALUES ($1, $2) 
           RETURNING id, comp_code, amt, paid, add_date, paid_date`,
        [comp_code, amt]);

    return res.json({"invoice": result.rows[0]});
  }

  catch (err) {
    return next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    let amt = req.body.amt;
    let paid=req.body.paid;
    let id = req.params.id;
    let paidDate = null;

    const oldInvoice = await db.query(
          `SELECT paid
           FROM invoices
           WHERE id = $1`,
        [id]);

    const oldPaidDate = oldInvoice.rows[0].paid_date;
    if (!oldPaidDate && paid) {
      paidDate = new Date();
    } else if (!paid) {
      paidDate = null
    } else {
      paidDate = oldPaidDate;
    }

    const result = await db.query(
          `UPDATE invoices
           SET amt=$1, paid=$2, paid_date=$3
           WHERE id=$4
           RETURNING id, comp_code, amt, paid, add_date, paid_date`,
        [amt, paid, paidDate, id]);
    return res.json({"invoice": result.rows[0]});
  }
  catch (err) {
    return next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    const result = await db.query(
          `DELETE FROM invoices
           WHERE id = $1
           RETURNING id`,
        [id]);
    return res.json({"status": "deleted"});
  }
  catch (err) {
    return next(err);
  }
});
module.exports = router;