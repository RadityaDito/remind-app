"use client";

import { Note, NoteCollection, Task } from "@prisma/client";
import { FC, useState, useTransition } from "react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { setTaskToDone } from "@/actions/task";
import { useRouter } from "next/navigation";
import CreateNoteDialog from "./CreateNoteDialog";

interface NoteCardProps {
  note: Note;
  noteCollection: NoteCollection;
}

const NoteCard: FC<NoteCardProps> = ({ note, noteCollection }) => {
  const [isLoading, startTranstition] = useTransition();
  const router = useRouter();

  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex gap-2 items-center rounded-lg hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 cursor-pointer">
      <div className="w-full" onClick={() => setShowCreateModal(true)}>
        <div className="px-2 py-1">
          <label className="" htmlFor={note.id.toString()}>
            {note.title}
          </label>
          <p className="text-xs text-neutral-500">
            Created at {note.createdAt.toLocaleDateString("id-ID")}
          </p>
        </div>
      </div>

      <CreateNoteDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        noteCollection={noteCollection}
        note={note}
        isUpdate={true}
      />
    </div>
  );
};

export default NoteCard;
