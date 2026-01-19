import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers/authHandlers";
import { usersHandlers } from "./handlers/usersHandlers";

export const worker = setupWorker(...authHandlers, ...usersHandlers);
