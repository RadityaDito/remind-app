"use client";

import { Collection, Note, NoteCollection, Task } from "@prisma/client";
import { FC, useMemo, useState, useTransition } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import PlusIco from "./icons/PlusIco";
import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./ui/alert-dialog";
import { deleteCollection } from "@/actions/collection";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import CreateTaskDialog from "./CreateTaskDialog";
import TaskCard from "./TaskCard";
import CreateNoteDialog from "./CreateNoteDialog";
import NoteCard from "./NoteCard";

interface NoteCollectionCardProps {
  collection: NoteCollection & {
    notes: Note[];
  };
}

const NoteCollectionCard: FC<NoteCollectionCardProps> = ({ collection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const notes = collection.notes;

  const [isLoading, startTranstition] = useTransition();

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      toast({
        title: "Success",
        description: "Collection has been deleted successfully",
      });
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Cannot delete collection",
        variant: "destructive",
      });
    }
  };

  //   const tasksDone = useMemo(() => {
  //     return collection.tasks.filter((task) => task.done).length;
  //   }, [collection.tasks]);

  const totalNotes = collection.notes.length;

  //   const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100;

  return (
    <>
      {/* <CreateTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      /> */}
      <CreateNoteDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        noteCollection={collection}
      />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "flex w-full justify-between p-6",
              isOpen && "rounded-b-none",
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {!isOpen && <CaretDownIcon className="h-6 w-6" />}
            {isOpen && <CaretUpIcon className="h-6 w-6" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg ">
          {notes.length === 0 && (
            <Button
              variant={"ghost"}
              className="flex items-center justify-center rounded-none gap-1 p-8 py-12"
              onClick={() => setShowCreateModal(true)}
            >
              <p>There are no Notes yet:</p>
              <span
                className={cn(
                  "text-sm bg-clip-text text-transparent",
                  CollectionColors[collection.color as CollectionColor]
                )}
              >
                Create one
              </span>
            </Button>
          )}
          {notes.length > 0 && (
            <>
              {/* <Progress value={progress} className="rounded-none" /> */}
              <div className="p-4 gap-3 flex flex-col">
                {notes.map((note) => (
                  <div className="space-y-3">
                    <NoteCard
                      key={note.id}
                      note={note}
                      noteCollection={collection}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex items-center justify-between">
            <p>
              Collection is Created at{" "}
              {collection.createdAt.toLocaleDateString("id-ID")}
            </p>
            {isLoading && <div>Deleting...</div>}
            {!isLoading && (
              <div>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  size={"icon"}
                  variant={"ghost"}
                >
                  <PlusIco />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will be permanently
                      delete your collection and note inside it
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          startTranstition(removeCollection);
                        }}
                      >
                        Proceed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default NoteCollectionCard;
