exports.sessionExists = (req, res, next) => {
    
        if(req.session.id != null) 
            return next();
        else
            return res.status(401).send({'error': "Invalid Session"}); 
};

exports.validSession = (valid_session_id) => {
    return(req, res, next) => {
        if(req.session._id && req.session._id == valid_session_id) {
            return next();
        } else {
            return res.status(400).send({"error": "Unauthorized Access."});
        }
    }
} 

// exports.sessionShouldBeSame = (req, res, next) => {
//     let sessionId = req.session._id;

//     if (sessionId === userId) {
//         return next();
//     } else {
//         return res.status(400).send({"error":"You are not permitted to do this action"});
//     }
// };