 interface JwtMainPayload {
    userId?: number;
    email?: string;
    userRole?: string;
    userRoleId?: number;
    department?: number;
    userName? : string;
    phoneNumber?:string;
  }
  export interface JwtPayload extends JwtMainPayload{
   companyName:string;
   companyType:string; 
  }