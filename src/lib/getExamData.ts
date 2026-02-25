import { CourseData, ExamDetail } from "@/features/courses/courses";


// ---- Exam Data ----
const allExamDetails: Record<string, ExamDetail> = {
    // ------------------ ENGINEERING ------------------
    "JEE Main": {
        title: "JEE Main",
        syllabus:
            "Physics, Chemistry, and Mathematics from Class 11 and 12 NCERT curriculum.",
        month: "Two sessions — January and April.",
        examPattern: {
            Mode: "Computer-Based Test (CBT)",
            Duration: "3 hours",
            Questions: "75 questions (25 each in Physics, Chemistry, Mathematics)",
            "Marking Scheme":
                "300 Marks (100 each subject), +4 for correct, -1 for incorrect, no negative for numerical type (20 MCQs, 5 Numerical).",
        },
        topColleges: ["NITs", "IIITs", "CFTIs"],
        attempts: "Twice a year; no restriction on number of attempts.",
        qualifyingCriteria: {
            Academic: "10+2 with PCM",
            Marks:
                "Minimum 75% aggregate (65% for SC/ST) or Top 20 percentile in board.",
        },
    },
    "JEE Advanced": {
        title: "JEE Advanced",
        syllabus:
            "Advanced topics in Physics, Chemistry, and Mathematics beyond JEE Main level.",
        month: "May",
        examPattern: {
            Mode: "Computer-Based Test",
            Papers:
                "Two mandatory papers (Paper 1 & 2) — Physics, Chemistry, Mathematics",
            "Question Types": "MCQs, numerical, and matching type questions",
            "Marking Scheme":
                "Varies; includes negative marking of -1 or -2 for incorrect answers.",
        },
        topColleges: ["23 IITs across India"],
        attempts: "Maximum two attempts in consecutive years.",
        qualifyingCriteria: {
            Academic: "Top 2.5 lakh JEE Main rankers",
            Marks: "75% in PCM (65% SC/ST/PwD) or top 20 percentile in board.",
        },
    },
    "MHT-CET": {
        title: "MHT-CET (PCM)",
        syllabus:
            "Physics, Chemistry, and Mathematics from Maharashtra Board Class 11 (20%) and Class 12 (80%) syllabus.",
        month: "April or May",
        examPattern: {
            Mode: "Computer-Based Test",
            Questions: "150 (50 each in Physics, Chemistry, Mathematics)",
            "Marking Scheme":
                "+2 for Math, +1 for Physics & Chemistry; no negative marking.",
        },
        topColleges: ["VJTI Mumbai", "COEP Pune", "ICT Mumbai"],
        attempts: "Once a year.",
        qualifyingCriteria: {
            Academic: "10+2 with PCM",
            Marks: "Minimum 50% in PCM (40% for SC/ST/PwD).",
        },
    },
    BITSAT: {
        title: "BITSAT",
        syllabus:
            "Physics, Chemistry, Mathematics/Biology, English Proficiency, and Logical Reasoning based on Class 11–12 NCERT.",
        month: "May–June",
        examPattern: {
            Mode: "Computer-Based Test",
            Questions: "130",
            "Marking Scheme":
                "390 Marks; +3 for correct, -1 for incorrect (Physics & Chemistry 90 each, Math/Bio 120, English 30, LR 60).",
        },
        topColleges: ["BITS Pilani", "BITS Goa", "BITS Hyderabad", "BITS Dubai"],
        attempts: "Max 2 per year.",
        qualifyingCriteria: {
            Academic: "10+2 with PCM & English",
            Marks: "75% in PCM, 60% individually per subject.",
        },
    },
    VITEEE: {
        title: "VITEEE",
        syllabus:
            "Physics, Chemistry, Mathematics/Biology, English, and Aptitude (Class 11 & 12 curriculum).",
        month: "April",
        examPattern: {
            Mode: "Computer-Based Test",
            Questions: "125 MCQs",
            "Marking Scheme": "+1 for correct; no negative marking.",
        },
        topColleges: ["VIT Vellore", "VIT Chennai", "VIT Bhopal", "VIT-AP"],
        attempts: "Once a year.",
        qualifyingCriteria: {
            Academic: "10+2 with PCM/PCB",
            Marks: "Minimum 60% (50% for SC/ST/PwD).",
        },
    },

    // ------------------ MEDICAL ------------------
    "NEET-UG": {
        title: "NEET-UG",
        syllabus:
            "Physics, Chemistry, and Biology (Botany & Zoology) from Class 11 and 12 NCERT.",
        month: "May",
        examPattern: {
            Mode: "Offline (Pen-and-Paper)",
            Duration: "3 hours",
            Questions: "180 MCQs (45 Physics, 45 Chemistry, 90 Biology)",
            "Marking Scheme":
                "720 Marks total — +4 for correct, -1 for incorrect (Physics & Chemistry 180 each, Biology 360).",
        },
        topColleges: ["AIIMS", "JIPMER", "AFMC", "Government Medical Colleges"],
        attempts: "No official limit.",
        qualifyingCriteria: {
            Academic: "10+2 with PCB",
            Marks: "Minimum 50% aggregate (40% SC/ST, 45% PwD).",
        },
    },
    "MHT-CET (PCB)": {
        title: "MHT-CET (PCB)",
        syllabus:
            "Physics, Chemistry, and Biology from Maharashtra State Board Class 11 (20%) and Class 12 (80%) syllabus.",
        month: "April or May",
        examPattern: {
            Mode: "Computer-Based Test",
            Questions: "200 (50 each in Physics, Chemistry, Botany, Zoology)",
            "Marking Scheme": "+1 for each correct; no negative marking.",
        },
        topColleges: ["Govt & Private Medical, Dental, and Pharmacy Colleges in Maharashtra"],
        attempts: "Once a year.",
        qualifyingCriteria: {
            Academic: "10+2 with PCB",
            Marks: "Minimum 50% (40% SC/ST/PwD).",
        },
    },
    "IISER Aptitude Test": {
        title: "IISER Aptitude Test (IAT)",
        syllabus:
            "Biology, Chemistry, Mathematics, and Physics (Class 11 & 12 NCERT).",
        month: "May",
        examPattern: {
            Mode: "Computer-Based Test",
            Questions: "60 (15 from each subject)",
            "Marking Scheme": "+3 for correct, -1 for incorrect.",
        },
        topColleges: [
            "IISER Pune",
            "IISER Kolkata",
            "IISER Mohali",
            "IISER Bhopal",
            "IISER Thiruvananthapuram",
            "IISER Tirupati",
            "IISER Berhampur",
        ],
        attempts: "Once a year.",
        qualifyingCriteria: {
            Academic: "10+2 with Science (appearing/passed)",
            Marks:
                "Must meet minimum percentile cutoff in board (varies by year/board).",
        },
    },
};

