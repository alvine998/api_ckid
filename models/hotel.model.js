module.exports = mongoose => {
    const Hotel = mongoose.model(
        "Hotel",
        mongoose.Schema(
            {
                id:String,
                nama_hotel:String,
                bintang:String,
                image:String,
            },
            {
                timestamps:true
            }
        )
    );
    return Hotel;
};