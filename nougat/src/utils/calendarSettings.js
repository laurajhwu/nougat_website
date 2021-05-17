import { registerLocale, setDefaultLocale } from "react-datepicker";
import ch from "date-fns/locale/zh-TW";

class Calendar {
  constructor() {
    this.language = "zh-TW";
  }

  calendarSettings() {
    registerLocale(this.language, ch);
    setDefaultLocale(this.language);
  }
}

export default new Calendar();
