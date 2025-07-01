import { CopilotRuntime, OpenAIAdapter, copilotRuntimeNextJSAppRouterEndpoint } from "@copilotkit/runtime";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, 
});


const runtime = new CopilotRuntime({
  actions: ({ url }) => [
    {
      name: "fetchNameForUserId",
      description: "Fetch user name by ID",
      parameters: [
        {
          name: "userId",
          type: "string",
          description: "The user ID to look up",
          required: true,
        },
      ],
      handler: async ({ userId }: { userId: string }) => {
        return { name: "Gaurav Tarale" };
      },
    },
  ],
});

export const POST = copilotRuntimeNextJSAppRouterEndpoint({
  runtime,
  serviceAdapter: new OpenAIAdapter({ openai }), 
  endpoint: "default", 
});
