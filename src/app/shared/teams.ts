export interface iTeam {
  id?: string;
  name: string;
  admin?: string;
  members?: string[];
  description: string;
  joinRequests?: JoinRequest[];
}

export interface JoinRequest {
  userId: string;
  status: string;
}
