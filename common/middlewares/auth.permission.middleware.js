
exports.minimumPermissionLevelRequired = (required_permission_level) => {
    
    return (req, res, next) => {
            let creator_permission_level = parseInt(req.jwt.permissionLevel);
            if (creator_permission_level <= required_permission_level) {
                return next();
            } else {
                return res.status(401).send({'error': "Unauthorized access"});
            }
        } 
};

exports.validRoleExists = (required_role_id) => {
    return(req, res, next) => {
        if(req.headers['role-id'] && req.headers['role-id'] == required_role_id) {
            return next();
        } else {
            return res.status(400).send({"error": "You must be admin to register or login"});
        }
    }
} 

exports.sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;

    if (req.params.userId === userId) {
        return next();
    } else {
        return res.status(400).send({"error":"You are not permitted to do this action"});
    }
};
