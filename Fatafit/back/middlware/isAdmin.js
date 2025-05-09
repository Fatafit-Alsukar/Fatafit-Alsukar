const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // المستخدم أدمن
    } else {
        return res.status(403).json({
            success: false,
            message: 'صلاحية مرفوضة. هذا القسم مخصص للمسؤول فقط',
        });
    }
};

module.exports = isAdmin;
