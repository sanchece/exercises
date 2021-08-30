/** User class for message.ly */
const db = require("../db");
const bcrypt = require("bcrypt");

/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) { 
    let newPassword= await bcrypt.hash(password,12);
    const res=await db.query(
      `INSERT INTO users 
      (username,password,first_name,last_name,phone,join_at,last_login_at)
      VALUES ($1, $2, $3, $4, $5, current_timestamp,current_timestamp)
      RETURNING username,password,first_name,last_name, phone`,
      [username,newPassword,first_name,last_name, phone]
    )
    return res.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { 
    const res= await db.query(
      `SELECT password FROM users WHERE username =$1`,[username]
    );
    let username= res.rows[0];
    if(await bcrypt.compare(password, user.password)===true){
      return true;
    }
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { 
    const res = await db.query(
      `UPDATE users
         SET last_login_at = current_timestamp
         WHERE username = $1
         RETURNING username`,
      [username]);
     
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    const res = await db.query(
      `SELECT username,
              first_name,
              last_name,
              phone
          FROM users`);
    return res.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const res = await db.query(
      `SELECT username
      FROM users WHERE username=$1`,[username]
    )
    return res.rows[0];
   }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { 
    const res= await db.query(
      `SELECT  u.first_name, u.last_name, u.phone, 
      m.id, m.to_username, m.body, m.sent_at, m.read_at
      FROM messages as m JOIN users AS u ON m.from_username= u.username
      WHERE from_username=$1
      RETURNING m.id,m.to_user,m.body, m.sent_at, m.read_at`,[username]);

    return res;
    
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */

  static async messagesTo(username) { 
    const res= await db.query(
      `SELECT  u.first_name, u.last_name, u.phone, 
      m.id, m.to_username, m.body, m.sent_at, m.read_at
      FROM messages as m JOIN users AS u ON m.to_username= u.username
      WHERE to_username=$1
      RETURNING m.id,m.from_user,m.body, m.sent_at, m.read_at`,[username]);

    return res;
  }
}


module.exports = User;