import { includes } from "lodash";
import prisma from "../../prisma/prisma.js";

class TripsModel{
    constructor(){
        this.prisma = prisma;
    }
    async create(trip){
        const {user_id, duree, etape, date, adress} = trip;
        const newTrip = await this.prisma.trip.create({
            data:{
                user_id,
                duree,
                etape,
                date
            }
        });
        return newTrip;
    }
    async update(id, trip){
        const {user_id, duree, etape, date, adress} = trip;
        const updatedTrip = await this.prisma.trip.update({
            where:{
                id
            },
            data:{
                user_id,
                duree,
                etape,
                date
        }});
        return updatedTrip;
    }
    async delete(id){
        const deletedTrip = await this.prisma.trip.delete({
            where:{
                id
            }
        });
        return deletedTrip;
    }   
    async getTripById(id){
        const trip = await this.prisma.trip.findUnique({
            where:{
               id
            }
        });
        return trip;
    }
    async getTripByUserId(user_id){
        const trip = await this.prisma.trip.findUnique({
            where:{
               user_id
            }
        });
        return trip;
    }
    async getTripByDate(date){
        const trip = await this.prisma.trip.findUnique({
            where:{
               date
            }
        });
        return trip;
    }
    async getTripByAdress(id){
        const trip = await this.prisma.trip.findUnique({
            where:{
               tripId: id
            },
            include:{
                adress: true
            }
        });
        return trip;
    }
}
export default TripsModel;
