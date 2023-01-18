const multer=require('multer');

//start upload code 
const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,path.resolve(__dirname,'../src/',"uploads"))
    },
    filename:function(req,file,cb){
        let fileExtension=path.extname(file.originalname);
        cb(null,file.fieldname+"-"+Date.now()+Math.round(Math.random() * 1E9)+fileExtension)
    }
})
    
const upload=multer({storage:storage,
fileFilter:(req,file,cb)=>{
    if(file.mimetype=="image/png" || file.mimetype=="image/jpeg"){
       cb(null,true)
    }
    else{
        cb(null,false);
         cb(new Error("Only png and jpg format allowed"))
    }
}});
//end upload

module.exports=upload;