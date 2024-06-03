require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler")

const PORT = 3500;
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/buku", require("./routes/route-buku"));
app.use("/cabang-toko", require("./routes/route-cabang_toko"));
app.use("/pegawai", require("./routes/route-pegawai"));
app.use("/promo", require("./routes/route-promo"));
app.use("/user", require("./routes/route-user"));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use("*", (req, res) => {
    res.status(404).json({ error: "Access Not Available!" });
});

app.use(errorHandler)


// Export the Express API
module.exports = app;
