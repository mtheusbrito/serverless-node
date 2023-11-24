import { ResultsRepository } from "../repositories/resultsRepository.js";

export default class SendResponseUseCase {
  constructor() {
    this.repository = new ResultsRepository();
  }
  async execute(name, answers) {
    const correctQuestions = [3, 1, 0, 2];

    const totalCorrectAnswers = answers.reduce((acc, answer, index) => {
      if (answer === correctQuestions[index]) {
        acc++;
      }
      return acc;
    }, 0);

    const result = {
      name,
      answers,
      totalCorrectAnswers,
      totalAnswers: answers.length,
    };

    const { insertedId } = await this.repository.create({ ...result });


    return {
        insertedId
    }
  }
}
