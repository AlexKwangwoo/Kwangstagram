import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [// user와 post존재를 확인하는것이다!
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      }

      try {
        const existingLike = await prisma.$exists.like(filterOptions)
          // like 존재의 여부를 알수있다! 이건 document의 신택스이다!
          // user와 post존재를 확인하는것이다!

        if (existingLike) {//존재하면 좋아요를 지울것임!
          await prisma.deleteManyLikes(filterOptions) //필터같은 기능이다.. 
            //유저id와 postid를 들고있는 manylikes를 지울것임!
            // 내가준 like를 찾을거고 그걸 삭제할것임
            
        } else { // 존재 안하면 좋아요를 추가할것고
          await prisma.createLike({//라이크를 만드는 과정이라 connect가 필요함
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};