import prisma from "../../prisma/prisma";

class addressModel{
    constructor(){
        this.prisma = prisma;
    }
    async create(address){
        const {user_id, address1, address2, city, state, country, zipcode} = address;
        const newAddress = await this.prisma.address.create({
            data:{
                street,
                city,
                city,
                zipCode,
                long,
                lat,
                zipcode
            }
        });
        return newAddress;
    }
}

export default addressModel;