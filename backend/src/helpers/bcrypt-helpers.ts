import bcrypt from 'bcrypt';

/**
 * Encrypt password text
 * @param passwordTxt 
 */
export const encryptPassword = (passwordTxt:string) : string => {
    if (!passwordTxt) return '';
    try {
      return bcrypt.hashSync(passwordTxt, 10);
    } catch (err) {
      return '';
    }
}

export const comparePassword = (passwordTxt:string,encryptedPassword:string) : Boolean => {
    return bcrypt.compareSync(passwordTxt, encryptedPassword);
}