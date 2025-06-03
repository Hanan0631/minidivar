import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { sendOtp } from "services/auth";
import { p2e } from "utils/numbers";

import styles from "./SendOtpForm.module.css";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const submitHandler = async (event) => {
    event.preventDefault();

    if (mobile.length !== 11) {
      toast.warn("شماره خود را درست وارد کنید!", {
        position: "top-left",
      });
      return;
    }

    const { response, error } = await sendOtp(p2e(mobile));

    if (response) {
      toast.success("کد تایید به شماره شماره شما ارسال شد.", {
        position: "top-left",
      });
      setStep(2);
    }

    if (error)
      toast.error("خطا در دریافت اطلاعات!", {
        position: "top-left",
      });
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید. کد
        تایید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button type="submit">ارسال کد تایید</button>
    </form>
  );
}

export default SendOtpForm;
