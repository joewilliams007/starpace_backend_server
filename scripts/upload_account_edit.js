// Edit Account

module.exports = (req, res) => {
    var update_db = require('./update_db');

    session = req.body.session
    replacement = req.body.replacement
    edit_type = req.body.edit_type

    var session = require('./session.js');

    // Authenticate session and ip
    session.verify(session, req, res, function(user_id){
        saveEditAcount(user_id);

    console.log(session+" ID "+user_id)
    })
  
    function saveEditAcount(){

        if (edit_type == "edit-bio") {

            var q = `UPDATE Users set bio = "${replacement}" WHERE user_id = ${user_id}`
            update_db.query(q, res)

        } 
    }
}