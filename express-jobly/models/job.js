"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Job{

  static async create({ title, salary, equity, companyHandle }) {
    const result = await db.query(
          `INSERT INTO jobs (title,
                             salary,
                             equity,
                             company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
           [
            title,
            salary,
            equity,
            companyHandle
        ]);
    let job = result.rows[0];

    return job;
  }


  static async findAll({ minSalary, hasEquity, title } = {}) {
    let queryString = `SELECT j.id,
                        j.title,
                        j.salary,
                        j.equity,
                        j.company_handle AS "companyHandle",
                        c.name AS "companyName"
                 FROM jobs j 
                   LEFT JOIN companies AS c ON c.handle = j.company_handle`;
    let filterSQL = [];


    if (minSalary !== undefined) {

      filterSQL.push(`salary >= ${minSalary}`);
    }

    if (hasEquity === true) {
        filterSQL.push(`equity > 0`);
    }

    if (title !== undefined) {

        filterSQL.push(`title ILIKE '%${title}%'`);
    }

    if (filterSQL.length > 0) {
        queryString += " WHERE " + filterSQL.join(" AND ");
    }
    queryString += " ORDER BY title";
    const jobsRes = await db.query(query, queryValues);
    return jobsRes.rows;
  }




}

module.exports = Job;