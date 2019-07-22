import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import { JWT_SECRET } from "../configs";
import { User } from "../user/Model";

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

// auth strategy
const localStrategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: `Email ${email} not found.` });
      }
      user.comparePassword(password, (er: Error, isMatch: boolean) => {
        if (er) {
          return done(er);
        }

        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password." });
        }

        return done(null, user, { message: "Login successfully" });
      });
    });
  },
);
passport.use(localStrategy);

// chwck jwt strategy
const jwtOpts = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};
const jwtStrategy = new JWTStrategy(jwtOpts, (payload, done) => {
  User.findById(payload._id, (err, user: any) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "user can not be found" });
    }
    return done(null, user);
  });
});
passport.use(jwtStrategy);

export const authLocal = passport.authenticate("local", { session: false });
export const authJwt = passport.authenticate("jwt", { session: false });
