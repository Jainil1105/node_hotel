const express = require("express");
const router = express.Router();
const person = require("./../models/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);

    //callback function is not a good option to use in post methon to store data
    //rather then we use async await function which is good and easier to work
    //save the new person to data base
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:work", async (req, res) => {
  try {
    const work = req.params.work;
    if (work == "chef" || work == "waiter" || work == "manager") {
      const response = await person.find({ work: work });
      console.log("responce fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid worktype" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personid = req.params.id;
    const updatepersondata = req.body;

    const response = await person.findByIdAndUpdate(
      personid,
      updatepersondata,
      {
        new: true,
        runValidators: true,
      }
    );

    if(!response){
      return res.status(404).json({error: 'Person not found'})
    }

    console.log("responce updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});


router.delete('/:id', async (req, res)=>{
  try{
    const personid = req.params.id;
    const response = await person.findByIdAndDelete(personid)

    if(!response){
      return res.status(404).json({error: 'Person not found'})
    }

    console.log('data deleted')
    res.status(200).json({message: 'person deleted succesfully'}) 


  }catch(err){
    console.log(err);
    res.status(500).json({ error: "internal server error" }); 
  }
})
module.exports = router;