import bcrypt from "bcrypt";

export const hashAdminPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const compareAdminPassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};
