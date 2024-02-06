const express = require("express");
const { createTask, readController, updateController, deleteController } = require("../controller/todoController");
const router = express.Router();

router.post("/create",createTask)
.get("/read",readController)
.put("/update/:id",updateController)
.delete("/delete/:id",deleteController)
exports.router = router;