const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value) {
                return /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/.test(value) // email checker with regex expression
            },
        message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: String,
    githubLink: String,
    // likedPosts: [{type: mongoose.Schema.objectId, ref: "Post"}],
},{timestamps: true})

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", userSchema)