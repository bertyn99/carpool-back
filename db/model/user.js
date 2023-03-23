import prisma from "../../prisma/prisma.js";

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
                password,
            },
            select:{
              name:true,
              email:true,
              phone:true,
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
        return updatedUser;
    }
    async delete(id){
        const deletedUser = await this.prisma.user.delete({
            where:{
                id
            }
        });
        return deletedUser;
    }
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
        return trips;
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
        return trips;
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
        return trips;
    }  
    async addCar(car){
        const {nbPlate, color, model} = car;
        const newCar = await this.prisma.car.create({
            data:{
                nbPlate,
                color,
                model
        }});
        return newCar;
    }
}

export default UserModel;
