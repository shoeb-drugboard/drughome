import { AnimationProps } from "framer-motion";

// Animation variants interfaces
export interface AnimationVariants {
  containerVariants: AnimationProps["variants"];
  itemVariants: AnimationProps["variants"];
  listItemVariants: AnimationProps["variants"];
}

// Data interfaces
export interface BenefitItem {
  title: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ProgressItem {
  label: string;
  value: number;
  color: "success" | "primary" | "secondary";
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FAQItem {
  key: string;
  question: string;
  answer: string;
}

// Animation variants
export const animationVariants: AnimationVariants = {
  containerVariants: {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  },

  itemVariants: {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      y: -150,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  },

  listItemVariants: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  },
};

// Benefits data
export const benefitsData: BenefitItem[] = [
  {
    title: "Evidence-Based Information",
    description:
      "All drug information is backed by the latest clinical research and regularly updated",
  },
  {
    title: "Comprehensive Database",
    description:
      "Access information on over 30,000 prescription and over-the-counter medications",
  },
  {
    title: "Advanced Interaction Checker",
    description:
      "Instantly identify potential drug interactions to ensure patient safety and make informed decisions",
  },
  {
    title: "Personalized Dashboards",
    description:
      "Customize your experience to focus on the medications most relevant to your practice",
  },
];

// Features data
export const featuresData: FeatureItem[] = [
  {
    title: "Drug Database",
    description:
      "Access comprehensive information including dosing guidelines, contraindications, side effects, and mechanism of action for thousands of medications.",
    icon: "💊",
    features: [
      "Dosage calculators",
      "Administration guidelines",
      "Generic alternatives",
    ],
  },
  {
    title: "Analytics Dashboard",
    description:
      "Track prescription patterns, monitor drug efficacy data, and generate custom reports to optimize patient care and outcomes.",
    icon: "📊",
    features: ["Prescription trends", "Outcome tracking", "Custom PDF exports"],
  },
  {
    title: "Clinical Resources",
    description:
      "Access evidence-based guidelines, continuing education materials, and the latest research in pharmaceutical treatments.",
    icon: "📚",
    features: [
      "Treatment protocols",
      "CME opportunities",
      "Research summaries",
    ],
  },
];

// Progress data
export const progressData: ProgressItem[] = [
  {
    label: "Database Completeness",
    value: 95,
    color: "success",
  },
  {
    label: "User Satisfaction",
    value: 92,
    color: "primary",
  },
  {
    label: "API Reliability",
    value: 99.9,
    color: "secondary",
  },
];

// Statistics data
export const statisticsData: StatItem[] = [
  { value: "30k+", label: "Medications" },
  { value: "15k+", label: "Active Users" },
  { value: "5M+", label: "Searches Monthly" },
  { value: "99.9%", label: "Uptime" },
];

// FAQ data
export const faqData: FAQItem[] = [
  {
    key: "1",
    question: "How often is the drug database updated?",
    answer:
      "Our database is updated daily to ensure you have access to the most current information and newly approved medications.",
  },
  {
    key: "2",
    question: "Can I access DrugBoard on mobile devices?",
    answer:
      "Yes, DrugBoard is fully responsive and available on all devices. We also offer dedicated iOS and Android apps.",
  },
  {
    key: "3",
    question: "Is my data secure on the platform?",
    answer:
      "Absolutely. We employ industry-leading encryption standards and are fully HIPAA compliant to protect all user data.",
  },
  {
    key: "4",
    question: "Can I integrate DrugBoard with my EMR system?",
    answer:
      "Yes, we offer API connections to most major EMR systems. Our technical team can help set up a secure integration for your practice.",
  },
];

// Page content
export const pageContent = {
  header: {
    title: "Welcome to DrugBoard",
    description:
      "Your comprehensive platform for pharmaceutical information and management. DrugBoard provides healthcare professionals with accurate, up-to-date information on medications, interactions, dosing guidelines, and more.",
  },
  sections: {
    benefits: {
      title: "Why Choose DrugBoard?",
    },
    features: {},
    progress: {
      title: "Platform Development",
    },
    statistics: {
      title: "Trusted by Healthcare Professionals",
    },
    faq: {
      title: "Frequently Asked Questions",
    },
  },
  cta: {
    title: "Ready to Transform Your Practice?",
    description:
      "Join thousands of healthcare professionals who rely on DrugBoard daily for critical medication information and clinical decision support.",
    primaryButton: "Get Started Free",
    secondaryButton: "Schedule Demo",
    footnote: "No credit card required. Free trial for 14 days.",
  },
  newsletter: {
    title: "Stay Updated with Drug Information",
    description:
      "Subscribe to our newsletter for the latest pharmaceutical updates and platform features",
    buttonText: "Subscribe",
  },
};
