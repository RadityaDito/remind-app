import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useForm } from "react-hook-form";
import {
  createCollectionSchema,
  createCollectionSchemaType,
} from "@/schema/createCollection";

import { create } from "domain";
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
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { createCollection } from "@/actions/collection";
import { toast } from "./ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useRouter } from "next/navigation";
<<<<<<< HEAD
=======
import { createNoteCollection } from "@/actions/noteCollection";
import { createNoteCollectionSchemaType } from "@/schema/createNoteCollection";
>>>>>>> a8735b16f11044926d02b0613fac9bab595f741f

interface CreateCollectionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCollectionSheet: FC<CreateCollectionSheetProps> = ({
  open,
  onOpenChange,
}) => {
  const router = useRouter();

  const form = useForm<createCollectionSchemaType>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: createCollectionSchemaType) => {
    try {
      console.log("Submitted");
      await createCollection(data);

      //Close the sheet
      openChangeWrapper(false);
      router.refresh();

      toast({
        title: "Success",
        description: "Collection created successfully",
      });
    } catch (error: any) {
      //Show toast
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
      console.log("Error While Creating Collection", error);
    }
  };

<<<<<<< HEAD
=======
  const onSubmit2 = async (data: createNoteCollectionSchemaType) => {
    try {
      await createNoteCollection(data);

      //Close the sheet
      openChangeWrapper(false);
      router.refresh();

      toast({
        title: "Success",
        description: "Collection created successfully",
      });
    } catch (error: any) {
      //Show toast
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
      console.log("Error While Creating Collection", error);
    }
  };

>>>>>>> a8735b16f11044926d02b0613fac9bab595f741f
  const openChangeWrapper = (open: boolean) => {
    form.reset();
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new collection</SheetTitle>
          <SheetDescription>
            Collections are a way to group your tasks
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
<<<<<<< HEAD
            onSubmit={form.handleSubmit(onSubmit)}
=======
            onSubmit={form.handleSubmit(onSubmit2)}
>>>>>>> a8735b16f11044926d02b0613fac9bab595f741f
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal" {...field} />
                  </FormControl>
                  <FormDescription>Collection Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          `w-full h-8 text-white`,
                          CollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue
                          placeholder="Color"
                          className="w-full h-8"
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Object.keys(CollectionColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              `w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8`,
                              CollectionColors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select a color for your collection
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3 mt-3">
          <Separator />
          <Button
            disabled={form.formState.isSubmitting}
            variant={"outline"}
            className={cn(
              form.watch("color") &&
                CollectionColors[form.getValues("color") as CollectionColor]
            )}
<<<<<<< HEAD
            onClick={form.handleSubmit(onSubmit)}
=======
            onClick={form.handleSubmit(onSubmit2)}
>>>>>>> a8735b16f11044926d02b0613fac9bab595f741f
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className="w-4 h-4 animate-spin ml-2" />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCollectionSheet;
