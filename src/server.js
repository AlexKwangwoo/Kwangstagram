import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import passport, { authenticate } from "passport";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";


// sendSecretMail("bnc3049@gmail.com", "123");

const PORT = process.env.PORT || 5000;
// dotenv 를 이용해 env에서 포트 번호라던지 메일 패쓰워드가 들어온다

const server = new GraphQLServer({ 
  schema, 
  context:({request}) => ({request, isAuthenticated}) // req에 request만 빼서 그 오브젝트를
  //context에 객체 값으로 줌.. 

  // 여기서의 req는 passport의 req랑 다름.. context의 req객체에 담기는
  //정보중 하나가 passport의 req객체와 같아질것임!
  // req안에있는 request가 필요함!!
});
// const server = new GraphQLServer({ schema, context });
// context는 resolver사이에서 정보를 공유할때 사용함

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
// server.express.use(passport.authenticate("jwt"));
// 모든경로를 jwt로 보호함!!
// 서버에 전달되는 모든 요청은 이 authenticateJwt함수를 통과한다!

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);