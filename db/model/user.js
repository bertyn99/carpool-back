import prisma from "../../prisma/prisma";

class UserModel{

    constructor(){
        this.prisma = prisma;
    }

    async create(user){
        const {name, email, phone, password} = user;
        const newUser = await this.prisma.user.create({
            data:{
                name,
                email,
                phone,
                password
            }
        });
        return newUser;
    }
    async update(id, user){
        const {name, email, phone, password} = user;
        const updatedUser = await this.prisma.user.update({
            where:{
                id
            },
            data:{
                name,
                email,
                phone,
                password
            }});
    }
    async delete(id){}
    async getUserById(id){
        const user = await this.prisma.user.findUnique({
            where:{
               id
            }
        });
        return user;
    }
    async getUserByEmail(email){    
        const user = await this.prisma.user.findUnique({
            where:{
               email
            }
        });
        return user;      
    }
    async getUserByPhone(phone){
        const user = await this.prisma.user.findUnique({
            where:{
               phone
            }
        });
        return user;
    }
    async getUserTrips(id){
        const trips = await this.prisma.user.findMany({
            where:{
                userId: id
            },
            include:{
                trip: true
            }});
    }
    async getUserTripsByStatus(id, status){
        const trips = await this.prisma.user.findMany({

            where:{
                userId: id,
                status
            },
            include:{
                trip: true
            }});
    }
    async getUserTripsByDate(id, date){
        const trips = await this.prisma.user.findMany({
            where:{
                userId: id,
                date
            },
            include:{
                trip: true
            }});
    }

   

     

}

export default UserModel;
