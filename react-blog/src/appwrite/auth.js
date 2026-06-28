import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){
        const UserAccount = await this.account.create(ID.unique(),email,password,name);
        if(UserAccount){
            return this.login({email,password});
        }
        else{
            return UserAccount;
        }
    }
    async login({email,password}){
        return this.account.createEmailPasswordSession(email,password);
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

}

const authService=new AuthService();
export default authService;
