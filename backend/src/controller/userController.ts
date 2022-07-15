import { User } from "../modals/UserModels.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { ErrorHander } from "../utils/errorhandler.js";
import { sendToken } from "../utils/sendToken.js";
import { loginSchema, registerSchema } from "../JioSchema/userValidation.js";
import { gfs, gridfsBucket, upload } from "../config/upload.js";
import userRouter from "../routes/userRoutes.js";

export const UserImage = async (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      const id = req.user._id;
      const user = await User.findByIdAndUpdate(
        id,
        { image: req.file.filename },
        { new: true }
      );
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        data: err,
      });
    }
  });
};

export const getUserProfile = async (req, res, next) => {
  
try {
  const user = await User.findById(req.user.id);
  if(!user.image){
    return next(new ErrorHander("no image", 400));
  }
  gfs.files.findOne(
    {
      filename: user.image,
    },
    (err, file) => {
      const readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(res);
      // res.json({file:file})
    }
  );
} catch (error) {
  res.status(400).json({success:false})
}
    // gfs.files.find().toArray((err, files) => {
    //   // Check if files
    //   if (!files || files.length === 0) {
    //     res.render('index', { files: false });
    //   } else {
    //     files.map(file => {
    //       if (
    //         file.contentType === 'image/jpeg' ||
    //         file.contentType === 'image/png'
    //       ) {
    //         file.isImage = true;
    //       } else {
    //         file.isImage = false;
    //       }
    //     });
    //     res.render('index', { files: files });
    //   }
    // });
};

export const UserRegister = async (req, res, next) => {
  try {
    const { value } = await registerSchema.validateAsync(req.body);
    const { name, email, password } = value;
    const user = await User.create({
      name,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const value = await loginSchema.validateAsync(req.body);
    const { email, password } = value;
    if (!email || !password) {
      return next(new ErrorHander("fill details properly", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHander("invalid credentials", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHander("invalid credentials", 400));
    }
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const test = (req, res, next) => {
  console.log(req.user);
  res.send("hello");
};

export const logout = catchAsyncErrors((req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    success: true,
    message: "logout",
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
  } catch (error) {
    res.status(400).json({
      success:false
    })
  }
});

export const getAllUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find().select({ name: 1 });
  res.status(200).json({
    success: true,
    user,
  });
});
