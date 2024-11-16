import { ToastAndroid, ToastAndroidStatic } from "react-native";
import IToast from "../IToast";
import I18n from "i18n-js";

class Toast implements IToast {
    toastAndroid: ToastAndroidStatic;
    constructor(
        toastAndroid: ToastAndroidStatic
    ) {
        this.toastAndroid = toastAndroid;
    }
    showToast = (message: string): void => {
        ToastAndroid.showWithGravity(
            I18n.t(message),
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };
}

export default new Toast(
    ToastAndroid
);