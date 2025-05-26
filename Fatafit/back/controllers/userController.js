const User = require("../models/User");
const jwt = require("jsonwebtoken");

// إنشاء توكن JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.checkAuth = (req, res) => {
    res.status(200).json({
        isAuthenticated: true,
        user: req.user,
    });
};
// تسجيل مستخدم جديد
// exports.register = async (req, res) => {
//     try {
//         const { fullName, email, password, phonenumber } = req.body;

//         // التحقق من وجود المستخدم مسبقًا
//         const userExists = await User.findOne({ email });
//         if (userExists)
//             return res.status(400).json({ message: "User already exists" });

//         // إنشاء مستخدم جديد
//         const user = await User.create({ fullName, email, password, phonenumber });

//         // إنشاء توكن
//         const token = generateToken(user._id);
//         console.log("Generated Token:", token);
//         // إرسال التوكن في الكوكيز
//         res
//             .cookie("token", token, { httpOnly: true })
//             .status(201)
//             .json({ message: "User registered successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// تسجيل الدخول

// تسجيل الدخول
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "المستخدم غير مسجل في الموقع"});
        }

        // ❗️ التحقق من موافقة الأدمن
        if (!user.isApproved) {
            return res
                .status(403)
                .json({ message: "لم يتم الموافقة على حسابك بعد من قبل الإدارة" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        }

        const token = generateToken(user._id);

        // إرسال الـ Token في الكوكيز
        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(200).json({ message: "تم تسجيل الدخول بنجاح",
            mustChangePassword: user.mustChangePassword
         });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.changePassword = async (req, res) => {
  const userId = req.user._id;
  const { password, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "كلمة المرور الحالية غير صحيحة" });
    }

    user.password = newPassword;
    user.mustChangePassword = false;
    await user.save();

    res.status(200).json({ message: "تم تغيير كلمة المرور بنجاح" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.logout = (req, res) => {
    try {
        // مسح الكوكيز
        res.clearCookie("token");

        // إرجاع استجابة بعد تسجيل الخروج
        res.status(200).json({ message: "تم تسجيل الخروج بنجاح" });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء تسجيل الخروج" });
    }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // لا ترجع كلمة المرور
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};



// GET /api/users/count
exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب عدد المستخدمين", error: err });
  }
};

// GET /api/users/count-by-role/user
exports.getUserCountByRole = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'user' });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب عدد المستخدمين", error: err });
  }
};
