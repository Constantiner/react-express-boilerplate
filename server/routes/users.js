import express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
	res.json({
		username: "constantiner",
		firstName: "Konstantin",
		lastName: "Kovalev"
	});
});

export default router;
