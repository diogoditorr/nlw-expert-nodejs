import fastify from "fastify";
import cookie from "@fastify/cookie";
import { createPoll } from "./routes/create-poll.js";
import { getPoll } from "./routes/get-poll.js";
import { voteOnPoll } from "./routes/vote-on-poll.js";

const app = fastify();

app.register(cookie, {
  secret: "PfS+4OvjODAYPOOaIMi7DaK5Uu8lww0x+LmFKUfBu6A=",
  hook: "onRequest",
});

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

app.listen({ port: 3333 }).then((value) => {
  console.log("HTTP server running!");
  console.log("Address:", value);
});
