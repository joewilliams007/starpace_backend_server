// Feed

module.exports = (req, res) => {
    var { type, row, user_id } = req.params;

    var db = require('./db');
    var {version_name, version_code} = require('./version');
    

        current_rows = row;
        last_row = row+15;
       
        
    if (user_id) {
        console.log("uss")
        if (type == "latest") {
            db.query(
                `SELECT Posts.*, Posts.post_id, Vote.post_id, Vote.vote
                FROM Posts
                LEFT JOIN Vote ON Posts.post_id = Vote.post_id
                GROUP BY Posts.post_id
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
                        feed: results
                })
                });
        } else if (type == "top") {
            db.query(
                `SELECT Posts.*, Posts.post_id, Vote.post_id, Vote.vote
                FROM Posts
                LEFT JOIN Vote ON Posts.post_id = Vote.post_id
                GROUP BY Posts.post_id
                ORDER BY Posts.votes DESC
                LIMIT ${current_rows}, ${last_row}`
                , function (error, results, fields) {
                    if (error) console.log(error.message);
    
                    res.status(200).json({
                        success: true,
                        error: false,
                        message: "ok",
                        version_name: version_name,
                        version_code: version_code,
                        feed: results
                })
                });
        }
    } else { // Deprecated in favor of with user id. (16. Nov 2022) BETA 0.1.7 (build 22) will not include it.
        if (row) {

            current_rows = row;
            last_row = row+10;
           
            if (type == "latest") {
                db.query(
                    `SELECT *
                    FROM Posts
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
                            feed: results
                    })
                    });
            } else if (type == "top") {
                db.query(
                    `SELECT *
                    FROM Posts
                    ORDER BY votes DESC
                    LIMIT ${current_rows}, ${last_row}`
                    , function (error, results, fields) {
                        if (error) console.log(error.message);
        
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: "ok",
                            version_name: version_name,
                            version_code: version_code,
                            feed: results
                    })
                });
            }
    
        } else { // will be deprecated some day (today is october 30 2022 with ca 6 users)
    
            if (type == "latest") {
                db.query(
                    `SELECT *
                    FROM Posts
                    ORDER BY timestamp DESC
                    LIMIT 100`
                    , function (error, results, fields) {
                        if (error) console.log(error.message);
        
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: "ok",
                            version_name: version_name,
                            version_code: version_code,
                            feed: results
                    })
                    });
            } else if (type == "top") {
                db.query(
                    `SELECT *
                    FROM Posts
                    ORDER BY votes DESC
                    LIMIT 100`
                    , function (error, results, fields) {
                        if (error) console.log(error.message);
        
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: "ok",
                            version_name: version_name,
                            version_code: version_code,
                            feed: results
                    })
                });
            }
    
        }
    }
    
}