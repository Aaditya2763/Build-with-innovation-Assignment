const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  fetchUser,
  userProfile,
  updateProfile,
  updatePassword,
  unfollowUserCtrl,
  blockUserCtrl,
  unblockUserCtrl,
  followingUserCtrl,
  verifyAccount,
  geverateVerifyAccountToken,
  generatePasswordResetToken,
  changePasswordCtrl,
  userProfileUpdateCtrl,
} = require("../../controllers/users/usersController");

const { authMiddleware } = require("../../middleware/auth/authMiddleWare");

const { userProfileUpload,profilePhotoResize } = require("../../middleware/upload/profilePhotoUpload");

/*------------------------All users--------------------------------*/
router.route("/").get( getAllUsers);

/*------------------------user routes--------------------------------*/
router.route("/:id").get(fetchUser).delete(deleteUser);

/*-----------------UserProfile----------*/

router.route("/profile/:id").get(authMiddleware, userProfile);
router.route("/profile").put(authMiddleware, updateProfile);
// single('name') is same as it is mentioned it as key
router.route("/profile-photo-upload").put(authMiddleware,userProfileUpload.single('image'),profilePhotoResize,userProfileUpdateCtrl)

/*----------------- change Userpassword----------*/
router.route("/password").put(authMiddleware, updatePassword);

module.exports = router;

/*-----------------followingUsers----------*/
router.route("/follow").put(authMiddleware, followingUserCtrl);

/*-----------------unfollowingUsers----------*/
router.route("/unfollow").put(authMiddleware, unfollowUserCtrl);

/*-----------------BlockUser----------*/
router.route("/block-user/:id").put(authMiddleware, blockUserCtrl);

/*-----------------unBlockUser----------*/
router.route("/unblock-user/:id").put(authMiddleware, unblockUserCtrl);

/*-----------------generate email Account vewrification token----------*/
router
  .route("/generate-varify-email-token")
  .post(authMiddleware, geverateVerifyAccountToken);

/*-----------------Verify email Account----------*/
router
  .route("/verify-account/:verificationToken")
  .post( authMiddleware,verifyAccount);


  /*-----------------generate password resset token----------*/
router
.route("/forget-password-token/")
.post(generatePasswordResetToken);


/*-----------------change password route----------*/
router
  .route("/reset-password/:verificationToken")
  .post(changePasswordCtrl);

  

  module.exports=router;
