const blog = require("../models/blogs");
const {errorHandler} = require("../auth");

module.exports.createPost = (req, res) => {

	let newBlog = new blog({

		title: req.body.title,
		content: req.body.content,
		author: req.user.id
 
	})
 
	if(req.body.title === '' || req.body.content === '') {
		return res.status(400).send({ message: 'Title and content must not be empty'})
	}

	return newBlog.save()
	.then(post => {
		res.status(201).send({ message: "Post created successfully"})
	})
	.catch(error => errorHandler(error, req,res))


}

module.exports.AddComment = (req, res) => {
    const { comment } = req.body;
    
    if (!req.body.comment) {
        return res.status(400).send({ message: "Comment cannot be empty" });
    }

    blog.findById(req.params.postId)
        .then(post => {
            if (!post) {
                return res.status(404).send({ message: "Post not found" });
            }

            const newComment = {
                user: req.user.id, 
                comment: comment,
                createdAt: new Date()
            };

            post.comments.push(newComment); 

            return post.save();
        })
        .then(updatedPost => {
            res.status(201).send({ message: "Comment added successfully", comments: updatedPost.comments });
        })
        .catch(error => errorHandler(error, req, res));
};

module.exports.GetAllPost = (req, res) => {

	return blog.find({})
	.then(result => {
		if(result.length > 0) {
			return res.status(200).send(result)
		} else {
			return res.status(404).send({ message: "No posts found"})
		}
	})
	.catch(error => errorHandler(error, req,res));
};

module.exports.GetSinglePost = (req, res) => {

	return blog.findById(req.params.postId)
	.then(post => {

		if(post) {
			return res.status(200).send(post);
		} else {
			return res.status(404).send({ message: 'No post found'})
		}
	})
	.catch(error => errorHandler(error, req, res))
}

module.exports.UpdatePost = (req, res) => {

	let updatedBlog = {
		title: req.body.title,
		content: req.body.content
	}

	return blog.findByIdAndUpdate(req.params.postId, updatedBlog, {new: true})
	.then(post => {
		if(post) {
			res.status(200).send(post)
		} else {
			res.status(404).send({ message: "No post found"})
		}
	})
}

module.exports.DeletePost = (req, res) => {
    blog.findById(req.params.postId)
        .then(post => {
            if (!post) {
                return res.status(404).send({ message: "Post not found" });
            }

            if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
                return res.status(403).send({ message: "Unauthorized to delete this post" });
            }

            return blog.findByIdAndDelete(req.params.postId); 
        })
        .then(deletedPost => {
            if (!deletedPost) {
                return res.status(404).send({ message: "Post already deleted or not found" });
            }
            res.status(200).send({ message: "Post successfully deleted" });
        })
        .catch(error => errorHandler(error, req, res));
};

module.exports.DeleteComment = (req, res) => {
    const { postId, commentId } = req.params;

    blog.findById(postId)
        .then(post => {
            if (!post) {
                return res.status(404).send({ message: "Post not found" });
            }

            const comment = post.comments.id(commentId);
            if (!comment) {
                return res.status(404).send({ message: "Comment not found" });
            }

            if (comment.user.toString() !== req.user.id && !req.user.isAdmin) {
                return res.status(403).send({ message: "Unauthorized to delete this comment" });
            }
 
            post.comments = post.comments.filter(c => c._id.toString() !== commentId);
 
            return post.save();
        })
        .then(updatedPost => { 
            res.status(200).send({ message: "Comment successfully deleted", comments: updatedPost.comments });
        })
        .catch(error => errorHandler(error, req, res));
};