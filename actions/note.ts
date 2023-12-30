"use server";

import prisma from "@/lib/prisma";
import { createNoteSchemaType } from "@/schema/createNotes";
import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs";

export const createNote = async (data: createNoteSchemaType) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { content, title, collectionId } = data;

  return await prisma.note.create({
    data: {
      userId: user.id,
      content,
      title,
      Collection: {
        connect: {
          id: data.collectionId,
        },
      },
    },
  });
};

export const updateNote = async (
  data: createNoteSchemaType,
  noteId: number
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { content, title, collectionId } = data;

  // return await prisma.note.create({
  //   data: {
  //     userId: user.id,
  //     content,
  //     title,
  //     Collection: {
  //       connect: {
  //         id: collectionId,
  //       },
  //     },
  //   },
  // });

  return await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      title,
      content,
    },
  });
};

// export async function setTaskToDone(id: number) {
//   const user = await currentUser();
//   if (!user) {
//     throw new Error("User not found");
//   }

//   return await prisma.task.update({
//     where: {
//       id: id,
//       userId: user.id,
//     },
//     data: {
//       done: true,
//     },
//   });
// }
