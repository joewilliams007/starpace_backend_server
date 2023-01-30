// Upload Text Post

module.exports = (req, res) => {

    var moment = require('moment');
    var db = require('./db');
    var timestamp = Math.floor(new Date().getTime() / 1000) // in seconds

    session = req.body.session

    var session = require('./session.js');



    body = req.body.body
    to_id = req.body.to_id
    type = req.body.type
    isGroup = req.body.isGroup
    isQuote = req.body.isQuote
    quoted_user_id = req.body.quoted_user_id
    quoted_body = req.body.quoted_body
    quoted_type = req.body.quoted_type
    link = req.body.link
    isImage = 0
    image_path = null
    device_type = req.body.device_type
    
    console.log(req.body)

    // Authenticate session and ip
    session.verify(session, req, res, function(user_id){
        storeMessage(user_id);
    })
    function storeMessage(user_id){

        db.query(
            `INSERT INTO Chat (
                to_id, from_user_id, type, timestamp, body, device_type, isGroup, isQuote, quoted_user_id, quoted_body, quoted_type, link, isImage, image_path) 
        VALUES (${to_id},${user_id},"${type}",${timestamp},"${body}","${device_type}",${isGroup},${isQuote},${quoted_user_id},"${quoted_body}","${quoted_type}","${link}",${isImage},"${image_path}")`
            , function (error, results, fields) {

                if (error) {

                    console.log('database error ' + error.message);
                    res.status(200).json({
                        success: false,
                        error: true,
                        message: "error"
                    })
        
                } else {
                    res.status(200).json({
                        success: true,
                        error: false,
                        message: "success"
                    })
                    
                }

        })

    
    }
}