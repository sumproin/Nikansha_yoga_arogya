export const yogaClassOptions = [
  "Hatha Yoga",
  "Vinyasa Flow",
  "Meditation",
  "Garbh Sanskar & Prenatal Yoga",
  "Postnatal Yoga",
  "Face Yoga",
  "Therapeutic Yoga",
] as const;

export type YogaClassOption = (typeof yogaClassOptions)[number];
