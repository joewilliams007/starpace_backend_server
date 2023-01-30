//  Main file of Starspace Server

const rateLimit = require('express-rate-limit')
const express = require("express")
const port = 2000;
var multer = require("multer");
var upload = multer({ dest: "./uploads/" });
const app = express();
var cors = require("cors")
app.use(cors())
const limiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 minutes
	max: 4000, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.listen(port, () => console.log("Server startet at port ", port));

const threeLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 20 minutes
	max: 3, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const tenLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


const longTimeRegistartionLimiter = rateLimit({
	windowMs: 240 * 60 * 1000, // 120 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const voteLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const twentyLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 20, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const fiftyLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 minutes
	max: 50, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const hundredLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const fivehundredLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 20000, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(express.json())
// GET REQUEST
app.get("/register/:username/:email/:password", threeLimiter, longTimeRegistartionLimiter, require("./scripts/register.js")) // Registration
app.get("/check/:username", fiftyLimiter, require("./scripts/check.js")) // Username Availibility
app.get("/login/:identification/:password", tenLimiter, require("./scripts/login.js")) // Login
app.get("/feed/:type/:row?/:user_id?", fivehundredLimiter, require("./scripts/feed.js")) // Feed
app.get("/hashtag/:type/:tag", fivehundredLimiter, require("./scripts/hashtag.js")) // Hashtag
app.get("/posts/:user_id/:row?", hundredLimiter, require("./scripts/profile_posts.js")) // Profile Posts
app.get("/profile/:user_id", fivehundredLimiter, require("./scripts/profile.js")) // Profile
app.get("/image/:path", fivehundredLimiter, require("./scripts/image.js")) // Profile
app.get("/post/:post_id", fivehundredLimiter, require("./scripts/post.js")) // Post
app.get("/username-to-userid/:username", fivehundredLimiter, require("./scripts/username_to_userid.js")) // username to user id
app.get("/comments/:post_id", fivehundredLimiter, require("./scripts/get_comments.js")) // Get Comments of Post
app.get("/vote-status/:session/:post_id", fivehundredLimiter, require("./scripts/get_vote_status.js")) // Get Vote Status
app.get("/vote/:session/:post_id/:direction", voteLimiter, require("./scripts/vote.js")) // Vote a post
app.get("/vote-comment/:session/:comment_id/:direction", voteLimiter, require("./scripts/vote-comment.js")) // Vote a comment
app.get("/vote-poll/:session/:post_id/:item", voteLimiter, require("./scripts/vote-poll.js")) // Vote a poll
app.get("/delete/:session/:post_id", twentyLimiter, require("./scripts/delete_post.js")) // Delete post
app.get("/report/:session/:type/:post_id/:comment_id", twentyLimiter, require("./scripts/report.js")) // Report
app.get("/delete-comment/:session/:post_id/:comment_id", twentyLimiter, require("./scripts/delete_comment.js")) // Delete comment
app.get('/update', twentyLimiter, function (req, res) { 
	res.download('/home/joe/AndroidStudioProjects/StarSpace/app/release/app-release.apk') 
	console.log("somebody is uploading or updating the app ...")});

app.get("/update-info", hundredLimiter, require("./scripts/update-info.js")) // Update Information
app.get("/notif/:session/:type", fivehundredLimiter, require("./scripts/get_notif.js")) // Get Notifications
app.get("/pushnotif/:session", require("./scripts/push_notif.js")) // Get Push Notifications
app.get("/notifview/:session/:notif_id", fivehundredLimiter, require("./scripts/view_notif.js")) // View Notifications
app.get("/users-group/:type/:action_id", fivehundredLimiter, require("./scripts/user.js")) // Get Users - Example for stars etc
app.get("/notif-amount/:session", fivehundredLimiter, require("./scripts/notif_amount.js")) // Get count of Notifs
app.get("/search/:type/:search", fivehundredLimiter, require("./scripts/search.js")) // Search Tags
app.get("/edit-account/:session/:type/:replacement", tenLimiter, require("./scripts/edit_account.js")); // edit-username

// GET CHAT
app.get("/chat/:session/:isGroup/:to_id", fivehundredLimiter, require("./scripts/get_chat.js")) // Get New Chat messages
app.get("/clear-seen-chat/:session/:isGroup/:to_id/:ids", fivehundredLimiter, require("./scripts/clear_seen_chat.js")) // Get New Chat messages

// POST REQUEST
app.post("/upload-profile-picture", upload.array("file"), tenLimiter, require("./scripts/upload_profile_picture.js")); // Upload Profile Picture
app.post("/upload-post-poll", upload.array("file"), tenLimiter, require("./scripts/upload_post_poll.js")); // Upload Post Poll
app.post("/upload-post-image", upload.array("file"), tenLimiter, require("./scripts/upload_post_image.js")); // Upload Post Image
app.post("/upload-post-text", upload.array("file"), tenLimiter, require("./scripts/upload_post_text.js")); // Upload Post Text
app.post("/upload-comment-text", upload.array("file"), tenLimiter, require("./scripts/upload_comment_text.js")); // Upload Comment Text
app.post("/upload-comment-image", upload.array("file"), tenLimiter, require("./scripts/upload_comment_image.js")); // Upload Comment Image
app.post("/upload-post-edit", upload.array("file"), tenLimiter, require("./scripts/upload_post_edit.js")); // Upload Edit Post Text
app.post("/upload-account-edit", upload.array("file"), tenLimiter, require("./scripts/upload_account_edit.js")); // Upload Edit Account Text (biography)

// POST CHAT
app.post("/upload-chat-text", upload.array("file"), tenLimiter, require("./scripts/chat_text.js")); // Upload Chat

process.on('uncaughtException', err => {
	console.error(err && err.stack)
});

