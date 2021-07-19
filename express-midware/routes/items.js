const Item= require('../item');
const express=require('express');
const router=express.Router();


router.get('',function(req,res,next){
    try {
        return res.json({ items: Item.getAllItems() });
      } 
    catch(error){
        return next(error)
      }
})

router.post('',function(req,res,next){
    try{
        let newItem=new Item(req.body.name,req.body.price);
        return res.json({
            item:newItem
        })
    }
    catch(error){
        return next(error)
    }
});

router.get('/:name', function(req, res, next){
    try {
      let foundItem = Item.findItem(req.params.name);
      return res.json({
          item:foundItem
        });
    } 
    catch(error){
      return next(error)
    }
  });
  
  router.patch('/:name', function(req, res, next){
    try {
      let foundItem = Item.updateItem(req.params.name, req.body);
      return res.json({ 
          item: foundItem 
        });
    } catch (error) {
      return next(error)
    }
  });
  
  router.delete('/:name', function(req, res, next){
    try {
      Item.removeItem(req.params.name);
      return res.json({
          message:'Deleted'
        });
    } catch (error) {
      return next(error)
    }
  });

module.exports = router;