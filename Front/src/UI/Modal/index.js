import {
  Button,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Box,
} from "@chakra-ui/react";

const Modal = ({
  isOpen,
  onOpenChange,
  children,
  title,
  footerChildren,
  triggerChildren,
}) => {
  if (!isOpen) return null;
  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <DialogRoot
        centered
        open={isOpen}
        onOpenChange={(e) => onOpenChange(e.open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogCloseTrigger>x</DialogCloseTrigger>
          </DialogHeader>
          <DialogBody>{children}</DialogBody>
          <DialogFooter>
            <DialogCloseTrigger>
              <Button variant="ghost">Close</Button>
            </DialogCloseTrigger>
            {footerChildren}
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default Modal;
