export type UserAuth = {
  email: string;
  userId: string;
};

export type AuthenticatedUser = {
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
