import { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub.js";
import { z } from "zod";

export async function pollResults(app: FastifyInstance) {
  app.get(
    "/polls/:pollId/results",
    { websocket: true },
    (connection, request) => {
      const pollResultParams = z.object({
        pollId: z.string().uuid(),
      });

      const { pollId } = pollResultParams.parse(request.params);

      voting.subscribe(pollId, (message) => {
        connection.socket.send(JSON.stringify(message, null, 2));
      });
    },
  );
}
