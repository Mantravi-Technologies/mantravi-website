export const privacyPolicyMeta = {
  title: "Privacy Policy",
  subtitle:
    "Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.",
  lastUpdated: "November 2025",
  contactEmail: "info@mantravi.com",
};

export const privacyPolicyToc = [
  { id: "information-we-collect", label: "Information that we collect from you" },
  { id: "use-of-cookies", label: "Use of cookies" },
  {
    id: "use-of-information",
    label: "Use of your information that we collect",
  },
  { id: "saving-information", label: "Saving your personal information" },
  { id: "disclosing-data", label: "Disclosing your data" },
  {
    id: "third-party-links",
    label: "Including third party links or websites",
  },
  { id: "amendments", label: "Amendments to this privacy policy" },
  {
    id: "acceptance",
    label: "Your acceptance to this privacy policy and terms",
  },
] as const;

export const privacyPolicyIntro = [
  "At Mantravi, we are dedicated to protecting and preserving the privacy of our clients and visitors. This statement aims to provide a detailed overview of how Mantravi will use and process your personal data. Please note that by visiting, viewing, and using mantravi.com, you accept our policy, terms & conditions, and practices mentioned in this Privacy Policy page.",
  "This Privacy Policy explains how we utilize the personal information you provide or collect from you while you visit our website. Also, we periodically update this policy page, and we encourage you to review it regularly for any changes.",
];

export type PrivacySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  subsections?: {
    title: string;
    paragraphs: string[];
  }[];
  note?: string;
};

export const privacyPolicySections: PrivacySection[] = [
  {
    id: "information-we-collect",
    title: "Information that we collect from you",
    paragraphs: [
      "While visiting our website, we may collect and process the below mentioned information about you:",
    ],
    subsections: [
      {
        title: "Why you are visiting our website?",
        paragraphs: [
          "This involves collecting information about your visits, including the pages you viewed and the resources you accessed. This information encompasses traffic data, communication data, and location data.",
        ],
      },
      {
        title: "Information Voluntarily Shared By You",
        paragraphs: [
          "Your voluntarily provided data is an essential component of our personalized service, guaranteeing that your data is handled securely in compliance with our privacy policies.",
        ],
      },
      {
        title: "Data That You Provide While You Contact Us",
        paragraphs: [
          "Your communication with us encompasses sharing essential data and fostering a transparent exchange of information that is treated with utmost confidentiality and in compliance with our privacy standards.",
        ],
      },
    ],
    note: "We DO NOT save any payment details, including your financial details, credit card, or bank account details while processing any kind of payment.",
  },
  {
    id: "use-of-cookies",
    title: "Use of Cookies",
    paragraphs: [
      "Cookies provide information regarding the operating system used by a visitor. We may use cookies to gather data about your system so that it can assist us in enhancing our website. By using the cookie feature, we may also collect information about general Internet use. As we said earlier, the information we save will not identify you personally. It's just statistical data and does not identify any personal details whatsoever. If you don't want us to save your data, you can adjust the settings on your computer to decline the cookies if you wish.",
      "Here are some of the cookies that we utilize for different purposes:",
    ],
    subsections: [
      {
        title: "Technical Cookies",
        paragraphs: [
          "These cookies manage functions like logging in, filling out forms, and modifying privacy settings necessary for optimal website functionality. Certain site features may not display and perform properly if your browser is set to block these cookies.",
        ],
      },
      {
        title: "Customization Cookies",
        paragraphs: [
          "These cookies help us improve website personalization and functionality, whether established by us or third-party providers. If you disable these cookies, some services on our pages might not work as intended, impacting your customized experience.",
        ],
      },
      {
        title: "Behavioral Advertising Cookies",
        paragraphs: [
          "These cookies are used to build a user profile for targeted advertising on other websites set by our advertising partners. If you reject these cookies, you might see less tailored advertisements when you browse the internet.",
        ],
      },
      {
        title: "Performance Cookies",
        paragraphs: [
          "These cookies allow us to measure and enhance the performance of our site by tracking the number of visits and traffic sources. If you disable these cookies, it will prevent us from tracking your site visits and improve the website's performance as a whole.",
        ],
      },
    ],
  },
  {
    id: "use-of-information",
    title: "Use of the Information That We Collect",
    paragraphs: [
      "We use the data we collect from you to provide you with our services. Additionally, we may use the information for one or more of the below-mentioned purposes:",
      "You have the option to withdraw your consent at any time by contacting us at info@mantravi.com.",
    ],
    subsections: [
      {
        title: "",
        paragraphs: [
          "To quickly provide you the glance of information that you requested from us related to our products or services",
          "To help you provide the information related to other products that may interest you. However, such additional information will only be sent to you if you have consented to receive the information",
          "To notify you of the changes to our website, services, and products",
          "We may also send you the information and details of our products or services if you have previously availed any of them",
          "With your prior consent, we may permit the chosen third parties to use your information to provide details about products and services that may interest you",
        ],
      },
    ],
  },
  {
    id: "saving-information",
    title: "Saving your personal information",
    paragraphs: [
      "By providing your personal information, you agree to this access. We do our best to ensure that all the required steps are taken to save your data securely. Unfortunately, the information you send online is not fully secure and can be intercepted easily. We cannot guarantee the security of the data sent to us electronically because sending such information is completely at your own risk.",
    ],
  },
  {
    id: "disclosing-data",
    title: "Disclosing your data",
    paragraphs: [
      "We do not sell, trade, or rent our end-users' personal or identity information to third parties. We may share the generic aggregated information, which is not related to any personal identification information regarding visitors and users, with our trusted affiliates, business partners, and advertisers for marketing purposes.",
    ],
  },
  {
    id: "third-party-links",
    title: "Including Third-Party Links or Websites",
    paragraphs: [
      "Sometimes, we may include links to third parties on the website. And, even though we may provide a link to third parties, that does not mean we endorse or approve our site's policy towards visitor privacy. It is imperative that users independently evaluate these third-party websites' privacy policies because they may have different privacy standards. When navigating any external website from our platform, we advise you to use it cautiously and familiarize yourself with its privacy policies.",
    ],
    subsections: [
      {
        title: "Embedded Sharing Widgets",
        paragraphs: [
          "Certain pages might have widgets or embedded share buttons that let you share content with friends on other social networking sites. We advise you to be aware that these social media platforms might use cookies that could allow them to identify you uniquely.",
        ],
      },
    ],
  },
  {
    id: "amendments",
    title: "Amendments to this privacy policy",
    paragraphs: [
      "We hold the right to update this privacy policy anytime, and any amendments will be reflected by revising the updated date on the page. We encourage users to check the page frequently for any changes so that they can stay informed about the steps we are taking to protect the personal information that we collect. Thus, we consider that you acknowledge and agree that it's solely your responsibility to check and review the privacy policy frequently and periodically and remain aware of the updates and latest modifications.",
    ],
  },
  {
    id: "acceptance",
    title: "Your Acceptance of this Policy's Terms and Conditions",
    paragraphs: [
      "If you are using our website, you signify your acceptance of this privacy policy. And, if you don't agree to the policy, please do not use Mantravi's site. Your continued use of Mantravi's site following the sharing of changes to this privacy policy will be deemed as your acceptance of those updates and changes.",
    ],
  },
];
