import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// //schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is require']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, ' email is require'],
        unique: true,
        validate: validator.isEmail

    },
    password: {
        type: String,
        required: [true, 'password is require'],
        minlength: [6, 'password shoud be 6 correcter'],
        select: true
    },
    location: {
        type: String,
        default: 'india'
    }
}, { timestamps: true }
);
// middelwares
userSchema.pre('save', async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}

//json web token
userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

}

export default mongoose.model('User', userSchema)
