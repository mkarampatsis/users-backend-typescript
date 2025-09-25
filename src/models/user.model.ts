import { Schema, model, Document, Types } from "mongoose";

interface Phone { type: string; number: string; }

export interface IUser extends Document {
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: {
    area?: string; street?: string; number?: string; po?: string; municipality?: string;
  };
  phone?: Phone[];
  roles: Types.ObjectId[];
}

const PhoneSchema = new Schema<Phone>({ type: String, number: String }, { _id: false });

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
  email: { type: String, index: true },
  address: {
    area: String, street: String, number: String, po: String, municipality: String
  },
  phone: [PhoneSchema],
  roles: [{ type: Schema.Types.ObjectId, ref: "Role", required: true }]
}, { timestamps: true });

export default model<IUser>("User", UserSchema);
