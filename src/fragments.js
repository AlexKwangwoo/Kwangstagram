export const USER_FRAGMENT = `
    id
    username
    avatar
`;

export const COMMENT_FRAGMENT = `
    id
    text
    user {
        ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const MESSAGE_FRAGMENT = `
    id
    text
    to{
        ${USER_FRAGMENT}
    }
    from{
        ${USER_FRAGMENT}
    }
`


export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post{ 
        id
        location
        caption
        files {
            ${FILE_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
        user {
            ${USER_FRAGMENT}
        }
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            ${USER_FRAGMENT}
        }
        messages{
            ${MESSAGE_FRAGMENT}
        }
    }
`;

//fragment PostParts on Post 여기서 postpars는 상관없다!! on Post 가 중요!!
//예를들어 깁게 접근못한다.. 예를들어 멀리 떨어져있는 post를 가져오는데.. 
//그포스터의 id값을 가져오진 못한다! 무한루프같은거 못하게 막아놓은것이다!
// 이것을 통하면 post의 내용도 user의 내용도 가져올수있다!