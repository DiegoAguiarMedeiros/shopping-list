import ToastMessage from "react-native-toast-message";
import IToast from "../IToast";
import I18n from "i18n-js";

class Toast implements IToast {
    showToast = (message: string): void => {
        ToastMessage.show({
            type: "success",
            text1: I18n.t(message),
            position: "top",
            topOffset: 56,
        });
    };
}

export default new Toast();
