import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  try {
     
    const saltround = 10;
    const hashedPass = await bcrypt.hash(password, saltround);

    return hashedPass;
  } catch (error) {
    console.log("error in bcrypting password...");
  }
};

export const comparedPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
