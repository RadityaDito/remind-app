"use client";
import { Collection, Note, NoteCollection } from "@prisma/client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { createTaskSchema, createTaskSchemaType } from "@/schema/createTask";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { createTask } from "@/actions/task";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { createNoteSchema, createNoteSchemaType } from "@/schema/createNotes";
import { createNote, updateNote } from "@/actions/note";

interface Props {
  open: boolean;
  noteCollection: NoteCollection;
  setOpen: (open: boolean) => void;
  note?: Note;
  isUpdate?: boolean;
}

function CreateNoteDialog({ open, noteCollection, setOpen, note }: Props) {
  const form = useForm<createNoteSchemaType>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      collectionId: noteCollection.id,
      title: note?.title || "",
      content: note?.content || "",
    },
  });

  const router = useRouter();

  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
    form.reset();
  };

  const onSubmit = async (data: createNoteSchemaType) => {
    try {
      note ? await updateNote(data, note.id) : await createNote(data);

      toast({
        title: "Success",
        description: `Notes ${note ? "Updated" : "Created"} successfully!!`,
      });
      openChangeWrapper(false);
      router.refresh();
    } catch (e) {
      toast({
        title: "Error",
        description: "Cannot create task",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            {note ? `Read or Update Note:` : "Add Note to collection:"}
            {!note && (
              <span
                className={cn(
                  "p-[1px] bg-clip-text text-transparent",
                  CollectionColors[noteCollection.color as CollectionColor]
                )}
              >
                {noteCollection.name}
              </span>
            )}
            {note && (
              <span
                className={cn(
                  " bg-clip-text text-transparent",
                  CollectionColors[noteCollection.color as CollectionColor]
                )}
              >
                {note.title}
              </span>
            )}
          </DialogTitle>
          {note ? (
            <DialogDescription>
              Update your note as many time as you wish.
            </DialogDescription>
          ) : (
            <DialogDescription>
              Add a Note to your collection. You can add as many notes as you
              want to a collection.
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="gap-4 py-4">
          <Form {...form}>
            <form
              className="space-y-4 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note Title</FormLabel>
                    <FormControl>
                      {/* <Textarea
                        rows={5}
                        placeholder="Task content here"
                        {...field}
                      /> */}
                      <Input placeholder="Note Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Note content here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires at</FormLabel>
                    <FormDescription>
                      When should this task expire?
                    </FormDescription>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value && format(field.value, "PPP")}
                            {!field.value && <span>No expiration</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className={cn(
              "w-full dark:text-white text-white",
              CollectionColors[noteCollection.color as CollectionColor]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            {note ? "Update Note" : "Add Note"}
            {form.formState.isSubmitting && (
              <ReloadIcon className="animate-spin h-4 w-4 ml-2" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNoteDialog;
