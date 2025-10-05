const multer=require('multer')

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // const filename=`image-${Date.now()},${file.filename}` 
    const filename = `image-${Date.now()}-${file.originalname}`;
    cb(null, filename)
  }
})

// filters
const fileFilter=(req,file,cb)=>{
    if(file.mimetype ==='image/png' || file.mimetype ==='image/jpg' || file.mimetype === 'image/jpeg')
    {
      cb(null,true)
    }
    else{
      cb(new Error('Only jpg,png and jpeg format allowed'))
    }
}

const productUpload=multer({
storage,fileFilter 
})

module.exports=productUpload;