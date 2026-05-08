const express = require('express');
const router = express.Router();




router.route('/').get ((req, res) =>{
    res.send('User List');
}).post((req, res)=>{
    const firstName  = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const gender = req.body.gender;
    const isValid = firstName && lastName && age !=="";
    if(isValid){
        console.log(`Adding user: ${firstName},${lastName},${age},${gender}`)
        users.push({firstName,lastName,age,gender});
        res.render('users/list', {users});
    }
    else{
        console.log("Error adding user")
        res.send("users/new", {firstName:firstName})
    }
});
router.get('/list', (req,res) =>{
    res.render('users/list',{users})
});
router.get('/new', (req, res)=>{
    res.render('users/new', {firstName:"first"})

});
//router.get('/:id', (req, res)=>{
    //res.send(`Getting user Data: ${req.params.id}`);
//});
router.route('/:id').get((req, res)=>{
    console.log(req.user);
    console.log('Getting user data!')
    res.render('users/Info', {user: req.user});
}).delete((req, res)=>{
    res.send(`Deleting User data for id: ${req.params.id}`); 
}).put((req, res)=>{
    res.send(`Updating User data for id: ${req.params.id}`);
});

const users = [{firstName:"Joshua", lastName:"Santana", age: 27, gender: "male"}, {firstName:"Katie", lastName:"Owens", age:24, gender:"female"}]
router.param("id", (req, res, next, id) =>{
    req.user = users[id];
    next();
});

module.exports = router;