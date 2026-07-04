export type ExperienceEntry = {
  role: string;
  org: string;
  dates: string;
  meta: string;
  note?: string;
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Full Stack Engineer",
    org: "ACTIMI",
    dates: "Sep 2025 — Present",
    meta: "Full-time",
  },
  {
    role: "Co-Founder",
    org: "Vestcodes",
    dates: "Jul 2025 — Present",
    meta: "Self-employed · Muzaffarpur, India",
  },
  {
    role: "Cybersecurity Research Assistant",
    org: "Fraunhofer-Gesellschaft",
    dates: "Mar 2025 — Aug 2025",
    meta: "Hilfswissenschaftler · Stuttgart Region",
  },
  {
    role: "Summer Intern",
    org: "Airbus",
    dates: "Mar 2025 — Jun 2025",
    meta: "Internship · Bietigheim, Germany",
  },
  {
    role: "Co-Founder",
    org: "Esportzvio",
    dates: "Jun 2021 — Jun 2025",
    meta: "Self-employed · Remote",
    note: "Exited in a cash deal.",
  },
  {
    role: "Werkstudent, COO Office",
    org: "SAP",
    dates: "Jul 2024 — Jan 2025",
    meta: "Part-time · Remote",
    note: "Strategic initiatives — AI and Industry Foundation — for the Industry Product Engineering department's COO.",
  },
  {
    role: "Co-Lead",
    org: "GDSC Saarland University",
    dates: "Mar 2023 — Oct 2024",
    meta: "Work study · Saarbrücken",
    note: "Core team member, then co-lead.",
  },
  {
    role: "Application Security Intern",
    org: "Deutsche Bahn",
    dates: "Feb 2024 — May 2024",
    meta: "Internship · Remote",
    note: "Security assessments of web applications and APIs, secure-SDLC guidelines, and automated security testing in CI/CD.",
  },
  {
    role: "Research Assistant",
    org: "Fraunhofer IZFP",
    dates: "Apr 2023 — Mar 2024",
    meta: "Part-time · Saarbrücken",
    note: "Nondestructive testing.",
  },
  {
    role: "Summer Intern",
    org: "Cisco",
    dates: "Aug 2023 — Oct 2023",
    meta: "Internship · Saarbrücken",
  },
  {
    role: "Cybersecurity Intern",
    org: "AICTE",
    dates: "Aug 2023 — Oct 2023",
    meta: "Internship · Remote",
  },
  {
    role: "AWS Cloud Intern",
    org: "AICTE",
    dates: "Jul 2022 — Sep 2022",
    meta: "Internship · Remote",
  },
  {
    role: "Web Development Intern",
    org: "Esports Federation of India",
    dates: "Feb 2021 — Mar 2022",
    meta: "Part-time · Remote",
  },
  {
    role: "Software Development Intern",
    org: "Resistance Esports",
    dates: "Jul 2020 — Jan 2022",
    meta: "Internship · Remote",
  },
];

export type EducationEntry = {
  school: string;
  degree: string;
  dates: string;
  note?: string;
};

export const EDUCATION: EducationEntry[] = [
  {
    school: "Technical University of Munich",
    degree: "B.Sc. Information Technology",
    dates: "2024 — 2027",
    note: "In progress.",
  },
  {
    school: "Universität des Saarlandes",
    degree: "Studienkolleg, T-Kurs",
    dates: "2023 — 2024",
  },
  {
    school: "Heimvolkshochschule Mariaspring",
    degree: "Preparatory German course",
    dates: "2022",
    note: "Grade 1.2.",
  },
  {
    school: "Indraprastha International School, Delhi",
    degree: "Senior secondary — AISSCE",
    dates: "2019 — 2021",
    note: "96.2%.",
  },
  {
    school: "DAV Public School, Muzaffarpur",
    degree: "Secondary — AISSE",
    dates: "2015 — 2019",
    note: "94.4%.",
  },
];

export type ProjectEntry = {
  name: string;
  description: string;
  language: string;
  url: string;
};

export const PROJECTS: ProjectEntry[] = [
  {
    name: "CIS_Scripts",
    description:
      "Automated scripts for auditing and enforcing CIS v3.0.0 benchmarks on Windows 11.",
    language: "PowerShell",
    url: "https://github.com/0xsarwagya/CIS_Scripts",
  },
  {
    name: "cvssify",
    description:
      "A TypeScript library for calculating Common Vulnerability Scoring System (CVSS) scores.",
    language: "TypeScript",
    url: "https://github.com/0xsarwagya/cvssify",
  },
  {
    name: "sniffa",
    description:
      "A lightweight packet sniffer for capturing and analyzing network traffic.",
    language: "TypeScript",
    url: "https://github.com/0xsarwagya/sniffa",
  },
  {
    name: "arunya",
    description:
      "Privacy-first, open-source analytics built to enlighten without intruding. Work in progress.",
    language: "TypeScript",
    url: "https://github.com/0xsarwagya/arunya",
  },
  {
    name: "maifar-storage",
    description:
      "MQTT JSON ingest to PostgreSQL with batched flush and an HTTP export API, built on Bun.",
    language: "TypeScript",
    url: "https://github.com/0xsarwagya/maifar-storage",
  },
  {
    name: "logrivet",
    description:
      "A lightweight logging utility with customizable formatting and file storage.",
    language: "TypeScript",
    url: "https://github.com/0xsarwagya/logrivet",
  },
];
