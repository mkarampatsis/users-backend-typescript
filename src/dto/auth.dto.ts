import { IRoleDTO } from "./role.dto";

export interface AuthPayloadDTO {
  username: string; 
  email: string;   
  roles: IRoleDTO[];    
}