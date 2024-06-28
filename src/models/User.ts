import mongoose, { Schema, model, connect, Model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Transform } from 'stream';
interface UserAttr {
    name: string;
    email: string;
    password: string;
    mobile?: string;
}
export interface UserDoc extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    mobile?: string;
}


interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttr): UserDoc;
}

const userSchema = new Schema<UserDoc, UserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: String
  }
);
  userSchema.pre('save', async function(next) { // this line
    const user = this;
    if (!user.isModified('password')) return next();
    console.log('just before saving...', user.password);
    user.password = await bcrypt.hash(user.password, 8);
    console.log('just before saving111...', user.password);
    next();
});
 userSchema.statics.build = function(attr: UserAttr){
    return new User(attr);
 }
  
  
  
export const User = model<UserDoc, UserModel>('User', userSchema);

