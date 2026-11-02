import User, { IUser } from '../models/user.model';
import Role, { IRole } from '../models/role.model';
import * as userDAO from '../dao/user.dao';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { toUserResponseDTO } from '../mappers/user.mapper';
import { AppError } from '../utils/appError';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

// MongoDB Errors
// https://www.mongodb.com/docs/manual/reference/error-codes/

// Mongoose
// Η .lean() είναι μια επιλογή ερωτήματος που επιστρέφει απλά αντικείμενα JavaScript (POJO) αντί για Mongoose Document. Βελτιώνει σημαντικά την απόδοση και μειώνει τη χρήση μνήμης (συχνά έως και 10 φορές πιο γρήγορα) παρακάμπτοντας την παρακολούθηση αλλαγών και την επικύρωση του Mongoose, καθιστώντας την ιδανική για αιτήματα GET μόνο για ανάγνωση.
export const findUsers = async () => {
  const users = await userDAO.findAll();
  return users.map(u => toUserResponseDTO(u));
};

// toUserResponseDTO converts a user object from your data layer (IUser) into the shape your API returns (UserResponseDTO).

// It:
// - Converts _id to a string.
// - Copies username.
// - Includes firstname, lastname, email, and address only when each value is truthy.
// - Includes phone only when present, mapping each phone entry to just its type and number.
// - Converts each role with RoleMapper.toDTO.
// So it acts as a mapper/serializer: it chooses which user fields are exposed in the response and transforms some of them. For example, fields such as passwords or internal database data won’t be returned unless you explicitly add them.

// if we had 
// export const findUsers = async () => {
//   return await userDAO.findAll();
// };
// it will return the database/user objects as they are, without converting them to UserResponseDTO. That may expose internal fields (for example, database IDs or password-related fields) and return a different shape than your API response type.

export const findUserById = async (id: string) => {
  const user = await userDAO.findById(id);
  if (user) {
    return toUserResponseDTO(user); 
  }
    
};

export const findUserByEmail = async (email: string) => {
  const user = await userDAO.findByEmail(email);
  if (user) {
    return toUserResponseDTO(user); 
  }
};

export const findUserByUsername = async (username: string) => {
  return User.findOne({ username }).populate('roles');
};

// For Partial Type
// https://www.typescriptlang.org/docs/handbook/utility-types.html
export const createUser = async (payload: Partial<CreateUserDTO>) => {
  if (payload.password) {
    const hash = await bcrypt.hash(payload.password, SALT_ROUNDS);
    payload.password = hash;
  }

  let roleIds: Types.ObjectId[] = [];
  // console.log("Create User", payload);
  if (payload.roles && payload.roles.length > 0) {
    roleIds = payload.roles.map(id => new Types.ObjectId(id));
  } else {
    let reader: IRole | null = await Role.findOne({ role: 'READER' });
    if (!reader) {
      reader = await Role.create({ role: 'READER', description: 'Default reader role', active: true });
    }
    roleIds = [reader._id];
  }

  // const user = new User({ ...payload, roles: roleIds });
  const user = await userDAO.createUser({
    ...payload,
    roles: roleIds
  });
  return toUserResponseDTO(user);
};


export const updateUser = async (username: string, payload: UpdateUserDTO) => {
  const updateData: Partial<IUser> = {};

  if (payload.firstname !== undefined) updateData.firstname = payload.firstname;
  if (payload.lastname !== undefined) updateData.lastname = payload.lastname;
  if (payload.email !== undefined) updateData.email = payload.email;
  if (payload.address !== undefined) updateData.address = payload.address;
  if (payload.phone !== undefined) updateData.phone = payload.phone;

  if (payload.password) {
    updateData.password = await bcrypt.hash(payload.password, SALT_ROUNDS);
  }

  if (payload.roles) {
    updateData.roles = payload.roles.map(id => new Types.ObjectId(id));
  }

  const user = await userDAO.updateUser(username, updateData);
  return user ? toUserResponseDTO(user) : null;
};

export const deleteUser = async (username: string) => {
  const user = await userDAO.deleteUser(username);
  return user;
};