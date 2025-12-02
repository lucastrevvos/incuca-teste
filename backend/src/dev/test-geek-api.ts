import axios from "axios";

async function main() {
  const response = await axios.get<{ joke: string }>(
    "https://geek-jokes.sameerkumar.website/api?format=json",
  );

  console.log("Resposta da API: ", response.data);
}

main().catch(console.error);
