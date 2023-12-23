const passport = require("passport");
const dotenv = require("dotenv");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("./modals/User.js");

dotenv.config();
const Google_Client_Id = process.env.GOOGLE_CLIENT_ID;
const Google_Client_Secret = process.env.GOOGLE_CLIENT_SECRET;

const Github_Client_Id = process.env.GITHUB_CLIENT_ID;
const Github_Client_Secret = process.env.GITHUB_CLIENT_SECRET;

passport.use(
    new GoogleStrategy(
        {
            clientID: Google_Client_Id,
            clientSecret: Google_Client_Secret,
            callbackURL: "http://localhost:8000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          
          try{
            const existingUser = await User.findOne({id: profile.id})
            if(existingUser){
              return  done(null, profile);
            }

            const newUser = new User({
              id: profile.id,
              displayName: profile.displayName,
              photo: profile.photos[0].value
            })

            await newUser.save()
            done(null,newUser)
          }
          catch(err){
            done(err)
          }
           
        }
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: Github_Client_Id,
            clientSecret: Github_Client_Secret,
            callbackURL: "http://localhost:8000/auth/github/callback",
        },

        async (accessToken, refreshToken, profile, done) => {
          
            try {
                const existingUser = await User.findOne({ id: profile.id });

                if (existingUser)
                 {
                    return done(null, existingUser);
                }

                const newUser = new User({
                    id: profile.id,
                    displayName: profile.displayName,
                    photo: profile.photos[0].value,
                });

                await newUser.save();
                done(null, newUser);
            }
             catch (err) {
                done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
