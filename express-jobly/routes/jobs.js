const express = require("express");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const { ensureLoggedInIsAdmin } = require("../middleware/auth");
const Job = require("../models/job");
const jobNewSchema = require("../schemas/jobNew.json");
const jobSearchSchema= require("../schemas/jobFilters.json");
const router = express.Router({ mergeParams: true });

router.post("/", ensureLoggedInIsAdmin, async function (req, res, next) {
    // return res.status(201).send("success")
   
    try {
      const validator = jsonschema.validate(req.body, jobNewSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const job = await Job.create(req.body);
      return res.status(201).json({ job });
    } catch (err) {
      return next(err);
    }
  });


  router.get("/", async function (req, res, next) {
    const q = req.query;
    if (q.minSalary !== undefined) q.minSalary = +q.minSalary;
    q.hasEquity = q.hasEquity === "true";
  
    try {
      const validator = jsonschema.validate(q, jobSearchSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const jobs = await Job.findAll(q);
      return res.json({ jobs });
    } catch (err) {
      return next(err);
    }
  });

  module.exports=router;