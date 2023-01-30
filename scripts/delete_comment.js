// Feed

module.exports = (req, res) => {
    var { session } = req.params;
    var { comment_id } = req.params;
    var { post_id } = req.params;

    var db = require('./db');
    var fs = require('fs');

    var session = require('./session.js');

    // Authenticate session and ip
    session.verify(session, req, res, function(user_id){
        db.query(
            `SELECT *
            FROM Comments
            WHERE user_id=${user_id}
            AND comment_id = ${comment_id}`
            , function (error, results, fields) {
                if (error) console.log(error.message);
            
                var db_res = JSON.parse(JSON.stringify(results))
                var filePath = "./uploads/"+db_res[0].image_path; 

                if (filePath != "-") {
                    fs.unlinkSync(filePath);    
                }
                  
            
            })


        db.query(
            `DELETE
            FROM Comments
            WHERE user_id=${user_id}
            AND comment_id = ${comment_id}`
            , function (error, results, fields) {
                if (error) {
                    console.log(error.message);
                    res.status(200).json({
                        success: false,
                        error: true,
                        message: error.message
                })
                } else {

                    db.query(
                        `UPDATE Posts set comments = comments - 1 WHERE post_id = ${post_id}`
                        , function (error, results, fields) {

                            res.status(200).json({ 
                                success: true,
                                error: false,
                                message: "ok" })
                    });
            
                            
                }
        });
    })
}