// export interface RoleDTO {
//   id: string;
//   description: string;
//   active: boolean;
// }

import { Types } from "mongoose";

export interface IRoleDTO {
  _id: Types.ObjectId;
  role: string;
  description: string;
  active: boolean;
}