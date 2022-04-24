var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuidv1");
const { ObjectId } = mongoose.Schema;
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 25,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 25,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    subscriptions: {
      type: Array,
      default: [],
    },
    save_to_watch_later: {
      type: Array,
      default: [],
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    is_authorised: {
      type: Boolean,
      default: false,
    },
    channel_created: {
      type: Boolean,
      default: false,
    },
    channel_id: {
      type: ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

// he virtually password set navata kela tu
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });
// ==== end ====
//kalal mi lihla hot adhi ha code but

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
