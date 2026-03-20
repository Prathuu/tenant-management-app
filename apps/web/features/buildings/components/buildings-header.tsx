import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const BuildingsHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Buildings</h1>
        <p className="text-muted-foreground text-sm">
          Manage all your properties
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* reuse your Input */}
        <Input placeholder="Search buildings..." />

        {/* reuse your Button */}
        <Button>Add Building</Button>
      </div>
    </div>
  );
};
