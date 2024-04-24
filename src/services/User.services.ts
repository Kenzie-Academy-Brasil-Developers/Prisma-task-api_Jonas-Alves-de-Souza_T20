import { sign } from "jsonwebtoken"
import { compare, hash } from "bcrypt"
import { injectable } from "tsyringe"

import { prisma } from "../database/prisma"
import { AppError } from "../erros/appError"
import { 

    typeCreateUser, 
    typeLoginUser,
    UserReturnSchema, 
    typeUserReturnSchema, 
    typeLoginReturn
    
} from "../schemas"
import { jwtConfig } from "../configs"

@injectable()
export class UserServices {
    
    async userRegister(body: typeCreateUser): Promise <typeUserReturnSchema> {
    
        if(!body.password){
            throw new AppError(400, "Password is required")
        }
   
        const hashedPassword = await hash(body.password, 10)

        const newUser = await prisma.user.create({
            data: {
                ...body,
                password: hashedPassword,
            },
        });

        return UserReturnSchema.parse(newUser);
    }

    async login(
        { 

            email, 
            password 

        }: typeLoginUser

    ): Promise <typeLoginReturn> {
        
        const user = await prisma.user.findFirst({ where: { email } })

            if(!user){
            throw new AppError(404, "User not exists")
        }

        const comparePassword = await compare(password, user.password)

        if(!comparePassword){
            throw new AppError(401, "Email and password doens't match")
        }
       
        const {

            secret, 
            expiresIn 

        } = jwtConfig()
   
        const token: string = sign(
            {id: user.id},
            secret, 
            {
                subject: user.id.toString(), 
                expiresIn
            }
        )

        return {

            accessToken: token, 
            user: UserReturnSchema.parse(user)

        }
    }

    async getUser(id: number): Promise<typeUserReturnSchema> {
        
        const user = await prisma.user.findFirst({ where: { id } })

        if (!user) {
            throw new AppError(404, "User not found");
        }

        return UserReturnSchema.parse(user)
    }
}
