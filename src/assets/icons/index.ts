// import Add from './svgs/add.svg';
import { GoPlus } from "react-icons/go";
// import { ReactComponent as subtract } from "./svgs/subtract.svg";
import { RiSubtractLine } from "react-icons/ri";
// import { ReactComponent as filter } from "./svgs/filter.svg";
import { GoFilter } from "react-icons/go";
// import { ReactComponent as arrowLeft } from "./svgs/arrow-left.svg";
import { GoArrowLeft } from "react-icons/go";
// import { ReactComponent as ArrowRight } from "./svgs/arrow-right.svg";
import { GoArrowRight } from "react-icons/go";
// import { ReactComponent as DefaultAvatar } from "./svgs/default-avatar.svg";
import { GoPerson } from "react-icons/go";
// import { ReactComponent as CalendarWarning } from "./svgs/calendar-warning.svg";
import { PiWarningOctagonFill } from "react-icons/pi";
// import { ReactComponent as CalendarFree } from "./svgs/calendar-free.svg";
import { SlCalender } from "react-icons/sl";
// import { ReactComponent as ArrowUp } from "./svgs/arrow-up.svg";
import { GoArrowUp } from "react-icons/go";
// import { ReactComponent as ArrowDown } from "./svgs/arrow-down.svg";
import { GoArrowDown } from "react-icons/go";
// import { ReactComponent as Search } from "./svgs/search.svg";
import { GoSearch } from "react-icons/go";
// import { ReactComponent as Close } from "./svgs/close.svg";
import { IoClose } from "react-icons/io5";
// import { ReactComponent as Moon } from "./svgs/moon.svg";
import { GoMoon } from "react-icons/go";
// import { ReactComponent as Sun } from "./svgs/sun.svg";
import { GoSun } from "react-icons/go";
import { Icon, IconsNames } from "./types";
const icons: { [key in IconsNames]: Icon } = {
  add: GoPlus,
  subtract: RiSubtractLine,
  filter: GoFilter,
  arrowLeft: GoArrowLeft,
  arrowRight: GoArrowRight,
  defaultAvatar: GoPerson,
  calendarWarning: PiWarningOctagonFill,
  calendarFree: SlCalender,
  arrowDown: GoArrowUp,
  arrowUp: GoArrowDown,
  search: GoSearch,
  close: IoClose,
  moon:  GoMoon,
  sun:GoSun,
};


export default icons;