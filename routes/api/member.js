const express = require('express')
const router = express.Router();
const member = require('../../members');
const uuid = require('uuid');

//api routes all members
router.get('/', (req, res) => res.json(member))



//get singel members
router.get('/:id', (req, res) => {
    const found = member.some(member =>member.id === parseInt(req.params.id));
    if (found){
        res.json(member.filter(member =>member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json(req.params.id + ' Not Found !!!')
    }
})

router.post('/',(req,res) => {
    const newMember = {
        id : uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status : 'active'
    }

    if (!newMember.name || !newMember.email){
       return  res.status(400).send({msg : 'Empty name or email'});
    }
    member.push(newMember)
    return res.send(member)
})

module.exports = router;

