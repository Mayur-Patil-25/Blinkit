import React from "react";
import { Clock, MapPin } from "lucide-react";

interface DeliveryBannerProps {
  estimatedTime?: string;
  location?: string;
}

const DeliveryBanner = ({
  estimatedTime = "15-20 minutes",
  location = "123 Main St, New York, NY",
}: DeliveryBannerProps) => {
  return (
    <div className="w-full h-12 bg-green-50 border-b border-green-100 flex items-center justify-center px-4">
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center text-green-700">
          <Clock className="w-4 h-4 mr-2" />
          <span>Estimated delivery time: {estimatedTime}</span>
        </div>
        <div className="h-4 w-px bg-green-200" />
        <div className="flex items-center text-green-700">
          <MapPin className="w-4 h-4 mr-2" />
          <span>Delivering to: {location}</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBanner;
