import { Button, DialogCloseTrigger, Dialog } from "@chakra-ui/react";

const Modal = ({
  isOpen,
  onOpenChange,
  children,
  title,
  footerChildren,
  hasCloseInHeader = true,
  hasCloseInFooter = true,
  ...rest
}) => {
  if (!isOpen) return null;
  return (
    <Dialog.Root
      centered
      open={isOpen}
      onOpenChange={(e) => onOpenChange(e.open)}
      {...rest}
    >
      <Dialog.Backdrop />
      <Dialog.Content background="#0b0f1a">
        <Dialog.Header>
          {title && <Dialog.Title>{title}</Dialog.Title>}
          {hasCloseInHeader && <DialogCloseTrigger>x</DialogCloseTrigger>}
        </Dialog.Header>
        <Dialog.Body>{children}</Dialog.Body>
        <Dialog.Footer>
          {hasCloseInFooter && (
            <Dialog.CloseTrigger>
              <Button variant="ghost">Close</Button>
            </Dialog.CloseTrigger>
          )}
          {footerChildren}
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
