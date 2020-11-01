import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "us-east-2", //아마존에서 아이디 치면 주소끝에 확인가능!
});

//업로드된 파일을 여기에 저장함니다!
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "kwangstagram",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
// multer가 하는일은, 어떤사용자로부터 제출된 form을 받았을때!
// 전달받은 파일을 업로드 시켜 주는것임!
//이것을 통해서 과정 하나하나를 다룰 필요없음!
export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  console.log("파일전송!시도해보자!");
  const {
    file: { location }, //path였는데 location으로 고칭
    //path에서 저장은 location으로 바꼈음.. 아마존 주소로!!
  } = req;
  console.log(location);
  res.json({ location });
};
