const bcrypt = require("bcrypt");

async function main(){
    const orignalPassword = "hello123";
    const incorrectPassword = "hello789";
    bcrypt.hash(orignalPassword,8,function(err,hash){
        if(err){
            console.log("Hashing failed:",err);
            return;
        }
        console.log("Your secure hash is:",hash);
        const hashedPassword = hash;
        bcrypt.compare(orignalPassword,hashedPassword,function(err,result){
            console.log(result);
    });
    bcrypt.compare(incorrectPassword,hashedPassword,function(err,result){
        console.log(result);
    });
    });
}
main();