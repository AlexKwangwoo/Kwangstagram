import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT"
const DELETE = "DELETE";

export default {
  Mutation: {
    editPost: async(_, args, {request, isAuthenticated}) => {
      isAuthenticated(request);
      const{ id, caption, location, action } =args;
      const {user} = request;
      const post = await prisma.$exists.post({id, user:{id:user.id}});
      if(post){//포스터 주인이 맞으면 EDIT할수있다!
        if(action === EDIT ){//action에 enum으로 edit과delete가 있다!
          return prisma.updatePost({
            data: {caption, location}, 
            where:{id}
          });
        }else if(action === DELETE){
          return prisma.deletePost({id})
        }
      }else{
        throw Error("You can't do that");
      }
    }
  }
}