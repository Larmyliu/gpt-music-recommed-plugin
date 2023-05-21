import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`https://v1.jinrishici.com/all.json`)
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "error making request",
    });
  }
});

export default router;