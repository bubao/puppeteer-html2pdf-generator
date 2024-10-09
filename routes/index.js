const express = require("express");
const router = express.Router();
const { handlePdf } = require("../utils/2pdf");

/* GET home page. */
router.get("/", async function (req, res) {
	const pdf = await handlePdf(req.originalUrl.split("?")[1] || "");
	res.setHeader("Content-Type", "application/pdf");
	res.setHeader("Content-Disposition", "attachment; filename=\"xj.pdf\"");
	res.send(Buffer.from(pdf));
});

module.exports = router;
