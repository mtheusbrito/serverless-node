import { getCollection } from "../../../config/db-connect.js";
import { ObjectId } from 'mongodb'

export class ResultsRepository {
  constructor() {}
  findById = async (id) => {
    const collection = await getCollection("results");
    const result = await collection.findOne({ _id: new ObjectId(id) });

    return result;
  };

  crete = async (name, answers, totalCorrectAnswers, totalAnswers) => {
    const result = { name, answers, totalCorrectAnswers, totalAnswers };
    const collection = await getCollection("results");
    const { insertedId } = await collection.insertOne(result);

    return insertedId;
  };
}
