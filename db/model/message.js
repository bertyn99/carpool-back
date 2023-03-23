import prisma from "../../prisma/prisma.js";

class Message {
  constructor() {
    this.prisma = prisma;
  }
  async create(userId, tripId, content) {
    const newMessage = await prisma.message.create({
      data: {
        userId,
        tripId,
        content,
      },
    });
    return newMessage;
  }
  async update(userId, tripId, content) {
    const updatedMessage = await prisma.message.update({
      where: {
        userId,
        tripId,
      },
      data: {
        content,
      },
    });
    return updatedMessage;
  }
  async delete(tripId, messageId) {
    const deletedMessage = await prisma.message.delete({
      where: {
        tripId,
        messageId,
      },
    });
  }
  async getMessagesOfaTrip(tripId) {
    const messages = await prisma.message.findMany({
      where: {
        tripId,
      },
    });
    return messages;
  }
}

export default Message;
