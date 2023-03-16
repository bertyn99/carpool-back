import prisma from "../../prisma/prisma";

class addressModel{
    constructor(){
        this.prisma = prisma;
    }
    async create(address){
        const {street, city, zipCode, long, lat} = address;
        const newAddress = await this.prisma.address.create({
            data:{
                street,
                city,
                zipCode,
                long,
                lat
            }
        });
        return newAddress;
    }
    async update(id, address){
        const {street, city, zipCode, long, lat} = address;
        const updatedAddress = await this.prisma.address.update({
            where:{
                id
            },
            data:{
                street,
                city,
                zipCode,
                long,
                lat
        }});
        return updatedAddress;
    }
    async delete(id){
        const deletedAddress = await this.prisma.address.delete({
            where:{
                id
            }
        });
        return deletedAddress;
    }
    async getAddressById(id){
        const address = await this.prisma.address.findUnique({
            where:{
               id
            }
        });
        return address;
    }
    async getAddressByTripId(trip_id){
        const address = await this.prisma.address.findUnique({
            where:{
               trip_id
            }
        });
        return address;
    }
}

export default addressModel;