import AppError from "../../../errors/AppError.js";
import { ResultsRepository } from "../repositories/resultsRepository.js";

export default class FindResultByIdUseCase {
  constructor() {
    this.repository = new ResultsRepository();
  }

  
  execute = async (id) => {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new AppError("Not Found!");
    }

    return result;
  };
}
