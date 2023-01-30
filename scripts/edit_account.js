// Edit Account

module.exports = (req, res) => {

    var db = require('./db');
    var moment = require('moment');
    var update_db = require('./update_db');

    var { session, type, replacement } = req.params;

    console.log(req.params)
  
    var session = require('./session.js');

    // Authenticate session and ip
    session.verify(session, req, res, function(user_id){
        if (type == "username") {
            saveUsername(user_id);
        } else if (type == "email") {
            saveEmail(user_id);
        }
    })


    function saveUsername(user_id) {
        db.query(
            `SELECT COUNT(*) AS RowCount FROM Users WHERE LOWER(username)=LOWER("${replacement}")`
            , function (error, username_results, fields) {
    
                if (error) {
    
                    console.log('check error '+error.message);
                    res.status(200).json({ 
                        success: false,
                        error: true,
                        message: "ok" })
    
                }
    
                console.log(username_results[0].RowCount)
                if (Number(username_results[0].RowCount) == 0) {
    
                    
                        var q = `UPDATE Users set username = "${replacement}" WHERE user_id = ${user_id}`
                        update_db.query(q, res)
        
                        

    
                } else {
    
                    res.status(200).json({ 
                        success: false,
                        error: false,
                        message: "username already taken" }) // Username not accepted, Internal Conflict
    
    
                }
        });
    }

    function saveEmail(user_id) {
        db.query(
            `SELECT COUNT(*) AS RowCount FROM Users WHERE LOWER(email)=LOWER("${replacement}")`
            , function (error, results, fields) {
    
                if (error) {
    
                    console.log('check error '+error.message);
                    res.status(200).json({ 
                        success: false,
                        error: true,
                        message: "ok" })
    
                }
    
                console.log(results[0].RowCount)
                if (Number(results[0].RowCount) == 0) {
    
                    
                        var q = `UPDATE Users set email = "${replacement}" WHERE user_id = ${user_id}`
                        update_db.query(q, res)
        
                        

    
                } else {
    
                    res.status(200).json({ 
                        success: false,
                        error: false,
                        message: "email already taken" }) // Username not accepted, Internal Conflict
    
    
                }
        });
    }
 
}