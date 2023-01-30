// Upload Text Post

module.exports = (req, res) => {

    var moment = require('moment');
    var date = moment().format('YYYY-MM-DD');
    var db = require('./db');
    var notif = require('./notif');
    var authenticate = require('./authenticate');
    var update_db = require('./update_db');
    var timestamp = Math.floor(new Date().getTime() / 1000) // in seconds


    const sharp = require('sharp');
    var fs = require('fs');
    const bcrypt = require('bcrypt');

       session = req.body.session

    var session_app = require('./session.js');

    // Authenticate session and ip
    session_app.verify(session, req, res, function(user_id){
        saveEditPost(user_id);
    })
    content = req.body.content
    post_id = req.body.post_id


    // Authenticate user id and password
    authenticate.identify(user_id, password, res, function(isAuthenticate){
        // returns true or false
        if(isAuthenticate) {
            savePostImage();
        }
    })

    function savePostImage(){

        sharp("./uploads/" + req.files[0].filename)
        .jpeg({ progressive: true, force: false, quality: 10 })
        .png({ progressive: true, force: false, quality: 10 })
        .resize(1000)
        .webp({ quality: 10 })
        .toFile("./uploads/" + req.files[0].filename + ".webp", (err, info) => {

            fs.unlinkSync("./uploads/" + req.files[0].filename)
            var newPath = between(0, 100) + "-" + user_id + "-" + req.files[0].originalname
            fs.rename("./uploads/" + req.files[0].filename + ".webp", "./uploads/" + newPath, function (err) {
                if (err) console.log('ERROR: ' + err);

                db.query(
                    `INSERT INTO Comments (user_id, post_id, comment, link, timestamp, image, image_path, comment_created) 
            VALUES (${user_id},${post_id},"${content}","-",${timestamp},false, "${newPath}","${date}")`
                    , function (error, results, fields) {
                        if (error) {
        
                            console.log('post error ' + error.message);
                            res.status(200).json({
                                success: false,
                                error: true,
                                message: "error storing to database"
                            })
        
                        } else {
        
                            console.log('post successfull');
        
        
                            db.query(
                                `UPDATE Posts set comments = comments + 1 WHERE post_id = ${post_id}`
                                , function (error, results, fields) {
                                });
        
                                db.query(
                                    `SELECT user_id FROM Posts WHERE post_id = ${post_id}`
                                    , function (error, results, fields) {  
                                        if (error) console.log(error)
                                        console.log("request notif")
                                        // User id of post creator - Post id - User id of comment creator - type
                                        notif.notif(results[0].user_id,post_id,user_id,"comment"); // Notif new Comments on post (for creator of post)
                    
                                });
        
                                var args = content.split(" ")
        
                                args.forEach(arg => {
                                    if (arg.split("")[0] == "@") {
        
                                        console.log("mention "+content.split(" ")[0])
            
                                        db.query(
                                            `SELECT user_id FROM Users WHERE LOWER(username) = LOWER("${arg.slice(1)}")`
                                            , function (error, results, fields) {  
                                                if (error) console.log(error)
                                                console.log("request notif username "+arg.slice(1)+" user id "+results[0].user_id)
                                                // User id of post creator - Post id - User id of comment creator - type
                                                notif.notif(results[0].user_id,post_id,user_id,"mention"); // Notif new Comments on post (for creator of post)
                            
                                        });
            
                                    }
            
                                });
        
                                
                            res.status(200).json({
                                success: true,
                                error: false,
                                message: "post success"
                            })
                        }
        
                    });
        
        

            });


        })

    
    }

    function between(min, max) {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }

}