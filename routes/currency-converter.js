var express = require("express");
var router = express.Router();


router.all("/", function (req, res, next) {
  if (req.method == "POST") {
    const { body } = req;
    // key is private
    const key = "";
    const targetCode = body.from.substring(0, 3);
    const baseCode = body.to.substring(0,3);
    const url = `https://v6.exchangerate-api.com/v6/${key}/pair/${baseCode}/${targetCode}/${body.amount}`;
    console.log(body)
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const results = {
          from: `${body.amount} ${body.from.substring(6)}`,
          to: `${data.conversion_result} ${body.to.substring(6)}`,
          rate: `1 ${body.to} = ${data.conversion_rate}`,
        };
        res.render("currency-converter", { data: results });
      })
      .catch((error) => console.log(error));
   } else {
     res.render("currency-converter", { data: null });
   }
});

module.exports = router;
