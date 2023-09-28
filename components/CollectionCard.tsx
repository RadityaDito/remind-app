"use client";

import { createCollectionSchemaType } from "@/schema/createCollection";
import { Collection } from "@prisma/client";
import { FC, useState } from "react";
import { Collapsible } from "./ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard: FC<CollectionCardProps> = ({ collection }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "flex w-full justify-between p-6",
            CollectionColors[collection.color as CollectionColor]
          )}
        >
          <span className="text-white font-bold">{collection.name}</span>
          {!isOpen && <CaretDownIcon className="h-6 w-6" />}
          {isOpen && <CaretUpIcon className="h-6 w-6" />}
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  );
};

export default CollectionCard;
