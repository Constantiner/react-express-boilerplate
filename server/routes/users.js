import express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/me", function(req, res) {
	res.json({
		homePage: "https://github.com/Constantiner",
		firstName: "Konstantin",
		lastName: "Kovalev"
	});
});

export default router;
