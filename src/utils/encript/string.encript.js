import bcrypt from 'bcrypt';

export const makeEncryptPass = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (password,hash) => bcrypt.compareSync(password,hash);

// export const makeEncryptPass = (password) => {
//     return bcrypt.hash(password,bcrypt.genSalt(10));
// }
// export const isValidPassword = (password, hash) => {
//     return bcrypt.compare(password, hash)
// };

export const  makeAyncEncryptPass = async (password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);    
};
export const isAyncValidPassword = async (password, hash) =>  bcrypt.compare(password, hash);
export default makeEncryptPass

