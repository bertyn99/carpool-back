class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async get(id) {
    return await this.model.findById(id);
  }

  async getAll() {
    return await this.model.find();
  }
}
export default BaseService;
