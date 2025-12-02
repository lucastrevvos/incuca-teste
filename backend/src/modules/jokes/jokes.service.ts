import axios from "axios";
import { prisma } from "../../db/prisma";

export class JokesService {
  async getRandomJokeAndLog(userId: number) {
    const response = await axios.get<{ joke: string }>(
      "https://geek-jokes.sameerkumar.website/api?format=json",
    );

    const jokeText = response.data.joke;

    await prisma.jokeLog.create({
      data: {
        userId,
        joke: jokeText,
        moodAfter: "happy",
      },
    });

    return { joke: jokeText };
  }
}
