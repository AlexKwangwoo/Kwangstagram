import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import passport from "passport";//이건 라이브러리에서 가져오는거임!
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
  // secret을 암호화 하기위한 시크릿 코드임
};// JWT는 토큰을 입력받아서 정보를 해석한다!

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};
//done은 우리가 사용자를 찾았을때 호출해야하는 함수임
//verify 함수 안에서 user를 payload의 정보로 찾아야한다
// 사용자를 찾으면 done(null, user)을 리턴하면된다!


export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();//여기 까지 받은 정보로 
    //next다음 밑의 3개를 실행함
})(req, res, next);// 이걸 실행함!
//이 미들웨어가 실행되면 passport.authenticate가 실행됨
// 이함수에서는 passport에 어떤것도 입력되지 않기를 바란다.. 그래서 sessions:false를 추가함
// 첫번째 인자는 error고 두번째 인자는 유저임
// verifyUser에서 사용자를 받은후 사용자가 존재하면 그 사용자 정보를 req객체에 붙여줌
// 즉 토큰을 받아서, 해석하고, 사용자 찾고, 사용자 있으면 req객체에 사용자추가하면
// graphql함수를 실행할것임
// 마지막 req,res,next는 function(req,res,next) 라생각하면됨

passport.use(new Strategy(jwtOptions, verifyUser));
// JWT는 토큰을 입력받아서 정보를 해석한다!
  //그리고 해석된 정보를 콜백 함수로 전달한다!
  //verifyUser

passport.initialize()
// passport.use를 실행하고 이니셜라이즈 를 실행해야함!