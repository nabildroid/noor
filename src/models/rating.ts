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
    name: "أتقن",
    description: "الطلاب عملو بشكل جدي",
    id: "1",
  },
  {
    name: "لم يتقن",
    description: "الطلاب عملو بشكل جدي",
    id: "2",
  },
  {
    name: "إلى حد ما",
    description: "الطلاب عملو بشكل جدي",
    id: "3",
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: "",
  },
];

export const PrimaryRating: Rating = [
  {
    name: "جيد",
    description: "الطلاب عملو بشكل جدي",
    id: "4",
  },
  {
    name: "سيء",
    description: "الطلاب عملو بشكل جدي",
    id: "3",
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: "4",
  },
  {
    name: "غير محدد",
    description: "الطلاب عملو بشكل جدي",
    id: "1",
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

export function RateByName(arr: Rating, name: string) {
  return arr.find((e) => e.name == name) || arr[0];
}

export function RateById(arr: Rating, id: string) {
  return arr.find((e) => e.id == id) || arr[0];
}

export const RateToId = (name: string) =>
  [...KinderRating,...ElementeryRating, , ...PrimaryRating].find(
    (e) => e!.name == name
  )!.id;
