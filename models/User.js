import mongoose from 'mongoose';

/* UserSchema will correspond to the recipe collection in the MongoDB database. */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);