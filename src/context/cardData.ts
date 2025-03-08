type CardData = {
  id: number;
  sizeConfig: CardSizeConfig;
  component?: React.FC<{ className?: string }>;
};

export type CardSizeConfig = {
  default: string;
  md?: string;
  xl?: string;
};

export const cards: CardData[] = [
  {
    id: 1,
    sizeConfig: {
      default: "",
      md: "md:col-span-3 md:row-span-6",
      xl: "xl:col-span-2 xl:row-span-6",
    },
    component: undefined,
  },
  {
    id: 2,
    sizeConfig: {
      default: "",
      md: "md:col-span-3 md:row-span-6",
      xl: "xl:col-span-5 xl:row-span-6",
    },
    component: undefined, // Placeholder for future component
  },
  {
    id: 3,
    sizeConfig: {
      default: "",
      md: "md:col-span-3 md:row-span-6",
      xl: "xl:col-span-3 xl:row-span-6",
    },
    component: undefined,
  },
  {
    id: 4,
    sizeConfig: {
      default: "",
      md: "md:col-span-3 md:row-span-6",
      xl: "xl:col-span-3 xl:row-span-6",
    },
    component: undefined,
  },
  {
    id: 5,
    sizeConfig: {
      default: "",
      md: "md:col-span-6 md:row-span-6",
      xl: "xl:col-span-5 xl:row-span-6",
    },
    component: undefined,
  },
  {
    id: 6,
    sizeConfig: {
      default: "",
      md: "md:col-span-6 md:row-span-6",
      xl: "xl:col-span-2 xl:row-span-6",
    },
    component: undefined,
  },
];
