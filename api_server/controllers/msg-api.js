const mongoose = require('mongoose');
const messageModel = mongoose.model('message');

//GET Request Handler
const getAllMessagesOrderedByLastPosted = (req, res) => {
   messageModel
   .find()
   .sort( {'_id': -1} )
   .exec( (err, messages) => {
       if (err) {
           res.status(404).json(err);
       } else {
           res.status(200).json(messages);
       }
       
    });
 };

 const deleteSingleMessage = (req, res) => {
    if (req.params && req.params.messageid) {
      messageModel
        .findById(req.params.messageid)
        .exec( (err, message) => {
         
          if (err) {
            res.status(400).json(err);
            return;
          }
  
          if (!message) {
            res.status(404).json({
              "api-msg": "messageid not found"
            });
            return;
          }
  
          // found message
          message.remove((err) => {
              if(err) {
                  return res.status(400).json(err);
              }
              // send a 2004 no content back
              res.status(204).json(null);
              }
          )
        });
    } else {
        // must have a message id
        res.status(400).json({
            "api-msg": "No messageid in request"
        });
    }
  };

//UPDATE Request Handler
 const updateMessage = (req, res) => {
     console.log(req.params.messageid);
     if(userOriginal(req, res)){
         messageModel
         .findOneAndUpdate({_id:req.params.messageid}, {$set:{msg:req.body.msg}}, {new:true})
         .exec( (err, message) => {
         if(err) {
            res.status(400).json(err);
            console.log("error");
            return;
        }
         if(!message){
            res.status(404).json({
                "api-msg": "messageid not foud"
            });
            return;
        }
        res.status(200).json(message);
    });
} else {
    res.status(404).json({
        "api-msg":"Mo messageid in request"
    });

}
};

const userOriginal = (req, res) => {
    if(req.params && req.params.messageid){
        return true;
    }
    return false;
}

const deleteAll = (req, res) => {
    if (req.user.username === "Admin") {
        messageModel
        .deleteMany ({}, (err, message) => {
            if (err) {
                res.status(404).json(err);
                return;

            }else {
                res.status(200).json(message);
            }
        });
    }else {
        res.status(403).json("Permission Invalid");
    }
};

// POST Request Handler
const addNewMessage = (req, res) => {   
   // res.status(200).send('Successful API POST Request');
   messageModel 
   .create( req.body, (err, message) => {
       if (err) {     
           res.status(400).json(err);   
        } else {     
            res.status(201).json(message);   
        } 
    });
};
 
module.exports = {
    getAllMessagesOrderedByLastPosted,
    deleteSingleMessage,
    addNewMessage,
    updateMessage,
    deleteAll
}