const express = require("express");
const router = express.Router();
const CMSpagesModel = require("../Models/CmsPages");

router.post("/insertCMS", async (req, res) => {
  try {
    let { body } = req;
    // Json creation for storing it in database
    let payload = {
      Title: body.Title,
      Content: body.Content,
    };
    const data = await CMSpagesModel.find({Title: body.Title});
    if (data.length > 0) {
      res
        .status(409)
        .json({ error: "Data is already exists with the same Title name" });
    } else {
      await CMSpagesModel.create(payload)
        .then((savedUser) => {
          // Handle successful save
          res.json({
            status: 200,
            data: savedUser,
          });
        })
        .catch((error) => {
          // Handle error
          console.log("error", error);
        });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/updateCMS", async (req, res) => {
  try {
    let { body } = req;
    // Json creation for storing it in database
    let payload = {
      Title: body.Title,
      Content: body.Content,
    };

    // update the data in database
    let whereQuery = { Title: body.Title };
    await CMSpagesModel.findOneAndUpdate(whereQuery, payload, { new: true })
      .then((savedUser) => {
        // Handle successful save
        res.json({
          status: 200,
          data: savedUser,
        });
      })
      .catch((error) => {
        // Handle error
        console.log("error", error);
      });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/CMS", async (req, res) => {
  try {
    const pages = await CMSpagesModel.find();
    res.json({
      status: 200,
      data: pages,
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


module.exports = router;
