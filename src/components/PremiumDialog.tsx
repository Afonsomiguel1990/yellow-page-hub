import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PremiumPlans } from "./PremiumPlans";

interface PremiumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const PremiumDialog = ({ open, onOpenChange, onSuccess }: PremiumDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Escolha seu plano Premium</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <PremiumPlans onClose={() => {
            onOpenChange(false);
            onSuccess?.();
          }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};