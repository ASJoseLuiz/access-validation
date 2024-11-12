import { SetMetadata } from "@nestjs/common";

export const STRATEGY_KEY = "accessStrategy";
export const AccessStrategy = (strategy: "level" | "hierarchy") =>
  SetMetadata(STRATEGY_KEY, strategy);
