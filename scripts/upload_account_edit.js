// Edit Account

module.exports = (req, res) => {
    var update_db = require('./update_db');

    session = req.body.session
    replacement = req.body.replacement
    edit_type = req.body.edit_type

    var session_app = require('./session.js');

    console.log(session+" ID "+user_id)

    // Authenticate session and ip
    session_app.verify(session, req, res, function(user_id){
        saveEditAcount(user_id);
    })
  
    function saveEditAcount(){

        if (edit_type == "edit-bio") {

            var q = `UPDATE Users set bio = "${replacement}" WHERE user_id = ${user_id}`
            update_db.query(q, res)

        } 
    }
}