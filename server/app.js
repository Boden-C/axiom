const express = require("express");
const app = express();
const port = 5000;
const path = "/api";

app.get(path + "/version", (req, res) => {
    res.json({ version: 0 });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

// app.set("view engine", "ejs");

// app.post("/views/index.ejs", async (req, res) => {
//     const {input_specification, operation_specification, output_specification, operation_options} = req.body

//     const url = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/" + input_specification + "/" + operation_specification + "/[" + output_specification + "][?" + operation_options +"]"
//     const response = await fetch(url);
//     var obj = await response.json();

//     res.send(obj);
// });