

import NextAuth,{NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
    providers: [
    
    // ...add more providers here
    Credentials({
      name: 'Custom Login',
      credentials: {
          email:{label:'correo',type: 'email',placeholder:'correo@google.com '},
          password:{label:'Password',type: 'password',placeholder:'Contrasena'},
      },
    async authorize(credentials){
        console.log(credentials)
      return {name:'romy',email:'romy@google.com',role:'admin'}
    }
    }),

    GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
    }),
    
    ],

    callbacks :{
        async jwt({token,account,user}){
          if(account){
            token.accessToken = account.access_token

            switch (account.type) {
              case 'oauth':
                break
              case 'credentials':
                token.user = user
                break;
            
            }
          }
          return token
      },
        async session({session,token,user}){
          
          session.accessToken = token.accessToken
          session.user = token.user as any
          return session
      }
    }
}
export default NextAuth(authOptions)