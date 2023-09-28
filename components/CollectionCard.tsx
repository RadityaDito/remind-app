import { createCollectionSchemaType } from "@/schema/createCollection";
import { Collection } from "@prisma/client";
import { FC } from "react";

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard: FC<CollectionCardProps> = ({ collection }) => {
  return <div>{collection.name}</div>;
};

export default CollectionCard;
