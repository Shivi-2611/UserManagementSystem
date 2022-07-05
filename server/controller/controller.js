var Userdb= require('../model/model');

exports.create=(req,res)=>{

    if(!req.body)
    {
        res.status(200).send({message:"Content cannot be empty to create your account"});
        return;
    }
    const user=new Userdb({
        name: req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        status: req.body.status,
        comments:req.body.comments,

    }) 
    user
    .save(user)
    .then((data)=>{
        //res.send(data);
        res.redirect('/add_user');
    })
    .catch((err)=>{
        res.status(500).send({message: err.message ||"Some unknown error occured while creating your profile"
       });

    });
}

exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data)
            {
                req.status(404).send({message:`cannot found user with ${id}.May be user not found`}
                )
            }
            else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error update user information"})
        })
    }
    Userdb.find().then(user=>{
        res.send(user);
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error retrieving user with id "+id})
    })

}
exports.update=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Data to update cannot be empty"})
        return;
    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
    .then(data=>{
        if(!data)
        {
            req.status(404).send({message:`cannot update user with ${id}.May be user not found`}
            )
        }
        else{
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error update user information"})
    })

}
exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data)
        {
            req.status(404).send({message:`cannot delete user with ${id}.May be id is wrong`}
            )
        }
        else{
            res.send({message:"user deleted sucessfully"});
        }
    })
    .catch(err=>{
        res.status(500).send({message:`couldn't delete user with id ${id}`})
    })

}