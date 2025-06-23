const express = require('express');
const blogController = require('../controllers/blogs');
const {verify, verifyAdmin} = require("../auth");

const router = express.Router()

router.post("/", verify, blogController.createPost);
router.post("/:postId/comment", verify, blogController.AddComment);
router.get("/all", blogController.GetAllPost);
router.get("/:postId", blogController.GetSinglePost);
router.patch("/:postId/update", verify, blogController.UpdatePost);
router.delete("/:postId/delete", verify,verifyAdmin, blogController.DeletePost);
router.delete("/:postId/deletecomment/:commentId",verify,verifyAdmin, blogController.DeleteComment);

module.exports = router;