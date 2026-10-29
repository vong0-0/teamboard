export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  online: boolean;
  storageUsedGB: number;
  storageLimitGB: number;
}
