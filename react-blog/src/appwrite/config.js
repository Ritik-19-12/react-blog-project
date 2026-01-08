
import conf from "../conf.js";
import { Client, TablesDB, Storage, Query, ID } from "appwrite";

export class AuthDatabase {
  client = new Client();
  tablesDB;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.bucket=new Storage(this.client)
  }

  async createPost({title,slug,content,FeaturedImage,status,UserId}){
       try {
        return await this.tablesDB.createRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    FeaturedImage,
                    status,
                    UserId,
                }
        );
        
       } catch (error) {
        console.log("Appwrite service :: createPost :: error", error);
       }
  }

  async updatePost(slug,{title,content,FeaturedImage,status}){
    try {
         return await this.tablesDB.updateRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    FeaturedImage,
                    status,
                }
        );
    } catch (error) {
        console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug){
    try {
        return await this.tablesDB.deleteRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
               
            )
            return true;
    } catch (error) {
        console.log("Appwrite service :: deletePost :: error", error);
        return false;
    }
  }

   async getPost(slug) {
        try {
            return await this.databases.getRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

     async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listRows(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }


    // FILE UPLOAD

     async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

     async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }

}

const authDatabase = AuthDatabase();
export default authDatabase;
