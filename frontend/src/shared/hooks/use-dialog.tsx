import {
  ComponentProps,
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import { Dialog as ShadcnDialog } from "@/shared/components/ui/dialog.tsx";

type DialogProps = Omit<
  ComponentProps<typeof ShadcnDialog>,
  "open" | "onOpenChange"
>;

type ContextValue = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DialogContext = createContext<ContextValue | null>(null);

function useDialogContext<T>(selector: (value: ContextValue) => T) {
  const value = useContext(DialogContext);

  if (value === null) {
    throw "DialogContext is not defined";
  }

  return selector(value);
}

export const useDialogOnClose = () =>
  useDialogContext((value) => {
    return function () {
      value.setOpen(false);
    };
  });

export function useDialog() {
  const [open, setOpen] = useState(false);

  const Dialog = useCallback(
    (props: DialogProps) => {
      return (
        <DialogContext.Provider value={{ open, setOpen }}>
          <ShadcnDialog open={open} onOpenChange={setOpen} {...props} />
        </DialogContext.Provider>
      );
    },
    [open, setOpen],
  );

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return { open, setOpen, Dialog, onClose };
}
