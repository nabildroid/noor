import { RadioListItem } from "../components/home/radioList";
import { TeacherType } from "./home_model";

export type Rating = RadioListItem[];

export default function rates(type: TeacherType) {
  if (type == TeacherType.kindergarten) return KinderRating;
  else if (type == TeacherType.elementery) return ElementeryRating;
  return PrimaryRating;
}

export const KinderRating: Rating = [
  {
    name: "جيد",
    description: "الطلاب عملو بشكل جدي",
    id: "good",
  },
  {
    name: "سيء",
    description: "الطلاب عملو بشكل جدي",
    id: "bad",
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: "unknown",
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: "somewhat",
  },
];

export const PrimaryRating: Rating = [
  {
    name: "جيد",
    description: "الطلاب عملو بشكل جدي",
    id: "good",
  },
  {
    name: "سيء",
    description: "الطلاب عملو بشكل جدي",
    id: "bad",
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: "unknown",
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: "somewhat",
  },
];

export const ElementeryRating: Rating = [
  {
    name: "جيد",
    description: "الطلاب عملو بشكل جدي",
    id: "good",
  },
  {
    name: "سيء",
    description: "الطلاب عملو بشكل جدي",
    id: "bad",
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: "unknown",
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: "somewhat",
  },
];
