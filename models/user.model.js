module.exports = mongoose => {
    const User = mongoose.model(
        "User",
        mongoose.Schema(
            {
                id:String,
                nama:String,
                email:String,
                nohp:String,
                password:String
            },
            {
                timestamps:true
            }
        )
    );
    return User;
};