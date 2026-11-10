import { Types } from "mongoose";
import { IRoleDTO } from "./role.dto";
// import { RoleDTO } from "./role.dto";

export interface IPhoneDTO {
  type: string;
  number: string;
}

export interface CreateUserDTO {
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: {
    area?: string;
    street?: string;
    number?: string;
    po?: string;
    municipality?: string;
  };
  phone?: IPhoneDTO[];
  roles?: string[]; 
}
export interface UpdateUserDTO {
  password?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: {
    area?: string;
    street?: string;
    number?: string;
    po?: string;
    municipality?: string;
  };
  phone?: IPhoneDTO[];
  roles?: string[]; 
}

// export interface UserResponseDTO {
//   id?: string;
//   username: string;
//   firstname?: string;
//   lastname?: string;
//   email?: string;
//   address?: {
//     area?: string;
//     street?: string;
//     number?: string;
//     po?: string;
//     municipality?: string;
//   };
//   phone?: IPhoneDTO[];
//   roles: RoleDTO[];
// }

export interface UserResponseDTO {
  _id: Types.ObjectId;
  username: string;
  firstname?: string;
  lastname?: string;
  email: string;
  address?: {
    area?: string;
    street?: string;
    number?: string;
    po?: string;
    municipality?: string;
  };
  phone?: IPhoneDTO[];
  roles: IRoleDTO[];
}
