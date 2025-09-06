import { Suspense } from "react";
import Conversation from "./components/conversation"; // your component using useSearchParams
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <Suspense fallback={<div className="space-y-4 pb-32">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={cn("flex", i % 2 === 0 ? "justify-start" : "justify-end")}
        >
          <Card
            className={cn(
              "max-w-[80%] px-3 py-2 shadow-md rounded-2xl",
              i % 2 === 0
                ? "bg-background rounded-tl-none"
                : "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-tr-none border-0"
            )}
          >
            <div className="space-y-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
          </Card>
        </div>
      ))}
    </div>}>
      <Conversation />
    </Suspense>
  );
}
