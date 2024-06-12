import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function PageButtons({
  onClickPrev,
  onCLickNext,
  isPrevDisabled,
  isNextDisabled,
}: {
  onClickPrev: () => void;
  onCLickNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}) {
  return (
    <div className="sticky top-16 flex w-full flex-row justify-between gap-4 opacity-70 hover:opacity-100">
      <Button
        variant="outline"
        className={cn(
          "left-0 cursor-pointer capitalize",
          isPrevDisabled && "cursor-not-allowed"
        )}
        onClick={onClickPrev}
        disabled={isPrevDisabled}
      >
        prev
      </Button>
      <Button
        className="capitalize"
        variant="outline"
        onClick={onCLickNext}
        disabled={isNextDisabled}
      >
        next
      </Button>
    </div>
  );
}
