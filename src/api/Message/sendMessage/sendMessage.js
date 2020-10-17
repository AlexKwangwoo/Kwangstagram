import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";


//roomid가 있으면 전에 방이 만들어졌다는 의미이고 roomid를 통해 participants를 찾는다 
//그리고 if문을 빠져나와 메세지를 만든다
//roomid가 없다면 toid를 입력받아 그사람과의 방을 만들고 if문을 빠져나와 메시지를 추가한다!
export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      if (roomId === undefined) {
        if (user.id !== toId) {//자기자신에게 만들지 않게 하는것!
          room = await prisma.createRoom({ //룸이 없다면 만들고
            participants: {
              connect: [{ id: toId }, { id: user.id }]
              //받는사람과 보내는사람..로그인한사람임!
            }
          }).$fragment(ROOM_FRAGMENT); //participant 가져오기위해 프래그먼트씀!
        }
      } else {// 있다면 그방을 찾고 메세지를 만들것임!
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }
      if (!room) {
        throw Error("Room not found");
      }
      const getTo = room.participants.filter(
        participant => participant.id !== user.id
        )[0];//필터는 결과값을 어레이로 리턴한다.. 결국 내자신이 아닌값을 리턴함!
      return prisma.createMessage({
        //여기서 메시지가 만들어짐
        text:message,
        from:{
          connect: {id:user.id}
        },
        to:{
          connect:{
            id: roomId ? getTo.id : toId
          }
        },
        room: {
          connect:{
            id:room.id
          }
        }
      });
    }
  }
};