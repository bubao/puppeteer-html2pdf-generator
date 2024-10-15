const express = require("express");
const router = express.Router();
const fs = require("fs");
const util = require("util");
const path = require("path");

const pathStat = util.promisify(fs.stat);

const handlePdf = require("../utils/2pdf");
const MyError = require("../utils/error/MyError");

/* GET home page. */
router.get("/pdf/:dirname/:filename", async function (req, res, next) {
	const { filename, dirname } = req.params;
	try {
		// 检查文件名是否以 .pdf 结尾
		if (!filename.endsWith(".pdf")) {
			throw new MyError(40001);
		}

		if (dirname) {
			const state = await pathStat(path.join(__dirname, `../pdf/${dirname}/index.html`))
				.catch(() => {
					throw new MyError(40001);
				});

			if (!state.isFile()) {
				throw new MyError(40001);
			}
		}

		const pdf = await handlePdf(dirname, req.originalUrl.split("?")[1] || "");
		res.setHeader("Content-Type", "application/pdf");
		res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
		res.send(Buffer.from(pdf));
	} catch (error) {
		next(error);
	}
});

module.exports = router;
