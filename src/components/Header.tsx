import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPin, Search, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

interface HeaderProps {
  location?: string;
  cartItemCount?: number;
  onLocationChange?: (location: string) => void;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
}

const Header = ({
  location = "New York, NY",
  cartItemCount = 0,
  onLocationChange = () => {},
  onSearch = () => {},
  onCartClick = () => {},
}: HeaderProps) => {
  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
  ];

  console.log(onSearch);
  

  return (
    <header className="sticky top-0 z-50 w-full h-[72px] bg-white border-b shadow-sm">
      <div className="container mx-auto h-full px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <h1 className="text-xl font-bold text-green-600">QuickMart</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-4">
                <MapPin className="h-4 w-4 mr-2" />
                {location}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {locations.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => onLocationChange(loc)}
                >
                  {loc}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="w-full pl-10"
              placeholder="Search for groceries..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <Button
          variant="outline"
          className="flex-shrink-0"
          onClick={onCartClick}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
          {cartItemCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
