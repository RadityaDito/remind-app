"use server";

import prisma from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { createNoteCollectionSchemaType } from "@/schema/createNoteCollection";
import { currentUser } from "@clerk/nextjs";

export async function createNoteCollection(
  form: createNoteCollectionSchemaType
) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.noteCollection.create({
    data: {
      userId: user.id,
      color: form.color,
      name: form.name,
    },
  });
}

export async function deleteNoteCollection(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  // await wait(5000);

  return await prisma.noteCollection.delete({
    where: {
      id: id,
    },
  });
}
