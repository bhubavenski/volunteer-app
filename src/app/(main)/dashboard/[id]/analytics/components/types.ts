import { Prisma } from "@prisma/client";

export type InitiativeData = Prisma.InitiativeGetPayload<{
  include: {
    author: true,
    categories: {
      select: {
        name: true;
      };
    };
    participants: true,
    tasks: {
      include: {
        assignedTo: true
      }
    },
    _count: {
      select: {
        tasks: true;
      };
    };
  };
}> & { doneTasksCount: number | undefined };
