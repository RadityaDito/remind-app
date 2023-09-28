"use client";

import { Collection } from "@prisma/client";
import { FC } from "react";

interface CreateTaskDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  collection: Collection;
}

const CreateTaskDialog: FC<CreateTaskDialogProps> = ({}) => {
  return <div>CreateTaskDialog</div>;
};

export default CreateTaskDialog;
