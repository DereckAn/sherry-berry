import { createApiHandler } from "tinacms/next";
import tinaConfig from "../../../../../tina/config";

const handler = createApiHandler({
  config: tinaConfig,
});

export const GET = handler.GET;
export const POST = handler.POST;
