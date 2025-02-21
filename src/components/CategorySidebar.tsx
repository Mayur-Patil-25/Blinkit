import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";

import { Database } from "@/types/schema";
import { on } from "events";

type Category = Database["public"]["Tables"]["categories"]["Row"] & {
  subcategories: Database["public"]["Tables"]["subcategories"]["Row"][];
};

interface CategorySidebarProps {
  categories?: Category[];
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

const CategorySidebar = ({
  categories = [],
  selectedCategory = "",
  onCategorySelect = () => {},
}: CategorySidebarProps) => {
  console.log("on category select",onCategorySelect);
  
  return (
    <div className="w-[280px] h-full bg-white border-r border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="pr-4">
          <Accordion type="single" collapsible className="w-full">
            {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="text-left hover:no-underline">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {category.subcategories.map((subcategory: any) => (
                      <Button
                        key={subcategory.id}
                        variant="ghost"
                        className={`justify-start pl-4 ${selectedCategory === subcategory.id ? "bg-gray-100" : ""}`}
                        onClick={() => onCategorySelect(subcategory.id)}
                      >
                        {subcategory.name}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategorySidebar;