// ---- Course Data ----
export const getExamData = (slug: string): CourseData | null => {
    const data: Record<string, CourseData>={
        // ------------------ PCM ------------------
        pcm: {
            title: "Engineering (PCM) Entrance Program (Class 11–12)",
            description:
                "A two-year intensive course for engineering aspirants preparing for JEE Main, JEE Advanced, MHT-CET, BITSAT, and VITEEE. The program focuses on deep conceptual understanding, analytical thinking, and exam-specific strategies in Physics, Chemistry, and Mathematics.",
            exams: [
                allExamDetails["JEE Main"],
                allExamDetails["JEE Advanced"],
                allExamDetails["MHT-CET"],
                allExamDetails["BITSAT"],
                allExamDetails["VITEEE"],
            ],
            schedule: {
                type: "regular",
                title: "Daily Lecture and Practice Schedule (Tuesday–Sunday)",
                sessions: [
                    { time: "8:30 AM – 10:00 AM", activity: "Lecture 1 – Physics" },
                    { time: "10:15 AM – 11:45 AM", activity: "Lecture 2 – Chemistry" },
                    { time: "11:45 AM – 12:30 PM", activity: "Lunch Break" },
                    { time: "12:30 PM – 2:00 PM", activity: "Lecture 3 – Mathematics" },
                    { time: "2:15 PM – 3:45 PM", activity: "Lecture 4 – Practice/Concept Integration" },
                    {
                        time: "3:45 PM – 5:30 PM",
                        activity:
                            "Conceptual Auditing & Practice Session — guided by IIT faculty with daily worksheets on accuracy, application, and clarity.",
                    },
                ],
                weeklyTest: {
                    title: "Weekly Test Plan (Every Sunday)",
                    engineering: {
                        marks: "300 Marks",
                        description:
                            "Simulates JEE Main & Advanced level difficulty — conceptual and tricky questions aligned to the real exam.",
                    },
                },
            },
        },

        // ------------------ PCB ------------------
        pcb: {
            title: "Medical (PCB) Entrance Program (Class 11–12)",
            description:
                "Comprehensive two-year program designed for NEET-UG, IISER Aptitude Test, and MHT-CET (PCB) aspirants. Focuses on conceptual clarity in Biology, Physics, and Chemistry with regular testing and mentorship.",
            exams: [
                allExamDetails["NEET-UG"],
                allExamDetails["IISER Aptitude Test"],
                allExamDetails["MHT-CET (PCB)"],
            ],
            schedule: {
                type: "regular",
                title: "Daily Lecture and Practice Schedule (Tuesday–Sunday)",
                sessions: [
                    { time: "8:30 AM – 10:00 AM", activity: "Lecture 1 – Biology (Core Topic)" },
                    { time: "10:15 AM – 11:45 AM", activity: "Lecture 2 – Physics (Concepts & Numericals)" },
                    { time: "11:45 AM – 12:30 PM", activity: "Lunch Break" },
                    { time: "12:30 PM – 2:00 PM", activity: "Lecture 3 – Chemistry (Organic/Inorganic)" },
                    { time: "2:15 PM – 3:45 PM", activity: "Lecture 4 – Biology Revision & Practice" },
                    {
                        time: "3:45 PM – 5:30 PM",
                        activity:
                            "Conceptual Auditing Method — Practice under NEET-experienced faculty with topic-based worksheets and mock drills.",
                    },
                ],
                weeklyTest: {
                    title: "Weekly Test Plan (Every Sunday)",
                    medical: {
                        marks: "720 Marks",
                        description:
                            "Simulates NEET-UG exam conditions with 180 MCQs, +4/-1 marking, and a full 3-hour paper for real-time evaluation.",
                    },
                },
            },
        },

        // ------------------ FOUNDATION ------------------
        foundation: {
            title: "Foundation Program (Class 8–10)",
            description:
                "Designed to build early aptitude and interest in Science and Mathematics, preparing students for Olympiads, NTSE, and Homi Bhabha exams with curiosity-driven learning.",
            exams: [
                {
                    title: "Olympiad Exams",
                    syllabus: "Mathematics, Science, and Reasoning based on school curriculum.",
                    month: "Varies annually.",
                    examPattern: { Mode: "Offline/Online", Duration: "1–2 hours" },
                    topColleges: [],
                    attempts: "Once a year.",
                    qualifyingCriteria: { Academic: "Class 8–10 students", Marks: "Not applicable." },
                },
                {
                    title: "NTSE",
                    syllabus: "Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT).",
                    month: "Typically November–December.",
                    examPattern: { Mode: "Offline", Duration: "2 hours each paper" },
                    topColleges: [],
                    attempts: "Once a year.",
                    qualifyingCriteria: { Academic: "Class 10", Marks: "Minimum qualifying score as per NCERT." },
                },
            ],
            schedule: {
                type: "sunday",
                title: "Sunday Exclusive Foundation Schedule",
                sessions: [
                    { time: "8:30 AM – 10:00 AM", activity: "Lecture 1 – Science/Mathematics Concepts" },
                    { time: "10:15 AM – 11:45 AM", activity: "Lecture 2 – Application & Problem Solving" },
                    { time: "11:45 AM – 12:15 PM", activity: "Short Break" },
                    { time: "12:15 PM – 1:30 PM", activity: "Quiz/Test & Problem-Solving Workshop" },
                    {
                        time: "1:30 PM – 2:30 PM",
                        activity:
                            "Doubt Solving and Concept Reinforcement — weekly mentoring and recap activities.",
                    },
                ],
                weeklyTest: {
                    title: "Weekly Evaluation (Every Saturday)",
                    description:
                        "Topic-wise tests and quizzes including NTSE and Olympiad-style analytical questions for steady conceptual growth.",
                },
            },
        },

        // ------------------ CBSE FOUNDATION ------------------
        "foundation-cbse": {
            title: "CBSE Academic Coaching Classes (2026–2027)",
            description: `
                CBSE Academic Coaching Classes – Academic Year 2026–2027  
                For Classes 8, 9 & 10  

                The CBSE Academic Coaching Program at Inspire Academy is designed to provide strong conceptual clarity, exam-oriented preparation, and continuous academic monitoring.

                The program strictly follows the latest CBSE curriculum and examination pattern, ensuring students are fully prepared for school exams, periodic tests, board examinations, and future competitive pathways.
`,

            impPoints: [
                "Experienced & subject-expert faculty",
                "Small batch sizes for individual attention",
                "Structured syllabus completion with zero backlog",
                "Regular testing & performance tracking",
                "Strong discipline & academic monitoring",
                "Seamless bridge between CBSE academics & competitive exams",
                "Parent–Teacher Meetings after every periodic test",
                "Performance analysis & improvement tracking"
            ],

            exams: [
                {
                    title: "CBSE Curriculum (Class 8–10)",
                    syllabus:
                        "Mathematics, Science, Social Science as per latest CBSE & NCERT guidelines aligned with NEP 2020 competency-based pattern.",
                    month: "Academic Year 2026–2027",
                    examPattern: {
                        Mode: "School & Board Based Exams",
                        Pattern: "Competency-based & NCERT aligned",
                        Evaluation: "Periodic Tests, Half-Yearly, Pre-Boards & Annual Exams",
                    },
                    topColleges: [],
                    attempts: "Annual Board Evaluation",
                    qualifyingCriteria: {
                        Academic: "Students of Class 8, 9 & 10 (CBSE Board)",
                        Marks: "Promotion & Board Qualification as per CBSE norms",
                    },
                },
            ],

            schedule: {
                type: "regular",
                title: "Class Schedule (Monday – Saturday)",
                sessions: [
                    { time: "5:00 PM – 5:45 PM", activity: "Subject 1 (Mathematics / Rotation)" },
                    { time: "5:45 PM – 6:30 PM", activity: "Subject 2 (Science / Rotation)" },
                    { time: "6:30 PM – 7:15 PM", activity: "Subject 3 (Social Science / Rotation)" },
                    { time: "6 Days / Week", activity: "Regular academic coverage & doubt resolution" },
                    { time: "Weekly Test", activity: "Structured Tests based on syllabus covered" },
                ],
                weeklyTest: {
                    title: "Assessment & Examination Plan",
                    description: `
Weekly Tests – Every week (recently completed syllabus)  
Periodic Test 1 – As per CBSE calendar  
Periodic Test 2 – As per CBSE calendar  
Half-Yearly Exam – Strict CBSE pattern  
Annual Exam – Strict CBSE pattern  
Two Pre-Board Exams after 50% syllabus completion  
Minimum Five Full-Length Pre-Boards before final exams  
`,
                },
            },
        },


    };

    return data[slug] ?? null;
};
