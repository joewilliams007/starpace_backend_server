// Profile

module.exports = (req, res) => {
    var { user_id, row } = req.params;

    current_rows = row;
    last_row = row+10;

    var db = require('./db');
    var {version_name, version_code} = require('./version');

    if (row) {

        current_rows = row;
        last_row = row+15;

                        

    
                db.query(
                    `SELECT *
                    FROM Posts
                    WHERE user_id = ${user_id}
                    ORDER BY timestamp DESC
                    LIMIT ${current_rows}, ${last_row}`
                    , function (error, results, fields) {
                        if (error) console.log(error.message);
            
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: "ok",
                            version_name: version_name,
                            version_code: version_code,
                            post: results
                    })
                });
    
    
            

    } else { // This will be deprecated. Today is 30 october

        db.query(
            `SELECT *
            FROM Posts
            WHERE user_id = ${user_id}
            ORDER BY timestamp DESC`
            , function (error, results, fields) {
                if (error) console.log(error.message);

                res.status(200).json({
                    success: true,
                    error: false,
                    message: "ok",
                    version_name: version_name,
                    version_code: version_code,
                    post: results
            })
        });
    }

}