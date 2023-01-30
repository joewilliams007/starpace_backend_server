// Chat

module.exports = (req, res) => {
    var db = require('./db');
    var authenticate = require('./authenticate');
    var { user_id, password, isGroup, to_id, rows } = req.params;

    current_rows = rows;
    last_row = rows+10;

    // Authenticate user id and password
    authenticate.identify(user_id, password, res, function(isAuthenticate){
        // returns true or false
        if(isAuthenticate) {

            if (isGroup == "0") {

                console.log("GETTING MESSAGES")

                db.query(
                    `SELECT *
                    FROM Chat
                    WHERE to_id = ${user_id} AND from_user_id = ${to_id} AND isGroup = false OR to_id = ${to_id} AND from_user_id = ${user_id} AND isGroup = false
                    ORDER BY timestamp DESC`
                
                    //    LIMIT ${current_rows}, ${last_row}  LIMIT WILL BE 1,6 -> rows 1-6 http://localhost:2000/chat/1/johannw2004/0/1/0,10
                    , function (error, results, fields) {
                        if (error) console.log(error.message);

                        console.log(to_id+" Reuquested by "+user_id)

                        res.status(200).json({
                            success: true,
                            error: false,
                            message: "ok",
                            messages: results
                    })
                });

            } else {

                db.query(
                    `SELECT *
                    FROM Chat
                    WHERE to_id = ${user_id} AND from_user_id = ${to_id} AND isGroup = true OR to_id = ${to_id} AND from_user_id = ${user_id} AND isGroup = true
                    ORDER BY timestamp DESC`
                    , function (error, results, fields) {
                        if (error) console.log(error.message);
        
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: "ok",
                            messages: results
                    })
                });


            }

            

        }
    })
}