// Chat

module.exports = (req, res) => {
    var db = require('./db');
    var authenticate = require('./authenticate');
    var { user_id, password, isGroup, to_id, rows, ids } = req.params;

    current_rows = rows;
    last_row = rows+10;

    // Authenticate user id and password
    authenticate.identify(user_id, password, res, function(isAuthenticate){
        // returns true or false
        if(isAuthenticate) {


            console.log("DELETING MESSAGES")

            var id = ids.split("-");
            id.forEach(element => {

                db.query(
                    `DELETE
                    FROM Chat
                    WHERE to_id = ${user_id} AND from_user_id = ${to_id} AND isGroup = ${isGroup}
                    AND message_id = ${element}`
                
                    , function (error, results, fields) {
                        if (error) console.log(error.message);
    
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: "ok",
                            messages: results
                    })
                });

            });
        }
    })
}