import { Prisma } from "@prisma/client";

export type InitiativeWithCategory = Prisma.InitiativeGetPayload<{
  include: {
    category: true;
  };
}>;
