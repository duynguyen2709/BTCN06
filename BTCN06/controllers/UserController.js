const userModel = require('../models/User');

exports.registerUser = async function (req, res, next) {
    const username = req.body.username;
    let password = req.body.password;

    if (username == null || username === '' || password == null || password === '') {
        res.json({
            message: "THÔNG TIN KHÔNG ĐƯỢC RỖNG. VUI LÒNG NHẬP LẠI."
        })
        return;
    }

    const find = await userModel.getUser(username);
    if (find != null){
        res.json({
            message: "USERNAME ĐÃ TỒN TẠI. VUI LÒNG CHỌN USERNAME KHÁC."
        })
        return;
    }

    const result = await userModel.createUser(username, password);
    if (result.affectedRows === 1){
        res.json({
            message: "TẠO TÀI KHOẢN THÀNH CÔNG"
        })
        return;
    } else {
        res.json({
            message: "TẠO TÀI KHOẢN THẤT BẠI. VUI LÒNG THỬ LẠI."
        })
        return;
    }
}