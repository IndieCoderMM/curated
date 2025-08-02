"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import {
  SlDrawer,
  SlGameController,
  SlGlobe,
  SlLayers,
  SlPuzzle,
  SlScreenSmartphone,
  SlSettings,
  SlSpeech,
  SlWrench,
} from "react-icons/sl";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Web Development": SlGlobe,
  "Mobile Development": SlScreenSmartphone,
  "Game Development": SlGameController,
  "Dynamic Programming": SlPuzzle,
  "Project-Based Learning": SlWrench,
  Algorithms: SlSettings,
  "System Design": SlLayers,
  "Large Language Models": SlSpeech,
  "Data Structures": SlDrawer,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
