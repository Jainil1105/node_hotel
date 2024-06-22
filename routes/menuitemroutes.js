const express = require("express");
const router = express.Router();
const menuitem = require("./../models/menuitem");

router.post("/", async (req, res) => {
  try {
    const menu = req.body;
    const newmenu = new menuitem(menu);
    const menuresponce = await newmenu.save();
    console.log("menu saved");
    res.status(200).json(menuresponce);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const menu = await menuitem.find();
    console.log("menu fetched");
    res.status(200).json(menu);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
