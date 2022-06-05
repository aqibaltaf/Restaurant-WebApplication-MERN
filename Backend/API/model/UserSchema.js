const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    FirstName: { type: String, required: true },
    MiddleName: { type: String },
    LastName: { type: String, required: true },
    Address: { type: String, required: true },
    State: { type: String },
    City: { type: String, required: true },
    Phone: { type: Number, required: true },
    UserRole: { type: String },
    Tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

UserSchema.pre('save', async function (next) {
    if (this.isModified('Password')) {
        this.Password = await bcrypt.hash(this.Password, 12);
    }
    next();
});

UserSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({
            _id: this._id,
            FirstName: this.FirstName,
            MiddleName: this.MiddleName,
            LastName: this.LastName,
            Address: this.Address,
            City: this.City,
            Phone: this.Phone
        }, process.env.SECRET_KEY);
        this.Tokens = this.Tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}



module.exports = mongoose.model('User', UserSchema);