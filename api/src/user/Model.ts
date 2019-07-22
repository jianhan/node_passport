import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import validator from "validator";
import { JWT_SECRET } from "../configs";

// export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export interface AuthJSON {
  _id: string;
  email: string;
  token: string;
}

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;

  facebook: string;
  tokens: AuthToken[];

  profile: {
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
  };

  comparePassword: comparePasswordFunction;
  createToken: () => string;
  toAuthJSON: () => AuthJSON;
  gravatar: (size: number) => string;
}

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => {},
) => void;

export interface AuthToken {
  accessToken: string;
  kind: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required!"],
      trim: true,
      index: true,
      validate: {
        validator(email: string) {
          return validator.isEmail(email);
        },
      },
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      trim: true,
      minlength: [6, "Password need to be longer!"],
      // validate: {
      //   validator(password: string) {
      //     return passwordReg.test(password);
      //   },
      // },
    },
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
      name: String,
      gender: String,
      location: String,
      website: String,
      picture: String,
    },
  },
  { timestamps: true },
);

userSchema.plugin(uniqueValidator, {
  message: "{VALUE} already taken!",
});

userSchema.pre("save", function save(next: any) {
  const user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(
      user.password,
      salt,
      (): void => {},
      (er: mongoose.Error, hash: string) => {
        if (er) {
          return next(er);
        }
        user.password = hash;
        next();
      },
    );
  });
});

const comparePassword: comparePasswordFunction = function(
  candidatePassword,
  cb,
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: mongoose.Error, isMatch: boolean) => {
      cb(err, isMatch);
    },
  );
};
userSchema.methods.comparePassword = comparePassword;

userSchema.methods.createToken = function() {
  return jwt.sign(
    {
      _id: this._id,
    },
    JWT_SECRET,
  );
};

userSchema.methods.toAuthJSON = function(): AuthJSON {
  return {
    _id: this._id,
    email: this.email,
    token: this.createToken(),
  };
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function(size: number = 200) {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto
    .createHash("md5")
    .update(this.email)
    .digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const User = mongoose.model<UserDocument>("User", userSchema);
