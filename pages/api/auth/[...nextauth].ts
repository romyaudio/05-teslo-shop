

import NextAuth,{NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { dbUsers } from "../../../database";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
   
  }
}
export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
    providers: [
    
    // ...add more providers here
    CredentialsProvider({
      name: 'Custom Login',
      credentials: {
          email:{label:'correo',type: 'email',placeholder:'correo@google.com '},
          password:{label:'Password',type: 'password',placeholder:'Contrasena'},
      },
     async authorize(credentials,req) {
        console.log(credentials)
      
      return await dbUsers.checkEmailPassword(credentials!.email,credentials!.password)
    }
    }),

    GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
    }),
    
    ],

    pages:{
      signIn: '/auth/login',
      newUser: '/auth/register'
    },

    session:{
      maxAge: 2592000,
      strategy: 'jwt',
      updateAge: 86400
    },

    callbacks :{
        async jwt({token,account,user}){
          if(account){
            token.accessToken = account.access_token

            switch (account.type) {
              case 'oauth':
                await dbUsers.oAuthToDbUser(user?.email || '',user?.name || '')
                break
              case 'credentials':
                token.user = user
                break;
            
            }
          }
          return token
      },
        async session({session,token,user}){
          
          session.accessToken = token.accessToken as any
          session.user = token.user as any
          return session
      }
    }
}
export default NextAuth(authOptions)