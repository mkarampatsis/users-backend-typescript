import Role, { IRole } from '../models/role.model';

export const createRole = async (payload: Partial<IRole>) => {
  const r = new Role(payload);
  return r.save();
};

export const findAllRoles = async () => {
  return Role.find().lean();
};

export const findRoleByName = async (roleName: string) => {
  return Role.findOne({ role: roleName });
};

export const findRoleById = async (id: string) => {
  return Role.findById(id);
};

export const updateRole = async (id: string, payload: Partial<IRole>) => {
  console.log(id, payload);
  return Role.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteRole = async (id: string) => {
  return Role.findByIdAndDelete(id);
};
