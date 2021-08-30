const Router = require("express").Router;
const router = new Router();
const Message = require("../models/message");
const {ensureLoggedIn} = require("../middleware/auth");
const ExpressError = require("../expressError");


/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", async function(req, res, next){
    try{
        ensureLoggedIn;
        let res= await Message.get(req.params.id);
        return res.send({message:res}) ;
    }
    catch(err){
        return next(err);
    }

})

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post("/",async, function(req,res,next){
    try{
        let res= await Message.create({
            from_username:req.user.username,  //user?
            to_username:req.body.to_username,
            body: req.body.body
        })
    }
    catch(err){
        return next(err);
    }

})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

 router.post("/:id/read", ensureLoggedIn, async function (req, res, next) {
    try {
      let username = req.user.username;
      let results = await Message.get(req.params.id);
      if (results.to_user.username !== username) {
        throw new ExpressError("Message cannot be marked as read", 401);
      }
      let message = await Message.markRead(req.params.id);
      return res.json({message});
    }
  
    catch (err) {
      return next(err);
    }
  });
  
  
  module.exports = router;