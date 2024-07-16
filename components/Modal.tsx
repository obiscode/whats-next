import {
  View,
  KeyboardAvoidingView,
  ModalProps,
  Platform,
  Modal as RNModal,
} from "react-native";

type Props = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
  contentStyles?: string;
};

const Modal = ({
  isOpen,
  withInput,
  contentStyles,
  children,
  ...rest
}: Props) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      className={`items-center justify-end pb-16 flex-1 px-3 bg-zinc-900/40 ${contentStyles}`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      (children)
    </KeyboardAvoidingView>
  ) : (
    <View
      className={`items-center justify-end pb-16 flex-1 px-3 bg-zinc-900/40 ${contentStyles}`}
    >
      {children}
    </View>
  );

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
    </RNModal>
  );
};

export default Modal;
