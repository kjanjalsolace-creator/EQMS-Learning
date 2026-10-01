import type {
  Category,
  Course,
  Instructor,
  Testimonial,
  FAQ,
  NewsArticle,
  PricingPlan,
  Coupon,
  User,
  Employee,
  Review,
} from '@/types';
import { ASSETS } from '@/data/assets';

/* ============================================================
 *  CATEGORIES — 12 compliance training categories
 * ============================================================ */
export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Health & Safety', slug: 'health-and-safety', icon: 'HardHat', description: 'Core workplace health and safety training covering legal duties, hazard awareness and safe systems of work.', courseCount: 6 },
  { id: 'cat-2', name: 'Fire Safety', slug: 'fire-safety', icon: 'Flame', description: 'Fire safety awareness, warden duties and evacuation procedures to meet the Regulatory Reform (Fire Safety) Order 2005.', courseCount: 2 },
  { id: 'cat-3', name: 'Manual Handling', slug: 'manual-handling', icon: 'Hand', description: 'Safe lifting, carrying and handling techniques to reduce musculoskeletal injuries in the workplace.', courseCount: 2 },
  { id: 'cat-4', name: 'HR & Employment', slug: 'hr-and-employment', icon: 'Users', description: 'Employment law, equality, harassment and workplace conduct training for staff and managers.', courseCount: 4 },
  { id: 'cat-5', name: 'Data Protection & GDPR', slug: 'data-protection-and-gdpr', icon: 'ShieldCheck', description: 'UK GDPR and Data Protection Act 2018 training for employees and data protection officers.', courseCount: 2 },
  { id: 'cat-6', name: 'Cyber Security', slug: 'cyber-security', icon: 'Lock', description: 'Cyber security awareness, phishing prevention and information security best practice for all staff.', courseCount: 3 },
  { id: 'cat-7', name: 'Environmental', slug: 'environmental', icon: 'Leaf', description: 'Environmental awareness, waste management and sustainability training for modern workplaces.', courseCount: 2 },
  { id: 'cat-8', name: 'Food Safety', slug: 'food-safety', icon: 'UtensilsCrossed', description: 'Food hygiene, HACCP principles and allergen control for catering, retail and manufacturing.', courseCount: 2 },
  { id: 'cat-9', name: 'Safeguarding', slug: 'safeguarding', icon: 'Baby', description: 'Safeguarding children and adults at risk training for those working with vulnerable groups.', courseCount: 2 },
  { id: 'cat-10', name: 'Equality & Diversity', slug: 'equality-and-diversity', icon: 'Scale', description: 'Equality, diversity and inclusion training to promote fair and respectful workplaces.', courseCount: 2 },
  { id: 'cat-11', name: 'Leadership & Management', slug: 'leadership-and-management', icon: 'Briefcase', description: 'Leadership, change management and supervisory skills for current and aspiring managers.', courseCount: 3 },
  { id: 'cat-12', name: 'Mental Health & Wellbeing', slug: 'mental-health-and-wellbeing', icon: 'HeartPulse', description: 'Mental health awareness, stress management and wellbeing training for individuals and teams.', courseCount: 6 },
];

/* ============================================================
 *  INSTRUCTORS — 4 subject-matter experts
 * ============================================================ */
export const INSTRUCTORS: Instructor[] = [
  {
    id: 'ins-1',
    name: 'James Whitfield',
    title: 'Lead Health & Safety Consultant',
    bio: 'A NEBOSH-qualified safety professional with over 18 years’ experience advising construction, manufacturing and office-based organisations on compliance and risk management.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    courseCount: 12,
    students: 8400,
    rating: 4.9,
  },
  {
    id: 'ins-2',
    name: 'Dr. Priya Sharma',
    title: 'Data Protection & GDPR Specialist',
    bio: 'A solicitor and certified data protection officer who has guided FTSE 250 firms through GDPR implementation, breach response and ICO audits for more than a decade.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    courseCount: 6,
    students: 5200,
    rating: 4.8,
  },
  {
    id: 'ins-3',
    name: 'Michael O’Connor',
    title: 'Cyber Security Trainer',
    bio: 'A CompTIA Security+ certified analyst turned educator, Michael has delivered security awareness programmes to over 30,000 staff across the financial and healthcare sectors.',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    courseCount: 5,
    students: 11200,
    rating: 4.7,
  },
  {
    id: 'ins-4',
    name: 'Sarah Bennett',
    title: 'Mental Health & Safeguarding Lead',
    bio: 'A registered mental health nurse and accredited safeguarding trainer, Sarah designs wellbeing and protection programmes for schools, care providers and corporate teams.',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    courseCount: 8,
    students: 6900,
    rating: 4.9,
  },
];

/* ============================================================
 *  COURSES — 36 courses across all categories
 * ============================================================ */
const THUMBS = [
  'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
  'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg',
  'https://images.pexels.com/photos/5212659/pexels-photo-5212659.jpeg',
  'https://images.pexels.com/photos/5212705/pexels-photo-5212705.jpeg',
  'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg',
  'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
  'https://images.pexels.com/photos/590049/pexels-photo-590049.jpeg',
  'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
  'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg',
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
  'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
  'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
  'https://images.pexels.com/photos/3184392/pexels-photo-3184392.jpeg',
  'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg',
  'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg',
  'https://images.pexels.com/photos/3184329/pexels-photo-3184329.jpeg',
  'https://images.pexels.com/photos/3184404/pexels-photo-3184404.jpeg',
  'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg',
  'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
  'https://images.pexels.com/photos/1595392/pexels-photo-1595392.jpeg',
  'https://images.pexels.com/photos/3184360/pexels-photo-3184465.jpeg',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184339.jpeg',
  'https://images.pexels.com/photos/3184405/pexels-photo-3184392.jpeg',
  'https://images.pexels.com/photos/3184287/pexels-photo-3184311.jpeg',
  'https://images.pexels.com/photos/3184329/pexels-photo-3184404.jpeg',
  'https://images.pexels.com/photos/1595385/pexels-photo-1595391.jpeg',
  'https://images.pexels.com/photos/1595392/pexels-photo-1181396.jpeg',
  'https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg',
  'https://images.pexels.com/photos/3184325/pexels-photo-3184360.jpeg',
  'https://images.pexels.com/photos/3184465/pexels-photo-3184292.jpeg',
  'https://images.pexels.com/photos/3184339/pexels-photo-3184405.jpeg',
  'https://images.pexels.com/photos/3184392/pexels-photo-3184287.jpeg',
  'https://images.pexels.com/photos/3184311/pexels-photo-3184329.jpeg',
  'https://images.pexels.com/photos/3184404/pexels-photo-1595385.jpeg',
  'https://images.pexels.com/photos/1595391/pexels-photo-1595392.jpeg',
];

const quizQuestions = {
  fire: [
    { id: 'q1', question: 'What is the correct acronym for operating a fire extinguisher?', options: ['PASS — Pull, Aim, Squeeze, Sweep', 'PUSH — Pull, Use, Squeeze, Hold', 'PASS — Point, Aim, Squeeze, Sweep', 'PALS — Pull, Aim, Lock, Sweep'], correctAnswer: 0, explanation: 'PASS stands for Pull the pin, Aim at the base, Squeeze the handle and Sweep side to side.' },
    { id: 'q2', question: 'Which class of fire involves electrical equipment?', options: ['Class A', 'Class B', 'Class C', 'Class F'], correctAnswer: 2, explanation: 'Electrical fires are Class C in the UK system and require a non-conductive extinguishing agent.' },
    { id: 'q3', question: 'On discovering a fire, what should be your first action?', options: ['Attempt to extinguish it', 'Raise the alarm', 'Collect personal belongings', 'Call next of kin'], correctAnswer: 1, explanation: 'Always raise the alarm first so that evacuation can begin and the emergency services can be called.' },
  ],
  manualHandling: [
    { id: 'q1', question: 'What is the recommended maximum weight for a one-person lift?', options: ['10 kg', '25 kg', '50 kg', 'There is no fixed limit — it depends on the task and individual'], correctAnswer: 3, explanation: 'There is no fixed legal limit; risk assessment should consider load, task, environment and individual capability.' },
    { id: 'q2', question: 'Which muscle group should take the strain during a lift?', options: ['Back muscles', 'Arms', 'Leg muscles', 'Shoulders'], correctAnswer: 2, explanation: 'Leg muscles are the strongest and should drive the lift, keeping the back straight.' },
    { id: 'q3', question: 'What is TILE an acronym for?', options: ['Task, Individual, Load, Environment', 'Time, Injury, Location, Effort', 'Team, Inspection, Legislation, Equipment', 'Technique, Individual, Lifting, Ergonomics'], correctAnswer: 0, explanation: 'TILE stands for Task, Individual, Load and Environment — the four factors to assess.' },
  ],
  gdpr: [
    { id: 'q1', question: 'How long do you have to report a personal data breach to the ICO?', options: ['24 hours', '72 hours', '7 days', '30 days'], correctAnswer: 1, explanation: 'Under UK GDPR, breaches must be reported to the ICO within 72 hours of becoming aware.' },
    { id: 'q2', question: 'Which lawful basis is most commonly used for employee data?', options: ['Consent', 'Contract', 'Legal obligation', 'Vital interests'], correctAnswer: 1, explanation: 'Contract is typically relied upon for processing employee data necessary to fulfil the employment contract.' },
    { id: 'q3', question: 'What does the right to erasure also mean?', options: ['Right to be informed', 'Right to be forgotten', 'Right to rectification', 'Right to access'], correctAnswer: 1, explanation: 'The right to erasure is commonly known as the right to be forgotten.' },
  ],
  cyber: [
    { id: 'q1', question: 'Which of these is the strongest indicator of a phishing email?', options: ['A formal company logo', 'An urgent request for credentials or payment', 'A reply-to address matching the sender', 'Correct spelling and grammar'], correctAnswer: 1, explanation: 'Urgency and requests for credentials or payment are classic phishing tactics designed to bypass careful thought.' },
    { id: 'q2', question: 'What does MFA stand for?', options: ['Multiple Factor Access', 'Multi-Factor Authentication', 'Managed Firewall Access', 'Main Frame Authentication'], correctAnswer: 1, explanation: 'MFA is Multi-Factor Authentication, combining something you know, have and are.' },
    { id: 'q3', question: 'Which password practice is most secure?', options: ['Reusing one strong password everywhere', 'A unique password per account stored in a password manager', 'Writing passwords on a sticky note', 'Using your pet’s name'], correctAnswer: 1, explanation: 'Unique passwords per account, managed in a reputable password manager, are the recommended approach.' },
  ],
  food: [
    { id: 'q1', question: 'What is the danger zone for bacterial growth in food?', options: ['0–5 °C', '5–63 °C', '63–75 °C', 'Above 75 °C'], correctAnswer: 1, explanation: 'The danger zone is 5–63 °C, where bacteria multiply most rapidly.' },
    { id: 'q2', question: 'What does HACCP stand for?', options: ['Hazard Analysis and Critical Control Points', 'Health And Catering Compliance Policy', 'Hygiene Assessment and Cleaning Control Plan', 'Hazard Avoidance and Catering Care Procedure'], correctAnswer: 0, explanation: 'HACCP is Hazard Analysis and Critical Control Points, a systematic preventive approach to food safety.' },
    { id: 'q3', question: 'How long should you wash your hands before handling food?', options: ['5 seconds', '10 seconds', '20 seconds', '2 minutes'], correctAnswer: 2, explanation: 'Wash hands for at least 20 seconds with soap and warm water before handling food.' },
  ],
  safeguarding: [
    { id: 'q1', question: 'What is the primary aim of safeguarding?', options: ['Protecting organisational reputation', 'Preventing harm and promoting welfare', 'Reducing insurance premiums', 'Avoiding litigation'], correctAnswer: 1, explanation: 'Safeguarding aims to prevent harm and promote the welfare of children and adults at risk.' },
    { id: 'q2', question: 'Who is the designated safeguarding lead?', options: ['Any volunteer', 'A trained, named individual responsible for safeguarding concerns', 'The most senior person present', 'An external auditor'], correctAnswer: 1, explanation: 'The DSL is a trained, named individual with overall responsibility for safeguarding concerns.' },
    { id: 'q3', question: 'What should you do if a child discloses abuse?', options: ['Promise to keep it secret', 'Listen, reassure, record and report', 'Confront the alleged abuser', 'Wait a week to see if it happens again'], correctAnswer: 1, explanation: 'Listen, reassure, record factually and report immediately to the designated safeguarding lead.' },
  ],
  equality: [
    { id: 'q1', question: 'How many protected characteristics are there under the Equality Act 2010?', options: ['6', '9', '11', '14'], correctAnswer: 1, explanation: 'There are nine protected characteristics under the Equality Act 2010.' },
    { id: 'q2', question: 'Which type of discrimination occurs when a policy applies to all but disadvantages a protected group?', options: ['Direct discrimination', 'Indirect discrimination', 'Harassment', 'Victimisation'], correctAnswer: 1, explanation: 'Indirect discrimination occurs when a neutral policy disadvantages a protected group without justification.' },
    { id: 'q3', question: 'What is victimisation?', options: ['Treating someone unfairly because they raised a discrimination complaint', 'Refusing to serve a customer', 'Firing someone for poor performance', 'Promoting one employee over another'], correctAnswer: 0, explanation: 'Victimisation is treating someone unfairly because they have made or supported a complaint under the Act.' },
  ],
  mentalHealth: [
    { id: 'q1', question: 'What is the ALGEE action plan used in mental health first aid?', options: ['Approach, Listen, Give, Encourage, Encourage', 'Assess, Listen, Give, Encourage, Encourage professional help', 'Ask, Listen, Guide, Evaluate, Escalate', 'Assess, Lead, Guide, Engage, Educate'], correctAnswer: 1, explanation: 'ALGEE stands for Assess, Listen, Give reassurance, Encourage professional help and Encourage self-help.' },
    { id: 'q2', question: 'Which of these is a common sign of stress?', options: ['Improved concentration', 'Increased energy', 'Irritability and sleep disturbance', 'Heightened motivation'], correctAnswer: 2, explanation: 'Irritability and sleep disturbance are common indicators of stress.' },
    { id: 'q3', question: 'What should you do if someone mentions suicidal thoughts?', options: ['Change the subject', 'Listen without judgement and signpost to professional help', 'Tell them to snap out of it', 'Promise to keep it confidential'], correctAnswer: 1, explanation: 'Listen without judgement, take it seriously and signpost to professional help immediately.' },
  ],
  leadership: [
    { id: 'q1', question: 'Which leadership style involves setting a clear vision and motivating the team towards it?', options: ['Laissez-faire', 'Transformational', 'Autocratic', 'Bureaucratic'], correctAnswer: 1, explanation: 'Transformational leaders inspire and motivate teams towards a shared vision.' },
    { id: 'q2', question: 'What does the GROW model stand for in coaching?', options: ['Goal, Reality, Options, Will', 'Growth, Risk, Opportunity, Wealth', 'Group, Role, Objective, Way', 'Guidance, Respect, Outcome, Work'], correctAnswer: 0, explanation: 'GROW stands for Goal, Reality, Options and Will — a popular coaching framework.' },
    { id: 'q3', question: 'Which is a characteristic of effective change management?', options: ['Communicating the vision repeatedly', 'Keeping change secret until launch', 'Ignoring staff concerns', 'Rushing implementation'], correctAnswer: 0, explanation: 'Repeating a clear vision and rationale is central to successful change management.' },
  ],
  dse: [
    { id: 'q1', question: 'How often should you take a screen break when using DSE?', options: ['Every 15 minutes', 'Every 30 minutes', 'Every 55–60 minutes for 5–10 minutes', 'Once a day'], correctAnswer: 2, explanation: 'Short, frequent breaks of 5–10 minutes every hour reduce fatigue and strain.' },
    { id: 'q2', question: 'Where should the top of your screen be positioned?', options: ['Below desk level', 'At or just below eye level', 'Above eye level', 'Wherever is convenient'], correctAnswer: 1, explanation: 'The top of the screen should sit at or just below eye level to keep the neck neutral.' },
    { id: 'q3', question: 'What helps prevent eye strain when using DSE?', options: ['Working in the dark', 'Adequate lighting and regular eye tests', 'Sitting closer to the screen', 'Increasing screen brightness to maximum'], correctAnswer: 1, explanation: 'Adequate lighting, glare control and regular eye tests help prevent eye strain.' },
  ],
  asbestos: [
    { id: 'q1', question: 'When was asbestos finally banned in the UK?', options: ['1985', '1992', '1999', '2006'], correctAnswer: 2, explanation: 'All forms of asbestos were banned in the UK in 1999, though it remains in many older buildings.' },
    { id: 'q2', question: 'What should you do if you suspect asbestos has been disturbed?', options: ['Sweep it up', 'Stop work, evacuate and report', 'Cover it with water', 'Continue and report later'], correctAnswer: 1, explanation: 'Stop work immediately, evacuate the area and report to a competent person.' },
    { id: 'q3', question: 'Which disease is most strongly linked to asbestos exposure?', options: ['Asthma', 'Mesothelioma', 'Influenza', 'Diabetes'], correctAnswer: 1, explanation: 'Mesothelioma is a cancer of the lining of the lungs strongly associated with asbestos exposure.' },
  ],
  coshh: [
    { id: 'q1', question: 'What does COSHH stand for?', options: ['Control of Substances Hazardous to Health', 'Care of Substances Harmful to Humans', 'Control of Safety and Health Hazards', 'Care of Safety Hazards and Health'], correctAnswer: 0, explanation: 'COSHH is the Control of Substances Hazardous to Health Regulations.' },
    { id: 'q2', question: 'What is a safety data sheet used for?', options: ['Marketing a product', 'Recording staff holidays', 'Identifying hazards and safe handling of a chemical', 'Listing prices'], correctAnswer: 2, explanation: 'A safety data sheet provides hazard information and safe handling guidance for a substance.' },
    { id: 'q3', question: 'Which control measure should be considered first under COSHH?', options: ['Personal protective equipment', 'Elimination or substitution of the hazard', 'Ventilation', 'Training'], correctAnswer: 1, explanation: 'Elimination or substitution is the preferred control, followed by engineering controls and then PPE as a last resort.' },
  ],
  height: [
    { id: 'q1', question: 'At what height does work at height legally begin in the UK?', options: ['Above 1 metre', 'Above 2 metres', 'Any height where a person could be injured by falling', 'Above 3 metres'], correctAnswer: 2, explanation: 'Work at height applies to any place where a person could be injured by falling, regardless of height.' },
    { id: 'q2', question: 'What is the hierarchy of control for work at height?', options: ['Avoid, prevent, mitigate', 'Mitigate, prevent, avoid', 'Prevent, avoid, mitigate', 'Avoid, mitigate, prevent'], correctAnswer: 0, explanation: 'First avoid the work, then prevent falls, then mitigate the consequences of a fall.' },
    { id: 'q3', question: 'How often should harnesses be inspected?', options: ['Every five years', 'Before each use and at scheduled intervals by a competent person', 'Only after a fall', 'Once on purchase'], correctAnswer: 1, explanation: 'Harnesses should be checked before each use and formally inspected at scheduled intervals by a competent person.' },
  ],
  riskAssessment: [
    { id: 'q1', question: 'What is the first step of a risk assessment?', options: ['Record findings', 'Identify hazards', 'Evaluate risks', 'Review assessment'], correctAnswer: 1, explanation: 'The first step is to identify the hazards present in the workplace.' },
    { id: 'q2', question: 'How many steps are in the HSE’s standard risk assessment process?', options: ['3', '4', '5', '6'], correctAnswer: 2, explanation: 'The HSE outlines five steps: identify hazards, decide who might be harmed, evaluate risks, record findings and review.' },
    { id: 'q3', question: 'Who should carry out a risk assessment?', options: ['Anyone available', 'A competent person with suitable knowledge and training', 'The newest employee', 'An external contractor only'], correctAnswer: 1, explanation: 'A competent person with appropriate knowledge, training and understanding should carry out the assessment.' },
  ],
  slipsTrips: [
    { id: 'q1', question: 'What is the most common cause of slips in the workplace?', options: ['Wet or contaminated floors', 'Poor lighting only', 'Heavy lifting', 'Electrical faults'], correctAnswer: 0, explanation: 'Wet or contaminated floors are the most common cause of slip incidents.' },
    { id: 'q2', question: 'Which measure best prevents trip hazards?', options: ['Leaving cables loose', 'Good housekeeping and cable management', 'Wearing any footwear', 'Dim lighting'], correctAnswer: 1, explanation: 'Good housekeeping, including tidy cable management, is the most effective prevention.' },
    { id: 'q3', question: 'What should you do immediately after a spillage?', options: ['Ignore it if small', 'Cordon off and clean up or report it promptly', 'Wait for the end of the shift', 'Cover it with a mat'], correctAnswer: 1, explanation: 'Cordon off the area and clean up or report the spillage promptly to prevent a slip.' },
  ],
  firstAid: [
    { id: 'q1', question: 'What does DRABC stand for in first aid?', options: ['Danger, Response, Airway, Breathing, Circulation', 'Diagnosis, Recovery, Assessment, Bandage, Call', 'Direct, Rest, Assess, Bandage, Care', 'Danger, Report, Assess, Bandage, Compress'], correctAnswer: 0, explanation: 'DRABC stands for Danger, Response, Airway, Breathing and Circulation — the primary survey.' },
    { id: 'q2', question: 'How many chest compressions per minute should you aim for in CPR?', options: ['60–80', '100–120', '150–180', '200'], correctAnswer: 1, explanation: 'Aim for 100–120 compressions per minute at a depth of 5–6 cm.' },
    { id: 'q3', question: 'What is the recovery position used for?', options: ['Treating a fracture', 'Keeping an unconscious but breathing person’s airway open', 'Cooling a burn', 'Stopping bleeding'], correctAnswer: 1, explanation: 'The recovery position keeps an unconscious but breathing person’s airway clear and open.' },
  ],
  phishing: [
    { id: 'q1', question: 'Which URL is most likely to be a phishing site?', options: ['https://www.gov.uk/tax', 'http://hmrc-refund-secure.com', 'https://www.nhs.uk', 'https://www.barclays.co.uk'], correctAnswer: 1, explanation: 'A domain like hmrc-refund-secure.com is not an official domain and is a common phishing pattern.' },
    { id: 'q2', question: 'What is spear phishing?', options: ['A mass, untargeted email blast', 'A targeted phishing attack aimed at a specific individual or organisation', 'A type of computer virus', 'A firewall feature'], correctAnswer: 1, explanation: 'Spear phishing is a targeted attack tailored to a specific individual or organisation.' },
    { id: 'q3', question: 'What should you do with a suspected phishing email?', options: ['Reply to confirm', 'Click the link to check', 'Report it and delete without clicking', 'Forward it to colleagues'], correctAnswer: 2, explanation: 'Report it through your organisation’s channel and delete it without clicking any links.' },
  ],
  infoSec: [
    { id: 'q1', question: 'Which of the CIA triad ensures data is only seen by authorised people?', options: ['Confidentiality', 'Integrity', 'Availability', 'Authentication'], correctAnswer: 0, explanation: 'Confidentiality ensures data is disclosed only to authorised individuals.' },
    { id: 'q2', question: 'What is the principle of least privilege?', options: ['Giving everyone admin access', 'Granting only the access needed to do a job', 'Sharing all passwords', 'Removing all restrictions'], correctAnswer: 1, explanation: 'Least privilege means granting users only the minimum access required for their role.' },
    { id: 'q3', question: 'What is tailgating in information security?', options: ['Following someone through a secure door without authorisation', 'A type of malware', 'A phishing email', 'A network protocol'], correctAnswer: 0, explanation: 'Tailgating is when an unauthorised person follows someone through a secure door.' },
  ],
  harassment: [
    { id: 'q1', question: 'Which behaviour constitutes sexual harassment?', options: ['A professional handshake', 'Unwanted sexual comments or advances', 'Polite conversation', 'Constructive feedback'], correctAnswer: 1, explanation: 'Unwanted sexual comments or advances of any kind constitute sexual harassment.' },
    { id: 'q2', question: 'What is a bystander’s responsibility when witnessing harassment?', options: ['Ignore it', 'Intervene safely or report it', 'Join in', 'Record it for social media'], correctAnswer: 1, explanation: 'Bystanders should intervene safely or report the incident through proper channels.' },
    { id: 'q3', question: 'Can harassment occur outside the workplace?', options: ['No, never', 'Yes, at work events or online if work-related', 'Only during working hours on site', 'Only between managers and staff'], correctAnswer: 1, explanation: 'Harassment can occur at work events, online or off-site if it is connected to work.' },
  ],
  environmental: [
    { id: 'q1', question: 'What does the waste hierarchy prioritise first?', options: ['Disposal', 'Recycling', 'Prevention', 'Energy recovery'], correctAnswer: 2, explanation: 'The waste hierarchy prioritises prevention first, then reuse, recycling, recovery and finally disposal.' },
    { id: 'q2', question: 'What is a carbon footprint?', options: ['The size of a factory', 'The total greenhouse gas emissions caused by an activity', 'A type of waste bin', 'A recycling symbol'], correctAnswer: 1, explanation: 'A carbon footprint is the total greenhouse gas emissions caused directly and indirectly by an activity.' },
    { id: 'q3', question: 'Which of these reduces environmental impact at work?', options: ['Leaving equipment on overnight', 'Printing every email', 'Switching off lights and equipment when not in use', 'Using single-use plastics'], correctAnswer: 2, explanation: 'Switching off lights and equipment reduces energy use and environmental impact.' },
  ],
  waste: [
    { id: 'q1', question: 'What is the duty of care for waste?', options: ['A moral duty only', 'A legal requirement to manage waste safely from creation to disposal', 'Optional for small businesses', 'Only for hazardous waste'], correctAnswer: 1, explanation: 'The duty of care is a legal requirement under the Environmental Protection Act 1990 to manage waste safely.' },
    { id: 'q2', question: 'What is hazardous waste?', options: ['Paper and cardboard', 'Waste that could harm human health or the environment', 'Food waste', 'Glass bottles'], correctAnswer: 1, explanation: 'Hazardous waste is waste with properties that could harm human health or the environment.' },
    { id: 'q3', question: 'What is a waste transfer note?', options: ['A receipt for buying waste bins', 'A document recording the transfer of waste between holders', 'A training certificate', 'A recycling label'], correctAnswer: 1, explanation: 'A waste transfer note records the transfer of waste between parties and must be kept for two years.' },
  ],
  stress: [
    { id: 'q1', question: 'What is the HSE’s management standard approach based on?', options: ['Six areas of work design', 'A single risk factor', 'Personal fitness', 'Financial rewards'], correctAnswer: 0, explanation: 'The HSE Management Standards cover six areas of work design that can cause stress if poorly managed.' },
    { id: 'q2', question: 'Which of these is a healthy coping strategy for stress?', options: ['Increased caffeine', 'Regular exercise and good sleep', 'Skipping meals', 'Working longer hours'], correctAnswer: 1, explanation: 'Regular exercise, good sleep and social support are healthy coping strategies.' },
    { id: 'q3', question: 'Who has primary responsibility for managing work-related stress?', options: ['The employee only', 'The employer, with employee support', 'The GP only', 'The health and safety executive directly'], correctAnswer: 1, explanation: 'Employers have a legal duty to assess and manage work-related stress, supported by employees.' },
  ],
  mhfa: [
    { id: 'q1', question: 'What is the role of a mental health first aider?', options: ['To diagnose mental illness', 'To provide initial support and signpost to professional help', 'To prescribe medication', 'To replace a therapist'], correctAnswer: 1, explanation: 'A mental health first aider offers initial support and guides a person towards appropriate professional help.' },
    { id: 'q2', question: 'Which condition is characterised by persistent low mood and loss of interest?', options: ['Anxiety', 'Depression', 'Phobia', 'Insomnia'], correctAnswer: 1, explanation: 'Depression is characterised by persistent low mood and loss of interest in usual activities.' },
    { id: 'q3', question: 'What is a panic attack?', options: ['A heart attack', 'A sudden surge of intense fear with physical symptoms', 'A type of seizure', 'A fainting episode'], correctAnswer: 1, explanation: 'A panic attack is a sudden surge of intense fear accompanied by physical symptoms such as racing heart and shortness of breath.' },
  ],
  lone: [
    { id: 'q1', question: 'What is a key control for lone workers?', options: ['A regular check-in system', 'Working without any equipment', 'No communication device', 'Avoiding risk assessment'], correctAnswer: 0, explanation: 'A regular check-in or monitoring system is essential to ensure lone worker safety.' },
    { id: 'q2', question: 'Who is responsible for lone worker safety?', options: ['The lone worker only', 'The employer and the lone worker', 'The police', 'The public'], correctAnswer: 1, explanation: 'Employers must assess risks and provide controls, while lone workers must follow procedures.' },
    { id: 'q3', question: 'Which device helps protect lone workers?', options: ['A personal alarm or lone worker app', 'A standard kettle', 'A wall calendar', 'A paper notebook'], correctAnswer: 0, explanation: 'Personal alarms and lone worker apps enable SOS alerts and location tracking in an emergency.' },
  ],
  bribery: [
    { id: 'q1', question: 'What does the UK Bribery Act 2010 cover?', options: ['Only bribery of UK officials', 'Bribing and being bribed, including foreign officials and commercial bribery', 'Only political donations', 'Only gifts under £50'], correctAnswer: 1, explanation: 'The Act covers offering and receiving bribes, including foreign officials and commercial organisations.' },
    { id: 'q2', question: 'What is “adequate procedures” under the Act?', options: ['A legal defence for organisations that have proper anti-bribery controls', 'A type of bribe', 'A court order', 'An optional policy'], correctAnswer: 0, explanation: 'Adequate procedures are the anti-bribery controls an organisation can show as a defence against failure-to-prevent bribery.' },
    { id: 'q3', question: 'Which of these could be considered a bribe?', options: ['A small, transparent festive gift within company policy', 'A secret cash payment to win a contract', 'A salary bonus tied to performance', 'A published discount'], correctAnswer: 1, explanation: 'A secret cash payment intended to influence a decision is a clear example of a bribe.' },
  ],
  infection: [
    { id: 'q1', question: 'What is the most effective way to prevent the spread of infection?', options: ['Wearing a mask at all times', 'Proper hand hygiene', 'Avoiding all contact', 'Taking antibiotics'], correctAnswer: 1, explanation: 'Proper hand hygiene is the single most effective measure to prevent the spread of infection.' },
    { id: 'q2', question: 'What does PPE stand for?', options: ['Personal Protection Equipment', 'Personal Protective Equipment', 'Public Protection Equipment', 'Private Protective Equipment'], correctAnswer: 1, explanation: 'PPE stands for Personal Protective Equipment.' },
    { id: 'q3', question: 'What is the chain of infection?', options: ['Infectious agent, reservoir, portal of exit, mode of transmission, portal of entry, susceptible host', 'A single step', 'Only hand washing', 'Only vaccination'], correctAnswer: 0, explanation: 'The chain of infection has six links; breaking any link stops transmission.' },
  ],
  conflict: [
    { id: 'q1', question: 'What is the first step in de-escalating conflict?', options: ['Raise your voice', 'Stay calm and listen actively', 'Walk away immediately', 'Argue back'], correctAnswer: 1, explanation: 'Staying calm and listening actively helps de-escalate and shows respect.' },
    { id: 'q2', question: 'What is a useful technique when someone is aggressive?', options: ['Matching their aggression', 'Using a calm tone and open body language', 'Turning your back', 'Ignoring them entirely'], correctAnswer: 1, explanation: 'A calm tone and open, non-threatening body language can reduce tension.' },
    { id: 'q3', question: 'When should you disengage from a conflict situation?', options: ['Never', 'When there is a risk of violence or you cannot de-escalate', 'Only when asked by a manager', 'After winning the argument'], correctAnswer: 1, explanation: 'Disengage when there is a risk of violence or de-escalation is not working, and seek support.' },
  ],
  time: [
    { id: 'q1', question: 'Which matrix helps prioritise tasks by urgency and importance?', options: ['SWOT', 'Eisenhower', 'PESTLE', 'SMART'], correctAnswer: 1, explanation: 'The Eisenhower Matrix sorts tasks by urgency and importance into four quadrants.' },
    { id: 'q2', question: 'What does the Pomodoro Technique involve?', options: ['Working in 25-minute focused intervals with short breaks', 'Working for 8 hours straight', 'Multitasking all day', 'Delegating everything'], correctAnswer: 0, explanation: 'The Pomodoro Technique uses 25-minute focused work intervals separated by short breaks.' },
    { id: 'q3', question: 'What is a common time-waster in the workplace?', options: ['Clear goals', 'Unstructured meetings and constant email checks', 'A prioritised to-do list', 'A tidy workspace'], correctAnswer: 1, explanation: 'Unstructured meetings and constant email checking are common workplace time-wasters.' },
  ],
  change: [
    { id: 'q1', question: 'Which model describes the emotional journey of change?', options: ['Kotter’s 8 steps', 'Kübler-Ross change curve', 'Porter’s five forces', 'Maslow’s hierarchy'], correctAnswer: 1, explanation: 'The Kübler-Ross change curve describes the emotional stages people experience during change.' },
    { id: 'q2', question: 'What is a common reason change initiatives fail?', options: ['Clear communication', 'Lack of leadership support and poor communication', 'Too much training', 'Excessive budget'], correctAnswer: 1, explanation: 'Lack of visible leadership support and poor communication are leading causes of change failure.' },
    { id: 'q3', question: 'In Kotter’s model, what is the first step?', options: ['Create a guiding coalition', 'Establish a sense of urgency', 'Develop a vision', 'Communicate the vision'], correctAnswer: 1, explanation: 'Kotter’s first step is to establish a sense of urgency to motivate change.' },
  ],
  abrasive: [
    { id: 'q1', question: 'What is the maximum daily exposure limit for hand-arm vibration?', options: ['2.5 m/s² A(8)', '5 m/s² A(8)', '10 m/s² A(8)', '25 m/s² A(8)'], correctAnswer: 1, explanation: 'The exposure action value is 2.5 m/s² A(8) and the exposure limit value is 5 m/s² A(8).' },
    { id: 'q2', question: 'Which condition is caused by prolonged hand-arm vibration?', options: ['Asthma', 'Hand-arm vibration syndrome (HAVS)', 'Mesothelioma', 'Dermatitis'], correctAnswer: 1, explanation: 'Prolonged exposure to hand-arm vibration causes hand-arm vibration syndrome (HAVS).' },
    { id: 'q3', question: 'How can the risk from abrasive wheels be reduced?', options: ['Using damaged wheels', 'Correct mounting, training and using the right wheel for the job', 'Removing guards', 'Working faster'], correctAnswer: 1, explanation: 'Correct mounting, training, guarding and selecting the right wheel reduce the risk.' },
  ],
  noise: [
    { id: 'q1', question: 'At what daily noise exposure level must employers take action?', options: ['75 dB', '80 dB', '90 dB', '100 dB'], correctAnswer: 1, explanation: 'The lower exposure action value is a daily or weekly personal noise exposure of 80 dB.' },
    { id: 'q2', question: 'What is the upper exposure action value for daily noise?', options: ['80 dB', '85 dB', '90 dB', '120 dB'], correctAnswer: 1, explanation: 'The upper exposure action value is 85 dB, at which hearing protection is mandatory.' },
    { id: 'q3', question: 'Which control is most effective for noise risk?', options: ['Ear plugs only', 'Eliminating or engineering out the noise at source', 'Ignoring it', 'Playing music louder'], correctAnswer: 1, explanation: 'Eliminating or engineering out noise at source is the most effective control.' },
  ],
  havs: [
    { id: 'q1', question: 'What does HAVS stand for?', options: ['Hand-Arm Vibration Syndrome', 'Health and Value Standard', 'Hazardous Area Ventilation System', 'Hearing and Vision Standard'], correctAnswer: 0, explanation: 'HAVS stands for Hand-Arm Vibration Syndrome, caused by regular exposure to hand-held vibrating tools.' },
    { id: 'q2', question: 'Which early symptom is typical of HAVS?', options: ['Improved grip', 'Tingling, numbness and whitening of fingers in the cold', 'Better hearing', 'Increased strength'], correctAnswer: 1, explanation: 'Tingling, numbness and finger whitening (blanching) in cold conditions are early signs of HAVS.' },
    { id: 'q3', question: 'How is HAVS best prevented?', options: ['Working longer hours', 'Reducing exposure time and using low-vibration tools', 'Using more powerful tools', 'Ignoring symptoms'], correctAnswer: 1, explanation: 'Reducing exposure time, using low-vibration tools and maintaining equipment are key prevention measures.' },
  ],
};

type QuizKey = keyof typeof quizQuestions;

const buildModules = (
  courseId: string,
  moduleTitles: string[],
  lessonDefs: { title: string; type: 'video' | 'reading' | 'quiz'; duration: string }[][],
  quizKey?: QuizKey,
): { id: string; title: string; lessons: { id: string; title: string; type: 'video' | 'reading' | 'quiz'; duration: string; content?: string; questions?: typeof quizQuestions[QuizKey]; preview?: boolean }[] }[] =>
  moduleTitles.map((title, mi) => ({
    id: `${courseId}-m${mi + 1}`,
    title,
    lessons: lessonDefs[mi].map((l, li) => {
      const isFirst = mi === 0 && li === 0;
      const base = {
        id: `${courseId}-m${mi + 1}-l${li + 1}`,
        title: l.title,
        type: l.type,
        duration: l.duration,
      };
      if (l.type === 'quiz' && quizKey) {
        return { ...base, content: 'Complete the quiz below to test your understanding.', questions: quizQuestions[quizKey], preview: isFirst ? true : undefined };
      }
      if (l.type === 'video') {
        return { ...base, content: 'In this video lesson, your instructor walks through the key concepts with practical demonstrations and real-world examples.', preview: isFirst ? true : undefined };
      }
      return { ...base, content: 'This reading covers the essential theory, legislation and best-practice guidance for this topic, with clear summaries and practical checklists.', preview: isFirst ? true : undefined };
    }),
  }));

export const COURSES: Course[] = [
  {
    id: 'crs-1', title: 'Fire Safety Awareness', slug: 'fire-safety-awareness', category: 'Fire Safety',
    shortDescription: 'Essential fire safety awareness training for all employees to meet legal duties under the Fire Safety Order 2005.',
    fullDescription: 'This Fire Safety Awareness course equips every employee with the knowledge to prevent fires and respond correctly in an emergency. It covers fire chemistry, common causes, extinguisher use and evacuation procedures. The course satisfies the fire safety training requirements of the Regulatory Reform (Fire Safety) Order 2005.',
    thumbnail: THUMBS[0], price: 25, salePrice: 19, duration: '2 hours', level: 'Beginner',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.8, reviewCount: 142,
    learningOutcomes: ['Understand the principles of fire and combustion', 'Identify common fire hazards in the workplace', 'Select and use the correct fire extinguisher', 'Follow evacuation procedures and assembly point protocols', 'Explain your legal duties under fire safety legislation'],
    whoFor: ['All employees', 'New starters during induction', 'Fire marshals needing a refresher', 'Facilities and premises staff'],
    modules: buildModules('crs-1', ['Introduction to Fire Safety', 'Fire Prevention and Hazards', 'Using Extinguishers and Evacuation', 'Final Assessment'],
      [
        [{ title: 'Welcome and Course Overview', type: 'video', duration: '8 min' }, { title: 'The Fire Triangle', type: 'reading', duration: '10 min' }, { title: 'Classes of Fire', type: 'video', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Common Workplace Hazards', type: 'video', duration: '14 min' }, { title: 'Arson Prevention', type: 'reading', duration: '8 min' }, { title: 'Housekeeping and Storage', type: 'reading', duration: '10 min' }, { title: 'Hazard Spotting Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Types of Extinguisher', type: 'video', duration: '15 min' }, { title: 'Using the PASS Technique', type: 'video', duration: '10 min' }, { title: 'Evacuation Procedures', type: 'reading', duration: '12 min' }, { title: 'Extinguisher Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Course Summary', type: 'reading', duration: '5 min' }],
      ], 'fire'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-08-14', instructorId: 'ins-1', enrolledCount: 1850, published: true,
  },
  {
    id: 'crs-2', title: 'Fire Warden Training', slug: 'fire-warden-training', category: 'Fire Safety',
    shortDescription: 'Comprehensive fire warden training covering evacuation, drills and your responsibilities as a fire marshal.',
    fullDescription: 'This Fire Warden Training course provides designated fire marshals with the skills to manage evacuations, conduct drills and support fire safety management. It builds on awareness principles and covers warden-specific duties in detail. On completion you will be able to fulfil the fire warden role confidently and in line with legislation.',
    thumbnail: THUMBS[1], price: 45, duration: '3 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.9, reviewCount: 96,
    learningOutcomes: ['Describe the role and responsibilities of a fire warden', 'Plan and carry out fire drills', 'Coordinate safe evacuation of all occupants', 'Maintain fire safety records and inspections', 'Liaise with the emergency services'],
    whoFor: ['Designated fire wardens and marshals', 'Health and safety officers', 'Facilities managers', 'Team leaders responsible for evacuation'],
    modules: buildModules('crs-2', ['The Fire Warden Role', 'Fire Risk Assessment Basics', 'Managing Evacuation and Drills', 'Records, Inspections and Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '10 min' }, { title: 'Legal Responsibilities', type: 'reading', duration: '15 min' }, { title: 'The Warden in an Emergency', type: 'video', duration: '18 min' }, { title: 'Role Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Understanding Fire Risk Assessment', type: 'video', duration: '20 min' }, { title: 'Identifying Hazards and People at Risk', type: 'reading', duration: '15 min' }, { title: 'Recording and Reviewing', type: 'reading', duration: '10 min' }, { title: 'Risk Assessment Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Evacuation Plans', type: 'video', duration: '22 min' }, { title: 'Personal Emergency Evacuation Plans (PEEPs)', type: 'reading', duration: '12 min' }, { title: 'Running Effective Drills', type: 'video', duration: '15 min' }, { title: 'Evacuation Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Keeping Fire Safety Records', type: 'reading', duration: '12 min' }, { title: 'Routine Inspections', type: 'video', duration: '10 min' }, { title: 'Final Assessment', type: 'quiz', duration: '15 min' }],
      ], 'fire'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-06-30', instructorId: 'ins-1', enrolledCount: 740, published: true,
  },
  {
    id: 'crs-3', title: 'Manual Handling Level 2', slug: 'manual-handling-level-2', category: 'Manual Handling',
    shortDescription: 'Level 2 manual handling training covering risk assessment and safe handling techniques for higher-risk roles.',
    fullDescription: 'This Level 2 Manual Handling course goes beyond the basics to cover biomechanics, risk assessment using the TILE method and practical handling techniques. It is designed for staff whose roles involve frequent or complex handling tasks. The course meets employer duties under the Manual Handling Operations Regulations 1992.',
    thumbnail: THUMBS[2], price: 35, salePrice: 29, duration: '2.5 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 118,
    learningOutcomes: ['Explain the anatomy of the spine and injury mechanisms', 'Apply the TILE risk assessment method', 'Demonstrate safe lifting, carrying and pushing techniques', 'Assess loads and plan handling tasks', 'Use mechanical aids appropriately'],
    whoFor: ['Warehouse and logistics staff', 'Care and healthcare workers', 'Construction site workers', 'Anyone handling loads regularly'],
    modules: buildModules('crs-3', ['Understanding Manual Handling', 'Risk Assessment with TILE', 'Safe Handling Techniques', 'Assessment and Review'],
      [
        [{ title: 'Welcome and Objectives', type: 'video', duration: '8 min' }, { title: 'Anatomy and Injury', type: 'reading', duration: '15 min' }, { title: 'The Cost of Poor Handling', type: 'video', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'The TILE Framework', type: 'video', duration: '18 min' }, { title: 'Assessing the Load', type: 'reading', duration: '12 min' }, { title: 'Environmental Factors', type: 'reading', duration: '10 min' }, { title: 'TILE Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Lifting Techniques', type: 'video', duration: '20 min' }, { title: 'Carrying and Team Handling', type: 'video', duration: '15 min' }, { title: 'Using Mechanical Aids', type: 'reading', duration: '10 min' }, { title: 'Technique Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Course Summary', type: 'reading', duration: '5 min' }],
      ], 'manualHandling'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-07-22', instructorId: 'ins-1', enrolledCount: 980, published: true,
  },
  {
    id: 'crs-4', title: 'Display Screen Equipment', slug: 'display-screen-equipment', category: 'Health & Safety',
    shortDescription: 'DSE training to help workstation users set up safely, reduce strain and meet the DSE Regulations 1992.',
    fullDescription: 'This Display Screen Equipment course guides employees through correct workstation setup, posture and breaks to prevent musculoskeletal and visual problems. It supports employer duties under the Health and Safety (Display Screen Equipment) Regulations 1992. The course includes a practical self-assessment checklist.',
    thumbnail: THUMBS[3], price: 20, duration: '1.5 hours', level: 'Beginner',
    cpdPoints: 1, cpdApproved: true, rospaAssured: true, rating: 4.6, reviewCount: 203,
    learningOutcomes: ['Set up a workstation to minimise strain', 'Identify the health risks of poor DSE use', 'Apply posture and break routines', 'Complete a DSE self-assessment', 'Understand employer duties under the DSE Regulations'],
    whoFor: ['Office-based employees', 'Home and hybrid workers', 'Health and safety coordinators', 'New starters during induction'],
    modules: buildModules('crs-4', ['DSE Health Risks', 'Workstation Setup', 'Breaks, Posture and Assessment', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '6 min' }, { title: 'Health Risks of DSE', type: 'reading', duration: '12 min' }, { title: 'Legal Duties', type: 'reading', duration: '8 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Chair and Desk Setup', type: 'video', duration: '15 min' }, { title: 'Screen and Input Devices', type: 'video', duration: '12 min' }, { title: 'Lighting and Environment', type: 'reading', duration: '10 min' }, { title: 'Setup Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Breaks and Posture', type: 'video', duration: '12 min' }, { title: 'Eye Care', type: 'reading', duration: '8 min' }, { title: 'DSE Self-Assessment', type: 'reading', duration: '15 min' }, { title: 'Final Assessment', type: 'quiz', duration: '10 min' }],
        [{ title: 'Course Summary', type: 'reading', duration: '5 min' }],
      ], 'dse'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-09-01', instructorId: 'ins-1', enrolledCount: 1640, published: true,
  },
  {
    id: 'crs-5', title: 'Asbestos Awareness', slug: 'asbestos-awareness', category: 'Health & Safety',
    shortDescription: 'Asbestos awareness training to help workers identify, avoid and report asbestos-containing materials.',
    fullDescription: 'This Asbestos Awareness course provides the essential knowledge required by Regulation 10 of the Control of Asbestos Regulations 2012. It explains where asbestos is found, its health effects and the actions to take if it is disturbed. The course is suitable for anyone who may encounter asbestos during their work.',
    thumbnail: THUMBS[4], price: 30, duration: '2 hours', level: 'Beginner',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.8, reviewCount: 167,
    learningOutcomes: ['Describe what asbestos is and where it is found', 'Identify common asbestos-containing materials', 'Explain the health risks of exposure', 'Follow correct procedures if asbestos is suspected', 'Understand the legal framework governing asbestos'],
    whoFor: ['Construction and maintenance workers', 'Plumbers, electricians and joiners', 'Facilities and building managers', 'Health and safety representatives'],
    modules: buildModules('crs-5', ['What is Asbestos?', 'Health Risks and Exposure', 'Managing Asbestos', 'Final Assessment'],
      [
        [{ title: 'Welcome and Aims', type: 'video', duration: '8 min' }, { title: 'Types of Asbestos', type: 'reading', duration: '12 min' }, { title: 'Where Asbestos is Found', type: 'video', duration: '15 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Health Effects', type: 'reading', duration: '12 min' }, { title: 'Exposure Routes', type: 'video', duration: '10 min' }, { title: 'At-Risk Groups', type: 'reading', duration: '8 min' }, { title: 'Health Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'The Duty to Manage', type: 'video', duration: '15 min' }, { title: 'Surveys and Registers', type: 'reading', duration: '10 min' }, { title: 'What to Do if Disturbed', type: 'video', duration: '12 min' }, { title: 'Management Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'asbestos'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-05-18', instructorId: 'ins-1', enrolledCount: 1320, published: true,
  },
  {
    id: 'crs-6', title: 'COSHH Awareness', slug: 'coshh-awareness', category: 'Health & Safety',
    shortDescription: 'COSHH training covering hazardous substances, risk assessment and control measures for all workplaces.',
    fullDescription: 'This COSHH Awareness course explains the Control of Substances Hazardous to Health Regulations and how to apply them practically. It covers hazard identification, safety data sheets and the hierarchy of control. The course is suitable for anyone working with or near hazardous substances.',
    thumbnail: THUMBS[5], price: 30, duration: '2 hours', level: 'Beginner',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 89,
    learningOutcomes: ['Explain the COSHH regulations and employer duties', 'Identify hazardous substances in the workplace', 'Interpret safety data sheets', 'Apply the hierarchy of control', 'Carry out a basic COSHH risk assessment'],
    whoFor: ['Cleaning and maintenance staff', 'Manufacturing and lab workers', 'Hair and beauty professionals', 'Managers responsible for COSHH'],
    modules: buildModules('crs-6', ['Introduction to COSHH', 'Hazardous Substances and Data Sheets', 'Control Measures', 'Final Assessment'],
      [
        [{ title: 'Course Overview', type: 'video', duration: '8 min' }, { title: 'What is COSHH?', type: 'reading', duration: '12 min' }, { title: 'Legal Duties', type: 'reading', duration: '10 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Types of Hazardous Substances', type: 'video', duration: '15 min' }, { title: 'Reading Safety Data Sheets', type: 'video', duration: '12 min' }, { title: 'Hazard Symbols', type: 'reading', duration: '8 min' }, { title: 'Hazard Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'The Hierarchy of Control', type: 'video', duration: '18 min' }, { title: 'PPE as a Last Resort', type: 'reading', duration: '10 min' }, { title: 'Health Surveillance', type: 'reading', duration: '8 min' }, { title: 'Control Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'coshh'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-07-05', instructorId: 'ins-1', enrolledCount: 860, published: true,
  },
  {
    id: 'crs-7', title: 'Working at Height', slug: 'working-at-height', category: 'Health & Safety',
    shortDescription: 'Working at height training covering the hierarchy of control, equipment and rescue planning.',
    fullDescription: 'This Working at Height course explains the Work at Height Regulations 2005 and how to plan and carry out work safely. It covers the hierarchy of control, equipment selection and inspection. The course is suitable for anyone who works at height or supervises those who do.',
    thumbnail: THUMBS[6], price: 40, duration: '2.5 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.8, reviewCount: 74,
    learningOutcomes: ['Explain the legal definition of work at height', 'Apply the hierarchy of control', 'Select and inspect suitable equipment', 'Plan for emergencies and rescue', 'Identify common hazards and risks'],
    whoFor: ['Construction and maintenance workers', 'Roofers and scaffolders', 'Facilities managers', 'Supervisors of height work'],
    modules: buildModules('crs-7', ['Working at Height Law', 'The Hierarchy of Control', 'Equipment and Inspection', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'The Regulations', type: 'reading', duration: '15 min' }, { title: 'Duties and Responsibilities', type: 'reading', duration: '10 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Avoid, Prevent, Mitigate', type: 'video', duration: '18 min' }, { title: 'Risk Assessment', type: 'reading', duration: '12 min' }, { title: 'Planning the Work', type: 'video', duration: '15 min' }, { title: 'Hierarchy Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Ladders and Stepladders', type: 'video', duration: '15 min' }, { title: 'MEWPs and Towers', type: 'reading', duration: '12 min' }, { title: 'Harnesses and Inspection', type: 'video', duration: '18 min' }, { title: 'Equipment Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Rescue Planning', type: 'reading', duration: '10 min' }, { title: 'Final Assessment', type: 'quiz', duration: '15 min' }],
      ], 'height'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-04-29', instructorId: 'ins-1', enrolledCount: 540, published: true,
  },
  {
    id: 'crs-8', title: 'Risk Assessment', slug: 'risk-assessment', category: 'Health & Safety',
    shortDescription: 'Practical risk assessment training using the HSE’s five-step method for competent assessors.',
    fullDescription: 'This Risk Assessment course teaches the HSE’s five-step approach to identifying hazards and evaluating risks in the workplace. It includes practical examples and templates you can apply immediately. The course is suitable for anyone asked to contribute to or carry out risk assessments.',
    thumbnail: THUMBS[7], price: 50, duration: '3 hours', level: 'Intermediate',
    cpdPoints: 4, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 62,
    learningOutcomes: ['Describe the HSE five-step risk assessment process', 'Identify hazards and who might be harmed', 'Evaluate and prioritise risks', 'Record findings and apply controls', 'Review and update assessments'],
    whoFor: ['Managers and supervisors', 'Health and safety coordinators', 'Business owners', 'Team leaders'],
    modules: buildModules('crs-8', ['Principles of Risk Assessment', 'The Five Steps', 'Evaluating and Controlling Risk', 'Recording and Reviewing'],
      [
        [{ title: 'Welcome and Aims', type: 'video', duration: '10 min' }, { title: 'Why Assess Risk?', type: 'reading', duration: '12 min' }, { title: 'Legal Requirements', type: 'reading', duration: '10 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Step 1: Identify Hazards', type: 'video', duration: '18 min' }, { title: 'Step 2: Who Might Be Harmed', type: 'reading', duration: '10 min' }, { title: 'Step 3: Evaluate Risks', type: 'video', duration: '20 min' }, { title: 'Five Steps Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Step 4: Record Findings', type: 'reading', duration: '12 min' }, { title: 'Hierarchy of Control', type: 'video', duration: '15 min' }, { title: 'Step 5: Review and Update', type: 'reading', duration: '10 min' }, { title: 'Control Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Practical Exercise', type: 'reading', duration: '15 min' }, { title: 'Final Assessment', type: 'quiz', duration: '15 min' }],
      ], 'riskAssessment'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-08-02', instructorId: 'ins-1', enrolledCount: 420, published: true,
  },
  {
    id: 'crs-9', title: 'Slips Trips and Falls', slug: 'slips-trips-and-falls', category: 'Health & Safety',
    shortDescription: 'Slips, trips and falls prevention training to reduce the most common workplace accidents.',
    fullDescription: 'This Slips, Trips and Falls course explains the causes of the most common workplace accidents and how to prevent them. It covers contamination, obstructions, footwear and housekeeping. The course is suitable for all employees and supports employer duties under the Workplace Regulations 1992.',
    thumbnail: THUMBS[8], price: 20, duration: '1.5 hours', level: 'Beginner',
    cpdPoints: 1, cpdApproved: true, rospaAssured: true, rating: 4.5, reviewCount: 156,
    learningOutcomes: ['Identify the main causes of slips, trips and falls', 'Apply good housekeeping practices', 'Select suitable footwear', 'Manage spillages and contamination', 'Carry out basic risk checks'],
    whoFor: ['All employees', 'Facilities and cleaning staff', 'Retail and hospitality workers', 'Health and safety coordinators'],
    modules: buildModules('crs-9', ['Understanding the Risks', 'Prevention Strategies', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '6 min' }, { title: 'The Scale of the Problem', type: 'reading', duration: '10 min' }, { title: 'Causes of Slips', type: 'video', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Housekeeping and Cables', type: 'video', duration: '12 min' }, { title: 'Managing Spillages', type: 'reading', duration: '10 min' }, { title: 'Footwear and Flooring', type: 'video', duration: '10 min' }, { title: 'Prevention Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '10 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'slipsTrips'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-06-12', instructorId: 'ins-1', enrolledCount: 1120, published: true,
  },
  {
    id: 'crs-10', title: 'First Aid Awareness', slug: 'first-aid-awareness', category: 'Health & Safety',
    shortDescription: 'First aid awareness training covering the primary survey, CPR basics and common workplace incidents.',
    fullDescription: 'This First Aid Awareness course introduces the principles of first aid, including the primary survey, CPR and dealing with common incidents. It is an awareness course and does not replace a full first aid qualification. It is ideal for appointed persons and all staff who want to build confidence.',
    thumbnail: THUMBS[9], price: 25, duration: '2 hours', level: 'Beginner',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 188,
    learningOutcomes: ['Carry out a primary survey using DRABC', 'Perform basic CPR and use an AED', 'Manage bleeding, burns and minor injuries', 'Recognise when to call the emergency services', 'Understand the role of an appointed person'],
    whoFor: ['Appointed persons', 'All employees', 'Office managers', 'New starters during induction'],
    modules: buildModules('crs-10', ['Principles of First Aid', 'The Primary Survey', 'Common Incidents', 'Final Assessment'],
      [
        [{ title: 'Welcome and Scope', type: 'video', duration: '8 min' }, { title: 'The Role of a First Aider', type: 'reading', duration: '10 min' }, { title: 'Legal Requirements', type: 'reading', duration: '8 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'DRABC', type: 'video', duration: '15 min' }, { title: 'CPR and AEDs', type: 'video', duration: '18 min' }, { title: 'The Recovery Position', type: 'video', duration: '12 min' }, { title: 'Primary Survey Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Bleeding and Shock', type: 'video', duration: '15 min' }, { title: 'Burns and Scalds', type: 'reading', duration: '10 min' }, { title: 'Choking', type: 'video', duration: '8 min' }, { title: 'Incidents Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'firstAid'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-09-10', instructorId: 'ins-1', enrolledCount: 1980, published: true,
  },
  {
    id: 'crs-11', title: 'GDPR for Employees', slug: 'gdpr-for-employees', category: 'Data Protection & GDPR',
    shortDescription: 'Practical GDPR training for all employees who handle personal data in their day-to-day role.',
    fullDescription: 'This GDPR for Employees course explains the UK GDPR and Data Protection Act 2018 in plain language for everyday work. It covers the six principles, individual rights and how to recognise and report a data breach. The course is suitable for any employee who handles personal data.',
    thumbnail: THUMBS[10], price: 30, duration: '2 hours', level: 'Beginner',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.8, reviewCount: 174,
    learningOutcomes: ['Explain the key principles of UK GDPR', 'Identify personal and special category data', 'Respect individual rights in daily tasks', 'Recognise and report a personal data breach', 'Apply data minimisation and security practices'],
    whoFor: ['All employees who handle personal data', 'Marketing and sales teams', 'HR and recruitment staff', 'Customer service teams'],
    modules: buildModules('crs-11', ['GDPR Fundamentals', 'Rights and Breaches', 'Practical Data Protection', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'What is Personal Data?', type: 'reading', duration: '12 min' }, { title: 'The Six Principles', type: 'video', duration: '15 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Individual Rights', type: 'video', duration: '18 min' }, { title: 'Lawful Bases', type: 'reading', duration: '12 min' }, { title: 'Recognising a Breach', type: 'video', duration: '15 min' }, { title: 'Rights and Breaches Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Data Minimisation', type: 'reading', duration: '10 min' }, { title: 'Secure Handling', type: 'video', duration: '12 min' }, { title: 'Subject Access Requests', type: 'reading', duration: '10 min' }, { title: 'Practical Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'gdpr'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-08-20', instructorId: 'ins-2', enrolledCount: 1450, published: true,
  },
  {
    id: 'crs-12', title: 'Data Protection Officer Training', slug: 'data-protection-officer-training', category: 'Data Protection & GDPR',
    shortDescription: 'In-depth DPO training covering accountability, DPIAs, breach response and ICO liaison.',
    fullDescription: 'This Data Protection Officer Training course provides the detailed knowledge required by those acting as a DPO or leading data protection. It covers accountability, data protection impact assessments, breach management and ICO liaison. The course is designed for those with existing data protection responsibilities.',
    thumbnail: THUMBS[11], price: 150, duration: '6 hours', level: 'Advanced',
    cpdPoints: 6, cpdApproved: true, rospaAssured: true, rating: 4.9, reviewCount: 38,
    learningOutcomes: ['Explain the role and tasks of a Data Protection Officer', 'Conduct a data protection impact assessment (DPIA)', 'Manage a personal data breach end to end', 'Maintain records of processing activities', 'Liaise effectively with the ICO'],
    whoFor: ['Current and aspiring Data Protection Officers', 'Data protection leads', 'Compliance managers', 'Legal and governance professionals'],
    modules: buildModules('crs-12', ['The DPO Role', 'Accountability and ROPAs', 'DPIAs and Breach Management', 'ICO Liaison and Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '12 min' }, { title: 'The DPO Under UK GDPR', type: 'reading', duration: '20 min' }, { title: 'Independence and Reporting', type: 'video', duration: '18 min' }, { title: 'Role Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'The Accountability Principle', type: 'video', duration: '20 min' }, { title: 'Records of Processing Activities', type: 'reading', duration: '15 min' }, { title: 'International Transfers', type: 'video', duration: '18 min' }, { title: 'Accountability Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'When a DPIA is Required', type: 'video', duration: '15 min' }, { title: 'Conducting a DPIA', type: 'reading', duration: '20 min' }, { title: 'Breach Detection and Reporting', type: 'video', duration: '20 min' }, { title: 'DPIA and Breach Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Working with the ICO', type: 'reading', duration: '15 min' }, { title: 'Audits and Investigations', type: 'video', duration: '18 min' }, { title: 'Final Assessment', type: 'quiz', duration: '20 min' }],
      ], 'gdpr'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-07-15', instructorId: 'ins-2', enrolledCount: 180, published: true,
  },
  {
    id: 'crs-13', title: 'Cyber Security Awareness', slug: 'cyber-security-awareness', category: 'Cyber Security',
    shortDescription: 'Cyber security awareness training to help all staff recognise threats and protect company data.',
    fullDescription: 'This Cyber Security Awareness course gives every employee a practical grounding in protecting themselves and the organisation online. It covers passwords, phishing, malware and safe use of devices. The course supports your information security policy and reduces human-risk factors.',
    thumbnail: THUMBS[12], price: 30, duration: '2 hours', level: 'Beginner',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 212,
    learningOutcomes: ['Recognise common cyber threats', 'Create and manage strong passwords', 'Identify phishing and social engineering', 'Use devices and email securely', 'Report security incidents correctly'],
    whoFor: ['All employees', 'New starters during induction', 'Remote and hybrid workers', 'Managers responsible for security culture'],
    modules: buildModules('crs-13', ['The Threat Landscape', 'Passwords and Accounts', 'Phishing and Malware', 'Final Assessment'],
      [
        [{ title: 'Welcome and Objectives', type: 'video', duration: '8 min' }, { title: 'Why Cyber Security Matters', type: 'reading', duration: '12 min' }, { title: 'Common Threats', type: 'video', duration: '15 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Strong Passwords', type: 'video', duration: '12 min' }, { title: 'Password Managers and MFA', type: 'reading', duration: '12 min' }, { title: 'Account Security', type: 'video', duration: '10 min' }, { title: 'Password Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Spotting Phishing', type: 'video', duration: '18 min' }, { title: 'Malware and Ransomware', type: 'reading', duration: '12 min' }, { title: 'Safe Browsing and Email', type: 'video', duration: '12 min' }, { title: 'Threats Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'cyber'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-09-05', instructorId: 'ins-3', enrolledCount: 1720, published: true,
  },
  {
    id: 'crs-14', title: 'Phishing Awareness', slug: 'phishing-awareness', category: 'Cyber Security',
    shortDescription: 'Focused phishing awareness training to help staff spot and report phishing attempts confidently.',
    fullDescription: 'This Phishing Awareness course focuses on recognising and responding to phishing, spear phishing and business email compromise. It uses real-world examples and simulated scenarios to build confidence. The course is suitable for all staff and supports your reporting culture.',
    thumbnail: THUMBS[13], price: 25, duration: '1.5 hours', level: 'Beginner',
    cpdPoints: 1, cpdApproved: true, rospaAssured: true, rating: 4.6, reviewCount: 134,
    learningOutcomes: ['Identify common phishing indicators', 'Distinguish spear phishing and BEC', 'Verify sender identity safely', 'Report phishing through the correct channel', 'Respond if a link or attachment has been clicked'],
    whoFor: ['All employees', 'Finance and accounts teams', 'Executive assistants', 'New starters'],
    modules: buildModules('crs-14', ['Understanding Phishing', 'Spotting the Signs', 'Responding and Reporting', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '6 min' }, { title: 'What is Phishing?', type: 'reading', duration: '10 min' }, { title: 'Types of Phishing', type: 'video', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Red Flags in Emails', type: 'video', duration: '15 min' }, { title: 'Suspicious Links and Domains', type: 'reading', duration: '10 min' }, { title: 'Spear Phishing and BEC', type: 'video', duration: '12 min' }, { title: 'Spotting Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'How to Report', type: 'video', duration: '10 min' }, { title: 'If You Clicked — Now What?', type: 'reading', duration: '10 min' }, { title: 'Building a Reporting Culture', type: 'reading', duration: '8 min' }, { title: 'Response Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '10 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'phishing'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-08-28', instructorId: 'ins-3', enrolledCount: 980, published: true,
  },
  {
    id: 'crs-15', title: 'Information Security Basics', slug: 'information-security-basics', category: 'Cyber Security',
    shortDescription: 'Information security fundamentals covering the CIA triad, access control and data handling.',
    fullDescription: 'This Information Security Basics course introduces the core principles of protecting information in any organisation. It covers the CIA triad, least privilege, physical security and secure data handling. The course is suitable for all staff and supports ISO 27001 awareness.',
    thumbnail: THUMBS[14], price: 35, duration: '2.5 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 91,
    learningOutcomes: ['Explain the CIA triad and its application', 'Apply the principle of least privilege', 'Handle data securely across its lifecycle', 'Recognise physical security risks', 'Support an information security policy'],
    whoFor: ['All employees', 'IT and systems administrators', 'Managers overseeing data handling', 'Compliance and audit staff'],
    modules: buildModules('crs-15', ['Security Principles', 'Access and Identity', 'Data Handling and Physical Security', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'The CIA Triad', type: 'reading', duration: '12 min' }, { title: 'Threats and Actors', type: 'video', duration: '15 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Least Privilege', type: 'video', duration: '12 min' }, { title: 'Authentication and MFA', type: 'reading', duration: '12 min' }, { title: 'Access Reviews', type: 'video', duration: '10 min' }, { title: 'Access Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Data Classification', type: 'reading', duration: '12 min' }, { title: 'Secure Disposal', type: 'video', duration: '10 min' }, { title: 'Physical Security and Tailgating', type: 'video', duration: '12 min' }, { title: 'Handling Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'infoSec'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-06-18', instructorId: 'ins-3', enrolledCount: 640, published: true,
  },
  {
    id: 'crs-16', title: 'Equality & Diversity', slug: 'equality-and-diversity', category: 'Equality & Diversity',
    shortDescription: 'Equality and diversity training to promote inclusive, lawful and respectful workplaces.',
    fullDescription: 'This Equality & Diversity course explains the Equality Act 2010 and how to build an inclusive workplace. It covers protected characteristics, types of discrimination and practical steps to support diversity. The course is suitable for all employees and managers.',
    thumbnail: THUMBS[15], price: 30, duration: '2 hours', level: 'Beginner',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 167,
    learningOutcomes: ['Explain the protected characteristics under the Equality Act 2010', 'Identify direct and indirect discrimination', 'Recognise harassment and victimisation', 'Apply inclusive language and behaviours', 'Support a diverse and respectful workplace'],
    whoFor: ['All employees', 'Managers and team leaders', 'HR professionals', 'New starters during induction'],
    modules: buildModules('crs-16', ['The Equality Act', 'Types of Discrimination', 'Inclusion in Practice', 'Final Assessment'],
      [
        [{ title: 'Welcome and Aims', type: 'video', duration: '8 min' }, { title: 'Protected Characteristics', type: 'reading', duration: '15 min' }, { title: 'The Public Sector Duty', type: 'reading', duration: '10 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Direct and Indirect Discrimination', type: 'video', duration: '18 min' }, { title: 'Harassment and Victimisation', type: 'video', duration: '12 min' }, { title: 'Reasonable Adjustments', type: 'reading', duration: '10 min' }, { title: 'Discrimination Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Inclusive Language', type: 'video', duration: '12 min' }, { title: 'Unconscious Bias', type: 'reading', duration: '10 min' }, { title: 'Being an Active Ally', type: 'video', duration: '10 min' }, { title: 'Inclusion Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'equality'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-07-30', instructorId: 'ins-2', enrolledCount: 1240, published: true,
  },
  {
    id: 'crs-17', title: 'Workplace Harassment', slug: 'workplace-harassment', category: 'HR & Employment',
    shortDescription: 'Workplace harassment training to help staff recognise, prevent and report harassment.',
    fullDescription: 'This Workplace Harassment course explains what constitutes harassment, how to prevent it and how to respond. It covers sexual harassment, bullying and the role of bystanders. The course supports a respectful workplace culture and legal compliance.',
    thumbnail: THUMBS[16], price: 35, duration: '2 hours', level: 'Intermediate',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.6, reviewCount: 78,
    learningOutcomes: ['Define harassment and bullying under the law', 'Recognise harassment in person and online', 'Apply the bystander intervention model', 'Follow correct reporting procedures', 'Support those affected by harassment'],
    whoFor: ['All employees', 'Managers and supervisors', 'HR professionals', 'Team leaders'],
    modules: buildModules('crs-17', ['Understanding Harassment', 'Sexual Harassment and Bullying', 'Bystanders and Reporting', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'What is Harassment?', type: 'reading', duration: '12 min' }, { title: 'Legal Context', type: 'reading', duration: '10 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Sexual Harassment', type: 'video', duration: '15 min' }, { title: 'Bullying vs Strong Management', type: 'reading', duration: '10 min' }, { title: 'Online Harassment', type: 'video', duration: '12 min' }, { title: 'Harassment Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'The Bystander Role', type: 'video', duration: '12 min' }, { title: 'Reporting Channels', type: 'reading', duration: '10 min' }, { title: 'Supporting Colleagues', type: 'video', duration: '10 min' }, { title: 'Reporting Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'harassment'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-05-22', instructorId: 'ins-2', enrolledCount: 690, published: true,
  },
  {
    id: 'crs-18', title: 'Safeguarding Adults Level 2', slug: 'safeguarding-adults-level-2', category: 'Safeguarding',
    shortDescription: 'Level 2 safeguarding adults training for those with regular contact with adults at risk.',
    fullDescription: 'This Safeguarding Adults Level 2 course provides the knowledge required by staff who have regular or intense contact with adults at risk. It covers the Care Act duties, types of abuse and the referral process. The course meets the intercollegiate guidance for Level 2 staff.',
    thumbnail: THUMBS[17], price: 45, duration: '3 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.8, reviewCount: 64,
    learningOutcomes: ['Explain the duties under the Care Act 2014', 'Identify types and signs of adult abuse', 'Respond appropriately to disclosures', 'Make a safeguarding referral', 'Work within the multi-agency framework'],
    whoFor: ['Care and support workers', 'Healthcare assistants', 'Domiciliary care staff', 'Community support workers'],
    modules: buildModules('crs-18', ['Safeguarding Adults Framework', 'Recognising Abuse', 'Responding and Referring', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '10 min' }, { title: 'The Care Act 2014', type: 'reading', duration: '15 min' }, { title: 'Making Safeguarding Personal', type: 'video', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Types of Abuse', type: 'video', duration: '18 min' }, { title: 'Signs and Symptoms', type: 'reading', duration: '12 min' }, { title: 'Who is at Risk?', type: 'video', duration: '10 min' }, { title: 'Recognition Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Responding to Disclosures', type: 'video', duration: '15 min' }, { title: 'Making a Referral', type: 'reading', duration: '12 min' }, { title: 'Multi-Agency Working', type: 'video', duration: '12 min' }, { title: 'Referral Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'safeguarding'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-08-08', instructorId: 'ins-4', enrolledCount: 520, published: true,
  },
  {
    id: 'crs-19', title: 'Safeguarding Children Level 2', slug: 'safeguarding-children-level-2', category: 'Safeguarding',
    shortDescription: 'Level 2 safeguarding children training for staff with regular contact with children and young people.',
    fullDescription: 'This Safeguarding Children Level 2 course equips staff who have regular contact with children to recognise and respond to concerns. It covers the Children Act duties, signs of abuse and the referral pathway. The course aligns with the Working Together 2023 guidance.',
    thumbnail: THUMBS[18], price: 45, duration: '3 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.9, reviewCount: 71,
    learningOutcomes: ['Explain duties under the Children Act 1989 and 2004', 'Recognise signs of child abuse and neglect', 'Respond to disclosures from children', 'Make a timely safeguarding referral', 'Work within multi-agency safeguarding'],
    whoFor: ['Teachers and teaching assistants', 'Youth and community workers', 'Healthcare staff working with children', 'Sports and activity coaches'],
    modules: buildModules('crs-19', ['The Safeguarding Framework', 'Recognising Abuse', 'Responding to Children', 'Final Assessment'],
      [
        [{ title: 'Welcome and Scope', type: 'video', duration: '10 min' }, { title: 'Working Together 2023', type: 'reading', duration: '15 min' }, { title: 'The Children Acts', type: 'reading', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Types of Abuse', type: 'video', duration: '18 min' }, { title: 'Signs of Neglect', type: 'reading', duration: '12 min' }, { title: 'Grooming and Exploitation', type: 'video', duration: '15 min' }, { title: 'Recognition Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Listening to Children', type: 'video', duration: '15 min' }, { title: 'Recording Concerns', type: 'reading', duration: '10 min' }, { title: 'The Referral Pathway', type: 'video', duration: '12 min' }, { title: 'Response Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'safeguarding'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-09-12', instructorId: 'ins-4', enrolledCount: 610, published: true,
  },
  {
    id: 'crs-20', title: 'Food Hygiene Level 2', slug: 'food-hygiene-level-2', category: 'Food Safety',
    shortDescription: 'Level 2 food hygiene training for caterers, retailers and manufacturers handling food.',
    fullDescription: 'This Food Hygiene Level 2 course provides the knowledge required by food handlers preparing or serving food. It covers contamination, temperature control, cleaning and personal hygiene. The course meets the training requirements of the Food Safety and Hygiene (England) Regulations.',
    thumbnail: THUMBS[19], price: 30, duration: '2.5 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 198,
    learningOutcomes: ['Explain the causes of food contamination', 'Apply temperature control and the danger zone', 'Maintain personal hygiene standards', 'Implement effective cleaning and disinfection', 'Understand food safety law and enforcement'],
    whoFor: ['Caterers and chefs', 'Retail food handlers', 'Care home kitchen staff', 'Food manufacturing operatives'],
    modules: buildModules('crs-20', ['Food Safety Hazards', 'Temperature and Storage', 'Personal Hygiene and Cleaning', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'Food Safety Law', type: 'reading', duration: '12 min' }, { title: 'Types of Contamination', type: 'video', duration: '15 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'The Danger Zone', type: 'video', duration: '12 min' }, { title: 'Chilling and Freezing', type: 'reading', duration: '10 min' }, { title: 'Cooking and Reheating', type: 'video', duration: '12 min' }, { title: 'Temperature Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Personal Hygiene', type: 'video', duration: '12 min' }, { title: 'Cleaning and Disinfection', type: 'reading', duration: '10 min' }, { title: 'Pest Control', type: 'video', duration: '8 min' }, { title: 'Hygiene Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'food'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-07-25', instructorId: 'ins-1', enrolledCount: 1340, published: true,
  },
  {
    id: 'crs-21', title: 'HACCP Training', slug: 'haccp-training', category: 'Food Safety',
    shortDescription: 'HACCP training to help food businesses identify and control critical points in their processes.',
    fullDescription: 'This HACCP Training course explains the seven principles of Hazard Analysis and Critical Control Points for food businesses. It covers hazard analysis, critical control points and verification. The course is suitable for those responsible for developing or maintaining a HACCP plan.',
    thumbnail: THUMBS[20], price: 60, duration: '4 hours', level: 'Advanced',
    cpdPoints: 4, cpdApproved: true, rospaAssured: true, rating: 4.8, reviewCount: 47,
    learningOutcomes: ['Explain the seven HACCP principles', 'Conduct a hazard analysis', 'Identify critical control points and limits', 'Establish monitoring and corrective actions', 'Verify and document a HACCP plan'],
    whoFor: ['Food business operators', 'Quality and technical managers', 'Production supervisors', 'HACCP team members'],
    modules: buildModules('crs-21', ['HACCP Principles', 'Hazard Analysis and CCPs', 'Monitoring and Verification', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '10 min' }, { title: 'The Seven Principles', type: 'reading', duration: '15 min' }, { title: 'Prerequisite Programmes', type: 'reading', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Hazard Analysis', type: 'video', duration: '18 min' }, { title: 'Determining CCPs', type: 'video', duration: '15 min' }, { title: 'Critical Limits', type: 'reading', duration: '12 min' }, { title: 'CCP Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Monitoring Procedures', type: 'video', duration: '15 min' }, { title: 'Corrective Actions', type: 'reading', duration: '10 min' }, { title: 'Verification and Records', type: 'video', duration: '12 min' }, { title: 'Monitoring Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'food'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-06-10', instructorId: 'ins-1', enrolledCount: 280, published: true,
  },
  {
    id: 'crs-22', title: 'Environmental Awareness', slug: 'environmental-awareness', category: 'Environmental',
    shortDescription: 'Environmental awareness training to help employees reduce their environmental impact at work.',
    fullDescription: 'This Environmental Awareness course helps employees understand their role in reducing environmental impact. It covers energy, waste, water and carbon footprint. The course supports your environmental policy and sustainability goals.',
    thumbnail: THUMBS[21], price: 25, duration: '2 hours', level: 'Beginner',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.6, reviewCount: 84,
    learningOutcomes: ['Explain key environmental issues and terms', 'Apply the waste hierarchy at work', 'Reduce energy and water use', 'Calculate a basic carbon footprint', 'Support your organisation’s environmental policy'],
    whoFor: ['All employees', 'Green champions', 'Facilities staff', 'Sustainability leads'],
    modules: buildModules('crs-22', ['Environmental Basics', 'Waste and Resources', 'Energy and Carbon', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'Key Environmental Issues', type: 'reading', duration: '12 min' }, { title: 'Sustainable Development', type: 'video', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'The Waste Hierarchy', type: 'video', duration: '12 min' }, { title: 'Recycling at Work', type: 'reading', duration: '10 min' }, { title: 'Water Conservation', type: 'video', duration: '8 min' }, { title: 'Waste Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Energy Efficiency', type: 'video', duration: '12 min' }, { title: 'Carbon Footprint', type: 'reading', duration: '10 min' }, { title: 'Travel and Transport', type: 'video', duration: '10 min' }, { title: 'Energy Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'environmental'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-08-15', instructorId: 'ins-1', enrolledCount: 760, published: true,
  },
  {
    id: 'crs-23', title: 'Waste Management', slug: 'waste-management', category: 'Environmental',
    shortDescription: 'Waste management training covering the duty of care, hazardous waste and transfer notes.',
    fullDescription: 'This Waste Management course explains the legal duty of care and how to manage waste compliantly. It covers waste classification, hazardous waste and transfer documentation. The course is suitable for those responsible for waste in their organisation.',
    thumbnail: THUMBS[22], price: 40, duration: '2.5 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 52,
    learningOutcomes: ['Explain the waste duty of care', 'Classify waste streams correctly', 'Manage hazardous waste compliantly', 'Complete waste transfer documentation', 'Select and audit waste contractors'],
    whoFor: ['Facilities and estates managers', 'Environmental and compliance officers', 'Site managers', 'Waste contractors'],
    modules: buildModules('crs-23', ['The Duty of Care', 'Waste Classification', 'Hazardous Waste', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'The Duty of Care', type: 'reading', duration: '15 min' }, { title: 'Waste Legislation', type: 'reading', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Waste Streams', type: 'video', duration: '12 min' }, { title: 'The Waste Hierarchy', type: 'reading', duration: '10 min' }, { title: 'Transfer Notes', type: 'video', duration: '12 min' }, { title: 'Classification Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'What is Hazardous Waste?', type: 'video', duration: '15 min' }, { title: 'Consignment Notes', type: 'reading', duration: '12 min' }, { title: 'Storage and Labelling', type: 'video', duration: '10 min' }, { title: 'Hazardous Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'waste'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-05-30', instructorId: 'ins-1', enrolledCount: 340, published: true,
  },
  {
    id: 'crs-24', title: 'Stress Awareness', slug: 'stress-awareness', category: 'Mental Health & Wellbeing',
    shortDescription: 'Stress awareness training to help staff recognise and manage stress at work and home.',
    fullDescription: 'This Stress Awareness course helps employees understand what stress is, how to recognise it and how to manage it. It covers causes, signs and coping strategies using the HSE Management Standards. The course supports personal wellbeing and a healthier workplace.',
    thumbnail: THUMBS[23], price: 25, duration: '2 hours', level: 'Beginner',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 142,
    learningOutcomes: ['Explain what stress is and its causes', 'Recognise the signs of stress in yourself and others', 'Apply practical coping strategies', 'Understand the HSE Management Standards', 'Access support and resources'],
    whoFor: ['All employees', 'Managers and team leaders', 'Health and safety reps', 'HR professionals'],
    modules: buildModules('crs-24', ['Understanding Stress', 'Causes and Signs', 'Managing Stress', 'Final Assessment'],
      [
        [{ title: 'Welcome and Aims', type: 'video', duration: '8 min' }, { title: 'What is Stress?', type: 'reading', duration: '12 min' }, { title: 'Good vs Bad Stress', type: 'video', duration: '10 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Causes of Work Stress', type: 'video', duration: '15 min' }, { title: 'The HSE Management Standards', type: 'reading', duration: '12 min' }, { title: 'Signs and Symptoms', type: 'video', duration: '12 min' }, { title: 'Causes Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Coping Strategies', type: 'video', duration: '15 min' }, { title: 'Time and Workload Management', type: 'reading', duration: '10 min' }, { title: 'Getting Support', type: 'video', duration: '10 min' }, { title: 'Management Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'stress'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-09-08', instructorId: 'ins-4', enrolledCount: 1080, published: true,
  },
  {
    id: 'crs-25', title: 'Mental Health First Aid', slug: 'mental-health-first-aid', category: 'Mental Health & Wellbeing',
    shortDescription: 'Mental health first aid training to support colleagues experiencing mental ill health.',
    fullDescription: 'This Mental Health First Aid course teaches the ALGEE action plan to support someone experiencing a mental health issue. It covers depression, anxiety and crisis response. The course is suitable for designated mental health first aiders and interested colleagues.',
    thumbnail: THUMBS[24], price: 75, duration: '4 hours', level: 'Intermediate',
    cpdPoints: 4, cpdApproved: true, rospaAssured: true, rating: 4.9, reviewCount: 116,
    learningOutcomes: ['Explain the role of a mental health first aider', 'Apply the ALGEE action plan', 'Recognise depression, anxiety and psychosis', 'Respond to crisis situations including suicidal thoughts', 'Signpost to appropriate professional support'],
    whoFor: ['Designated mental health first aiders', 'Managers and HR staff', 'Team leaders', 'Anyone interested in supporting colleagues'],
    modules: buildModules('crs-25', ['Mental Health First Aid', 'Common Conditions', 'Crisis Response', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '10 min' }, { title: 'The MHFA Role', type: 'reading', duration: '15 min' }, { title: 'The ALGEE Plan', type: 'video', duration: '18 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Depression', type: 'video', duration: '18 min' }, { title: 'Anxiety Disorders', type: 'reading', duration: '15 min' }, { title: 'Psychosis', type: 'video', duration: '12 min' }, { title: 'Conditions Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Suicide Risk', type: 'video', duration: '20 min' }, { title: 'Self-Harm', type: 'reading', duration: '12 min' }, { title: 'Panic Attacks', type: 'video', duration: '10 min' }, { title: 'Crisis Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Signposting and Self-Care', type: 'reading', duration: '12 min' }, { title: 'Final Assessment', type: 'quiz', duration: '15 min' }],
      ], 'mhfa'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-08-01', instructorId: 'ins-4', enrolledCount: 820, published: true,
  },
  {
    id: 'crs-26', title: 'Lone Working', slug: 'lone-working', category: 'Health & Safety',
    shortDescription: 'Lone working training covering risk assessment, communication and personal safety.',
    fullDescription: 'This Lone Working course explains how to assess and manage the risks of working alone. It covers communication systems, personal safety and emergency response. The course supports employer duties under the Health and Safety at Work Act 1974.',
    thumbnail: THUMBS[25], price: 30, duration: '2 hours', level: 'Beginner',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.6, reviewCount: 93,
    learningOutcomes: ['Define lone working and identify who is at risk', 'Apply the hierarchy of control for lone workers', 'Use communication and check-in systems', 'Manage personal safety and de-escalation', 'Respond to emergencies while working alone'],
    whoFor: ['Home visitors and community workers', 'Delivery and logistics staff', 'Security and cleaning staff', 'Managers of lone workers'],
    modules: buildModules('crs-26', ['Understanding Lone Working', 'Risk Assessment and Controls', 'Personal Safety and Emergencies', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'Who is a Lone Worker?', type: 'reading', duration: '12 min' }, { title: 'Legal Duties', type: 'reading', duration: '10 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Risk Assessment', type: 'video', duration: '15 min' }, { title: 'Hierarchy of Control', type: 'reading', duration: '12 min' }, { title: 'Check-in Systems', type: 'video', duration: '12 min' }, { title: 'Controls Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Personal Safety', type: 'video', duration: '12 min' }, { title: 'De-escalation Basics', type: 'reading', duration: '10 min' }, { title: 'Emergency Response', type: 'video', duration: '10 min' }, { title: 'Safety Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'lone'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-07-18', instructorId: 'ins-1', enrolledCount: 670, published: true,
  },
  {
    id: 'crs-27', title: 'Anti-Bribery and Corruption', slug: 'anti-bribery-and-corruption', category: 'HR & Employment',
    shortDescription: 'Anti-bribery training to help staff recognise and prevent bribery under the UK Bribery Act 2010.',
    fullDescription: 'This Anti-Bribery and Corruption course explains the UK Bribery Act 2010 and how to prevent bribery in business. It covers the four offences, adequate procedures and red flags. The course supports your anti-bribery policy and corporate compliance.',
    thumbnail: THUMBS[26], price: 40, duration: '2 hours', level: 'Intermediate',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 58,
    learningOutcomes: ['Explain the four offences under the Bribery Act 2010', 'Identify red flags and high-risk situations', 'Apply adequate procedures in daily work', 'Handle gifts and hospitality correctly', 'Report concerns through the correct channel'],
    whoFor: ['All employees', 'Procurement and sales staff', 'Managers and decision-makers', 'Compliance and audit teams'],
    modules: buildModules('crs-27', ['The Bribery Act', 'Red Flags and Risks', 'Adequate Procedures', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'The Four Offences', type: 'reading', duration: '15 min' }, { title: 'Jurisdiction and Scope', type: 'reading', duration: '10 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Common Red Flags', type: 'video', duration: '15 min' }, { title: 'High-Risk Countries and Sectors', type: 'reading', duration: '10 min' }, { title: 'Facilitation Payments', type: 'video', duration: '12 min' }, { title: 'Red Flags Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Gifts and Hospitality', type: 'video', duration: '12 min' }, { title: 'Adequate Procedures', type: 'reading', duration: '12 min' }, { title: 'Reporting Concerns', type: 'video', duration: '8 min' }, { title: 'Procedures Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'bribery'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-06-05', instructorId: 'ins-2', enrolledCount: 430, published: true,
  },
  {
    id: 'crs-28', title: 'Infection Control', slug: 'infection-control', category: 'Health & Safety',
    shortDescription: 'Infection control training covering hand hygiene, PPE and the chain of infection.',
    fullDescription: 'This Infection Control course explains how to prevent and control the spread of infection in workplaces. It covers the chain of infection, hand hygiene and PPE. The course is suitable for care, healthcare and cleaning staff.',
    thumbnail: THUMBS[27], price: 35, duration: '2.5 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 109,
    learningOutcomes: ['Explain the chain of infection', 'Demonstrate correct hand hygiene technique', 'Select and use PPE appropriately', 'Manage blood and bodily fluids safely', 'Apply standard infection control precautions'],
    whoFor: ['Care and healthcare staff', 'Cleaning and domestic staff', 'Tattooists and beauty therapists', 'Facilities managers'],
    modules: buildModules('crs-28', ['The Chain of Infection', 'Hand Hygiene and PPE', 'Managing Contamination', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'The Chain of Infection', type: 'reading', duration: '15 min' }, { title: 'Types of Pathogen', type: 'video', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Hand Hygiene', type: 'video', duration: '15 min' }, { title: 'When to Wash', type: 'reading', duration: '10 min' }, { title: 'Selecting and Using PPE', type: 'video', duration: '18 min' }, { title: 'Hygiene Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Blood and Bodily Fluids', type: 'video', duration: '12 min' }, { title: 'Sharps Safety', type: 'reading', duration: '10 min' }, { title: 'Waste Management', type: 'video', duration: '10 min' }, { title: 'Contamination Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'infection'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-08-25', instructorId: 'ins-4', enrolledCount: 890, published: true,
  },
  {
    id: 'crs-29', title: 'Conflict Resolution', slug: 'conflict-resolution', category: 'HR & Employment',
    shortDescription: 'Conflict resolution training to help staff de-escalate difficult situations safely.',
    fullDescription: 'This Conflict Resolution course provides practical techniques for managing and de-escalating conflict. It covers communication, triggers and personal safety. The course is suitable for customer-facing staff and those who may encounter aggression.',
    thumbnail: THUMBS[28], price: 35, duration: '2 hours', level: 'Intermediate',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.6, reviewCount: 86,
    learningOutcomes: ['Identify causes and stages of conflict', 'Apply de-escalation techniques', 'Use positive communication', 'Maintain personal safety', 'Know when and how to disengage'],
    whoFor: ['Customer service and retail staff', 'Healthcare and care workers', 'Frontline public sector staff', 'Managers of customer-facing teams'],
    modules: buildModules('crs-29', ['Understanding Conflict', 'Communication and De-escalation', 'Personal Safety', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'What is Conflict?', type: 'reading', duration: '12 min' }, { title: 'Triggers and Stages', type: 'video', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Positive Communication', type: 'video', duration: '15 min' }, { title: 'De-escalation Techniques', type: 'reading', duration: '12 min' }, { title: 'Active Listening', type: 'video', duration: '10 min' }, { title: 'Communication Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Body Language', type: 'video', duration: '12 min' }, { title: 'When to Disengage', type: 'reading', duration: '10 min' }, { title: 'Post-Incident Support', type: 'video', duration: '8 min' }, { title: 'Safety Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'conflict'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-07-10', instructorId: 'ins-2', enrolledCount: 540, published: true,
  },
  {
    id: 'crs-30', title: 'Time Management', slug: 'time-management', category: 'Leadership & Management',
    shortDescription: 'Time management training to help staff prioritise, plan and work more effectively.',
    fullDescription: 'This Time Management course provides practical tools to plan and prioritise work effectively. It covers the Eisenhower Matrix, Pomodoro Technique and managing interruptions. The course is suitable for anyone who wants to improve productivity and reduce overwhelm.',
    thumbnail: THUMBS[29], price: 30, duration: '2 hours', level: 'Beginner',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.5, reviewCount: 124,
    learningOutcomes: ['Prioritise tasks using the Eisenhower Matrix', 'Apply the Pomodoro Technique', 'Manage email and meeting interruptions', 'Set SMART goals', 'Plan a productive working week'],
    whoFor: ['All employees', 'Managers and team leaders', 'Administrators and PAs', 'Anyone feeling time-poor'],
    modules: buildModules('crs-30', ['Prioritisation and Planning', 'Focus and Productivity', 'Managing Interruptions', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'Time Audit', type: 'reading', duration: '10 min' }, { title: 'The Eisenhower Matrix', type: 'video', duration: '15 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'The Pomodoro Technique', type: 'video', duration: '12 min' }, { title: 'Deep Work', type: 'reading', duration: '10 min' }, { title: 'SMART Goals', type: 'video', duration: '10 min' }, { title: 'Focus Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Managing Email', type: 'video', duration: '12 min' }, { title: 'Effective Meetings', type: 'reading', duration: '10 min' }, { title: 'Saying No Constructively', type: 'video', duration: '8 min' }, { title: 'Interruptions Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'time'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-09-02', instructorId: 'ins-2', enrolledCount: 760, published: true,
  },
  {
    id: 'crs-31', title: 'Leadership Essentials', slug: 'leadership-essentials', category: 'Leadership & Management',
    shortDescription: 'Leadership essentials for new and aspiring managers to lead teams with confidence.',
    fullDescription: 'This Leadership Essentials course introduces the core skills needed to lead a team effectively. It covers leadership styles, motivation and delegation. The course is suitable for new and aspiring managers who want to build strong foundations.',
    thumbnail: THUMBS[30], price: 60, duration: '4 hours', level: 'Intermediate',
    cpdPoints: 4, cpdApproved: true, rospaAssured: true, rating: 4.8, reviewCount: 67,
    learningOutcomes: ['Describe common leadership styles and when to use them', 'Motivate and engage a team', 'Delegate effectively and confidently', 'Give constructive feedback', 'Build trust and psychological safety'],
    whoFor: ['New and aspiring managers', 'Team leaders', 'Supervisors', 'Project leads'],
    modules: buildModules('crs-31', ['Leadership Styles', 'Motivating Teams', 'Delegation and Feedback', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '10 min' }, { title: 'What is Leadership?', type: 'reading', duration: '15 min' }, { title: 'Leadership Styles', type: 'video', duration: '18 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Motivation Theory', type: 'video', duration: '15 min' }, { title: 'Engaging Your Team', type: 'reading', duration: '12 min' }, { title: 'Psychological Safety', type: 'video', duration: '12 min' }, { title: 'Motivation Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'The Art of Delegation', type: 'video', duration: '15 min' }, { title: 'Giving Feedback', type: 'reading', duration: '12 min' }, { title: 'Difficult Conversations', type: 'video', duration: '12 min' }, { title: 'Delegation Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'leadership'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-08-12', instructorId: 'ins-2', enrolledCount: 480, published: true,
  },
  {
    id: 'crs-32', title: 'Change Management', slug: 'change-management', category: 'Leadership & Management',
    shortDescription: 'Change management training to help leaders plan and deliver successful change.',
    fullDescription: 'This Change Management course equips leaders to plan, communicate and deliver change effectively. It covers Kotter’s 8 steps, the change curve and stakeholder engagement. The course is suitable for managers leading change initiatives.',
    thumbnail: THUMBS[31], price: 75, duration: '4 hours', level: 'Advanced',
    cpdPoints: 4, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 44,
    learningOutcomes: ['Explain why change initiatives fail', 'Apply Kotter’s 8-step model', 'Support people through the change curve', 'Engage stakeholders effectively', 'Plan and communicate a change initiative'],
    whoFor: ['Senior managers and leaders', 'Project and programme managers', 'HR and OD professionals', 'Change agents'],
    modules: buildModules('crs-32', ['Understanding Change', 'Change Models', 'People and Communication', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '10 min' }, { title: 'Why Change Fails', type: 'reading', duration: '15 min' }, { title: 'Types of Change', type: 'video', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Kotter’s 8 Steps', type: 'video', duration: '20 min' }, { title: 'The Change Curve', type: 'reading', duration: '15 min' }, { title: 'ADKAR', type: 'video', duration: '12 min' }, { title: 'Models Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Stakeholder Engagement', type: 'video', duration: '15 min' }, { title: 'Communicating Change', type: 'reading', duration: '12 min' }, { title: 'Resistance and Support', type: 'video', duration: '12 min' }, { title: 'People Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'change'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-06-22', instructorId: 'ins-2', enrolledCount: 290, published: true,
  },
  {
    id: 'crs-33', title: 'DSE Assessment Training', slug: 'dse-assessment-training', category: 'Health & Safety',
    shortDescription: 'DSE assessor training to carry out and record workstation assessments competently.',
    fullDescription: 'This DSE Assessment Training course prepares staff to carry out display screen equipment assessments competently. It covers the regulations, assessment technique and common adjustments. The course is suitable for those nominated as DSE assessors.',
    thumbnail: THUMBS[32], price: 50, duration: '3 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 39,
    learningOutcomes: ['Explain the DSE Regulations and employer duties', 'Carry out a structured DSE assessment', 'Identify and resolve common workstation issues', 'Record and review assessments', 'Advise staff on safe setup'],
    whoFor: ['Nominated DSE assessors', 'Health and safety coordinators', 'Facilities managers', 'HR staff supporting homeworkers'],
    modules: buildModules('crs-33', ['The DSE Regulations', 'Conducting Assessments', 'Resolving Issues and Recording', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'The Regulations', type: 'reading', duration: '15 min' }, { title: 'Who is a DSE User?', type: 'reading', duration: '10 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'The Assessment Process', type: 'video', duration: '18 min' }, { title: 'Workstation Checks', type: 'video', duration: '15 min' }, { title: 'Homeworking Assessments', type: 'reading', duration: '12 min' }, { title: 'Assessment Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Common Issues and Fixes', type: 'video', duration: '15 min' }, { title: 'Recording Findings', type: 'reading', duration: '10 min' }, { title: 'Review and Follow-up', type: 'video', duration: '10 min' }, { title: 'Recording Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'dse'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-07-28', instructorId: 'ins-1', enrolledCount: 320, published: true,
  },
  {
    id: 'crs-34', title: 'Abrasive Wheels', slug: 'abrasive-wheels', category: 'Health & Safety',
    shortDescription: 'Abrasive wheels training covering selection, mounting and safe use of grinding equipment.',
    fullDescription: 'This Abrasive Wheels course covers the safe selection, mounting and use of abrasive wheels. It covers the PUWER 1998 requirements, wheel marking and inspection. The course is suitable for anyone who uses or supervises the use of abrasive wheels.',
    thumbnail: THUMBS[33], price: 45, duration: '2.5 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 56,
    learningOutcomes: ['Explain the hazards of abrasive wheels', 'Select the correct wheel for the task', 'Mount and inspect wheels safely', 'Use guarding and PPE correctly', 'Meet PUWER 1998 requirements'],
    whoFor: ['Engineering and fabrication staff', 'Construction workers', 'Maintenance technicians', 'Supervisors of grinding work'],
    modules: buildModules('crs-34', ['Hazards and Legislation', 'Selection and Mounting', 'Safe Use and Inspection', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'Hazards of Abrasive Wheels', type: 'reading', duration: '12 min' }, { title: 'PUWER 1998', type: 'reading', duration: '10 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Wheel Markings', type: 'video', duration: '15 min' }, { title: 'Selecting the Right Wheel', type: 'reading', duration: '12 min' }, { title: 'Mounting Procedures', type: 'video', duration: '15 min' }, { title: 'Selection Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Guards and Rests', type: 'video', duration: '12 min' }, { title: 'PPE Requirements', type: 'reading', duration: '10 min' }, { title: 'Inspection and Storage', type: 'video', duration: '10 min' }, { title: 'Safe Use Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'abrasive'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-05-14', instructorId: 'ins-1', enrolledCount: 410, published: true,
  },
  {
    id: 'crs-35', title: 'Noise at Work', slug: 'noise-at-work', category: 'Health & Safety',
    shortDescription: 'Noise at work training covering exposure limits, hearing protection and risk assessment.',
    fullDescription: 'This Noise at Work course explains the Control of Noise at Work Regulations 2005 and how to protect hearing. It covers exposure limits, controls and hearing protection. The course is suitable for anyone exposed to high noise levels at work.',
    thumbnail: THUMBS[34], price: 35, duration: '2 hours', level: 'Intermediate',
    cpdPoints: 2, cpdApproved: true, rospaAssured: true, rating: 4.6, reviewCount: 48,
    learningOutcomes: ['Explain the Noise at Work Regulations', 'Identify noise exposure action and limit values', 'Apply the hierarchy of control for noise', 'Select suitable hearing protection', 'Support health surveillance'],
    whoFor: ['Manufacturing and construction workers', 'Engineering and maintenance staff', 'Entertainment and hospitality staff', 'Managers of noisy environments'],
    modules: buildModules('crs-35', ['Noise and Hearing', 'Exposure Limits and Controls', 'Hearing Protection and Surveillance', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'How We Hear', type: 'reading', duration: '12 min' }, { title: 'Effects of Noise', type: 'video', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Action and Limit Values', type: 'video', duration: '15 min' }, { title: 'Hierarchy of Control', type: 'reading', duration: '12 min' }, { title: 'Noise Risk Assessment', type: 'video', duration: '12 min' }, { title: 'Exposure Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Selecting Hearing Protection', type: 'video', duration: '12 min' }, { title: 'Fit and Maintenance', type: 'reading', duration: '10 min' }, { title: 'Health Surveillance', type: 'video', duration: '8 min' }, { title: 'Protection Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'noise'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-06-15', instructorId: 'ins-1', enrolledCount: 380, published: true,
  },
  {
    id: 'crs-36', title: 'Hand Arm Vibration', slug: 'hand-arm-vibration', category: 'Health & Safety',
    shortDescription: 'Hand-arm vibration training covering HAVS, exposure limits and control measures.',
    fullDescription: 'This Hand Arm Vibration course explains the risks of vibration from hand-held tools and how to control them. It covers the Control of Vibration at Work Regulations 2005 and HAVS prevention. The course is suitable for anyone using vibrating equipment at work.',
    thumbnail: THUMBS[35], price: 40, duration: '2.5 hours', level: 'Intermediate',
    cpdPoints: 3, cpdApproved: true, rospaAssured: true, rating: 4.7, reviewCount: 42,
    learningOutcomes: ['Explain the causes and effects of HAVS', 'Identify exposure action and limit values', 'Apply the hierarchy of control for vibration', 'Calculate daily vibration exposure', 'Support health surveillance and reporting'],
    whoFor: ['Construction and demolition workers', 'Forestry and grounds staff', 'Vehicle and workshop technicians', 'Supervisors of tool users'],
    modules: buildModules('crs-36', ['Understanding Vibration', 'Exposure and Limits', 'Controls and Surveillance', 'Final Assessment'],
      [
        [{ title: 'Course Introduction', type: 'video', duration: '8 min' }, { title: 'What is HAVS?', type: 'reading', duration: '12 min' }, { title: 'Causes and Tools', type: 'video', duration: '12 min' }, { title: 'Knowledge Check', type: 'quiz', duration: '5 min' }],
        [{ title: 'Exposure Values', type: 'video', duration: '15 min' }, { title: 'Calculating Exposure', type: 'reading', duration: '12 min' }, { title: 'Vibration Risk Assessment', type: 'video', duration: '12 min' }, { title: 'Exposure Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Hierarchy of Control', type: 'video', duration: '15 min' }, { title: 'Tool Selection and Maintenance', type: 'reading', duration: '10 min' }, { title: 'Health Surveillance', type: 'video', duration: '10 min' }, { title: 'Controls Quiz', type: 'quiz', duration: '5 min' }],
        [{ title: 'Final Assessment', type: 'quiz', duration: '15 min' }, { title: 'Summary', type: 'reading', duration: '5 min' }],
      ], 'havs'),
    passMark: 80, certificateValidity: '1 year', language: 'English', lastUpdated: '2025-04-20', instructorId: 'ins-1', enrolledCount: 260, published: true,
  },
];

/* ============================================================
 *  TESTIMONIALS — 8 customer testimonials
 * ============================================================ */
export const TESTIMONIALS: Testimonial[] = [
  { id: 'tst-1', name: 'Rebecca Holloway', role: 'Health & Safety Manager', company: 'Meridian Construction Ltd', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', rating: 5, text: 'EQMS Training has transformed how we deliver compliance training across our sites. The reporting dashboard makes audit preparation straightforward and our completion rates have never been higher.' },
  { id: 'tst-2', name: 'David Okonkwo', role: 'Operations Director', company: 'BlueStream Logistics', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', rating: 5, text: 'We rolled out the fire safety and manual handling courses to 400 staff in a fortnight. The bulk enrolment and team management features saved us hours of admin every week.' },
  { id: 'tst-3', name: 'Charlotte Pemberton', role: 'HR Business Partner', company: 'Northgate Care Group', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg', rating: 5, text: 'The safeguarding courses are excellent and clearly written by experts. Certificates and CPD points are issued instantly, which our regulators and inspectors love to see.' },
  { id: 'tst-4', name: 'Thomas Ridley', role: 'IT Manager', company: 'Crownfield Technologies', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', rating: 4, text: 'The cyber security awareness course is the best we have used. Phishing simulation results have dropped noticeably since we made it mandatory for all staff.' },
  { id: 'tst-5', name: 'Aisha Mahmood', role: 'Compliance Officer', company: 'Greenfield Foods plc', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', rating: 5, text: 'As a food manufacturer, HACCP and food hygiene training is non-negotiable. EQMS keeps our records audit-ready and the expiry reminders mean we never miss a refresher.' },
  { id: 'tst-6', name: 'Gareth Llewellyn', role: 'Facilities Manager', company: 'Capstone Property Services', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', rating: 4, text: 'Good range of courses and the LMS is easy to use. The ability to assign courses to teams and track progress in real time is exactly what we needed.' },
  { id: 'tst-7', name: 'Sophie Tran', role: 'Learning & Development Lead', company: 'Vanguard Retail Group', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg', rating: 5, text: 'We use EQMS for all our induction training. New starters complete their compliance courses before day one, which has dramatically improved our time-to-productivity.' },
  { id: 'tst-8', name: 'Marcus Fitzpatrick', role: 'Managing Director', company: 'Aldridge Engineering', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', rating: 5, text: 'The enterprise plan with single sign-on and API access integrated perfectly with our HR system. Support has been responsive and genuinely helpful throughout.' },
];

/* ============================================================
 *  FAQS — 8 frequently asked questions
 * ============================================================ */
export const FAQS: FAQ[] = [
  { id: 'faq-1', category: 'General', question: 'What is EQMS Training?', answer: 'EQMS Training is an online learning marketplace and LMS for workplace compliance training. All courses are CPD certified and RoSPA assured, and certificates are issued instantly on successful completion of the final assessment.' },
  { id: 'faq-2', category: 'General', question: 'Do I need any special software to take a course?', answer: 'No. All courses run in any modern web browser on desktop, tablet or mobile. There is nothing to install and you can pause and resume your progress at any time.' },
  { id: 'faq-3', category: 'Courses', question: 'How long do I have access to a course?', answer: 'You have unlimited access to a purchased course for 12 months from the date of enrolment, so you can revisit the material whenever you need a refresher.' },
  { id: 'faq-4', category: 'Courses', question: 'How long does each course take to complete?', answer: 'Course durations range from 1.5 to 6 hours, shown on each course page. You do not need to complete a course in one sitting — your progress is saved automatically.' },
  { id: 'faq-5', category: 'Payment', question: 'What payment methods do you accept?', answer: 'We accept all major debit and credit cards, Apple Pay and Google Pay. Business and enterprise customers can also pay by invoice with a purchase order.' },
  { id: 'faq-6', category: 'Payment', question: 'Do you offer discounts for multiple licences?', answer: 'Yes. Volume discounts are applied automatically at checkout when you buy five or more licences, and you can use coupon codes such as TEAM15 for additional savings on team purchases.' },
  { id: 'faq-7', category: 'Certification', question: 'Will I receive a certificate?', answer: 'Yes. On passing the final assessment with a score of 80% or above, a verifiable PDF certificate is issued instantly to your account, complete with a unique certificate ID.' },
  { id: 'faq-8', category: 'LMS', question: 'Can I track my team’s progress?', answer: 'Absolutely. The Team and Enterprise plans include a management dashboard where you can assign courses, monitor completion, download reports and set automatic expiry reminders for each team member.' },
];

/* ============================================================
 *  NEWS_ARTICLES — 6 articles
 * ============================================================ */
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1', slug: 'new-cpd-accredited-compliance-courses-2025', title: 'EQMS Training launches 12 new CPD-accredited compliance courses for 2025',
    excerpt: 'Our 2025 catalogue expansion adds fresh courses across fire safety, cyber security and safeguarding, all CPD certified and RoSPA assured.',
    content: 'We are delighted to announce the addition of twelve new CPD-accredited courses to our marketplace, covering fire safety, cyber security, safeguarding and mental health. Each course has been developed with subject-matter experts and independently accredited by the CPD Certification Service and assured by RoSPA.\n\nThe new additions include Fire Warden Training, Data Protection Officer Training and Mental Health First Aid, responding directly to the most common requests from our business customers. Every course includes video lessons, downloadable resources and a final assessment with instant certification.\n\nExisting customers can access the new courses immediately at no extra cost where they hold an active all-access licence. New customers can browse the full catalogue on our courses page, with team and enterprise pricing available for bulk purchases.',
    author: 'James Whitfield', authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', date: '2025-09-15',
    image: 'https://www.eqmstraining.co.uk/wp-content/uploads/2022/11/cropped-view-african-american-businesman-holding-mobile-phone-credit-card-while-paying-bill-cafe.jpg',
    category: 'Product News', readTime: '4 min',
  },
  {
    id: 'news-2', slug: 'ico-fines-data-protection-2025', title: 'ICO enforcement action: what it means for your data protection training',
    excerpt: 'Recent ICO fines highlight the cost of poor data protection. We break down the lessons and how training reduces your risk.',
    content: 'The Information Commissioner’s Office has issued several high-profile fines in 2025 for failures in data protection, from inadequate breach reporting to unlawful sharing of special category data. These enforcement actions are a timely reminder that training is not a box-ticking exercise but a core control.\n\nUnder UK GDPR, organisations must demonstrate accountability, and that means ensuring every employee who handles personal data understands their responsibilities. Our GDPR for Employees and Data Protection Officer Training courses are designed to build exactly that culture of compliance.\n\nIf you have not reviewed your data protection training in the last twelve months, now is the time. Our team can help you map training to your specific processing activities and risk profile.',
    author: 'Dr. Priya Sharma', authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', date: '2025-08-28',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg', category: 'Compliance', readTime: '6 min',
  },
  {
    id: 'news-3', slug: 'phishing-rising-2025-cyber-awareness', title: 'Phishing attacks rise sharply in 2025: is your team ready?',
    excerpt: 'Reports show a sharp increase in phishing and business email compromise. Effective awareness training is your first line of defence.',
    content: 'Cyber security analysts have reported a marked increase in phishing and business email compromise attacks during 2025, with attackers exploiting hybrid working and economic uncertainty. The human firewall remains your strongest control, but only if it is trained and tested.\n\nOur Phishing Awareness and Cyber Security Awareness courses are updated quarterly to reflect the latest tactics. Combined with simulated phishing campaigns, they measurably reduce click rates and increase reporting.\n\nA trained workforce that spots and reports suspicious emails is worth far more than any single technical control. Speak to us about building a layered awareness programme for your organisation.',
    author: 'Michael O’Connor', authorAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg', date: '2025-08-10',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg', category: 'Cyber Security', readTime: '5 min',
  },
  {
    id: 'news-4', slug: 'mental-health-first-aiders-workplace', title: 'Why every workplace needs mental health first aiders',
    excerpt: 'Mental health first aiders are a proven, low-cost intervention. We explain the role and how to implement it.',
    content: 'Mental ill health is the leading cause of long-term sickness absence in the UK, yet many workplaces still lack trained mental health first aiders. The role is not about diagnosis or treatment; it is about early recognition, supportive conversation and signposting to professional help.\n\nOur Mental Health First Aid course teaches the ALGEE action plan and covers depression, anxiety and crisis response. Graduates tell us it gives them the confidence to have conversations that genuinely change lives.\n\nPairing mental health first aiders with a clear wellbeing policy and visible leadership support creates a culture where people feel safe to ask for help. That is good for people and good for business.',
    author: 'Sarah Bennett', authorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', date: '2025-07-22',
    image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg', category: 'Wellbeing', readTime: '5 min',
  },
  {
    id: 'news-5', slug: 'fire-safety-order-2025-updates', title: 'Fire safety in 2025: key updates to the Fire Safety Order',
    excerpt: 'The Regulatory Reform (Fire Safety) Order 2005 has been amended. Here is what has changed and what it means for your training.',
    content: 'Recent amendments to the Regulatory Reform (Fire Safety) Order 2005 have strengthened duties around fire risk assessment, recording and competence. In particular, responsible persons must now record fire safety arrangements in far more circumstances than before.\n\nThese changes mean that demonstrable, up-to-date training for staff and fire wardens is more important than ever. Our Fire Safety Awareness and Fire Warden Training courses have been updated to reflect the new requirements and include the latest guidance.\n\nIf you are unsure whether your current arrangements are compliant, our consultants can help you review your risk assessment and training records.',
    author: 'James Whitfield', authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', date: '2025-06-30',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg', category: 'Fire Safety', readTime: '4 min',
  },
  {
    id: 'news-6', slug: 'lms-buying-guide-2025', title: 'How to choose the right LMS for compliance training in 2025',
    excerpt: 'A practical guide to selecting a learning management system that actually supports compliance, not just course delivery.',
    content: 'Choosing a learning management system for compliance training is a different exercise to choosing one for general learning. You need robust reporting, evidence trails, expiry tracking and the ability to assign and reassign courses quickly.\n\nIn this guide we cover the must-have features for a compliance LMS: verifiable certificates, automated reminders, audit-ready reporting, role-based assignment and integration with your HR system. We also explain where generic LMS platforms fall short.\n\nWhether you are buying for the first time or replacing an underused system, our checklist will help you ask the right questions and avoid costly mistakes.',
    author: 'Marcus Fitzpatrick', authorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', date: '2025-05-18',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', category: 'LMS', readTime: '7 min',
  },
];

/* ============================================================
 *  PRICING_PLANS — 3 plans
 * ============================================================ */
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-1', name: 'Individual', price: 25, period: 'per course', description: 'Perfect for individuals who need compliance certification for their own CPD and career.',
    features: ['Access to a single course for 12 months', 'Instant CPD certificate on completion', 'Verifiable certificate ID', 'Mobile-friendly learning', 'Progress tracking', 'Email support'], popular: false, cta: 'Browse Courses',
  },
  {
    id: 'plan-2', name: 'Team / Business', price: 12, period: 'per user / month', description: 'For teams and businesses that need to train, track and report on multiple staff.',
    features: ['Full course catalogue access', 'Management dashboard', 'Bulk enrolment and team assignment', 'Audit-ready reporting', 'Automated expiry reminders', 'Volume discounts from 5 users', 'Priority email support'], popular: true, cta: 'Start Free Trial',
  },
  {
    id: 'plan-3', name: 'Enterprise', price: 0, period: 'custom', description: 'For larger organisations needing SSO, API access and a tailored compliance programme.',
    features: ['Everything in Team / Business', 'Single sign-on (SSO)', 'API and HRIS integration', 'Custom learning paths', 'Dedicated account manager', 'Custom branding and certificates', 'SLA and phone support', 'Onboarding and consultancy'], popular: false, cta: 'Contact Sales',
  },
];

/* ============================================================
 *  COUPONS — promotional codes
 * ============================================================ */
export const COUPONS: Coupon[] = [
  { code: 'EQMS25', discountType: 'percentage', discountValue: 25, description: '25% off your entire order. Limited time offer for new customers.', active: true, usageLimit: 1000, usedCount: 312 },
  { code: 'WELCOME10', discountType: 'percentage', discountValue: 10, description: '10% off your first purchase as a welcome to EQMS Training.', active: true, usageLimit: 5000, usedCount: 1840 },
  { code: 'TEAM15', discountType: 'percentage', discountValue: 15, minLicences: 5, description: '15% off team purchases of five or more licences.', active: true, usageLimit: 2000, usedCount: 645 },
];

/* ============================================================
 *  DEMO_USERS — 4 demo accounts
 * ============================================================ */
export const DEMO_USERS: User[] = [
  {
    id: 'user-1', email: 'learner@eqms.demo', password: 'demo123', firstName: 'Olivia', lastName: 'Bennett', role: 'learner',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg', phone: '07700 900123', company: 'Meridian Construction Ltd', companySize: '50-200', sector: 'Construction', jobTitle: 'Site Supervisor', address: '14 Quarry Road', city: 'Leeds', postcode: 'LS6 1AB',
    createdAt: '2025-01-15T09:30:00Z', emailVerified: true,
    notificationPrefs: { courseUpdates: true, assignments: true, reminders: true, marketing: false },
  },
  {
    id: 'user-2', email: 'admin@eqms.demo', password: 'demo123', firstName: 'Rebecca', lastName: 'Holloway', role: 'org_admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', phone: '07700 900456', company: 'Meridian Construction Ltd', companySize: '50-200', sector: 'Construction', jobTitle: 'Health & Safety Manager', address: '14 Quarry Road', city: 'Leeds', postcode: 'LS6 1AB',
    createdAt: '2024-11-04T08:00:00Z', emailVerified: true,
    notificationPrefs: { courseUpdates: true, assignments: true, reminders: true, marketing: false },
  },
  {
    id: 'user-3', email: 'instructor@eqms.demo', password: 'demo123', firstName: 'James', lastName: 'Whitfield', role: 'instructor',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', phone: '07700 900789', company: 'EQMS Training', companySize: '10-50', sector: 'Education', jobTitle: 'Lead Health & Safety Consultant', address: '2 Kingsway', city: 'Birmingham', postcode: 'B15 2TT',
    createdAt: '2024-06-01T10:00:00Z', emailVerified: true,
    notificationPrefs: { courseUpdates: true, assignments: true, reminders: true, marketing: true },
  },
  {
    id: 'user-4', email: 'superadmin@eqms.demo', password: 'demo123', firstName: 'Marcus', lastName: 'Fitzpatrick', role: 'super_admin',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', phone: '07700 900999', company: 'EQMS Training', companySize: '10-50', sector: 'Education', jobTitle: 'Platform Administrator', address: '2 Kingsway', city: 'Birmingham', postcode: 'B15 2TT',
    createdAt: '2024-01-01T00:00:00Z', emailVerified: true,
    notificationPrefs: { courseUpdates: true, assignments: true, reminders: true, marketing: false },
  },
];

/* ============================================================
 *  ORG_EMPLOYEES — 25 employees for the org admin demo
 * ============================================================ */
const firstNames = ['Oliver', 'Charlotte', 'Daniel', 'Emma', 'George', 'Isabella', 'Harry', 'Sophie', 'Jack', 'Mia', 'Charlie', 'Amelia', 'Jacob', 'Olivia', 'Noah', 'Ava', 'Henry', 'Isla', 'Leo', 'Zara', 'Arthur', 'Grace', 'Muhammad', 'Lily', 'Oscar'];
const lastNames = ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Robinson', 'Wright', 'Thompson', 'Evans', 'Walker', 'White', 'Roberts', 'Green', 'Hall', 'Wood', 'Jackson', 'Clarke', 'Patel', 'Khan', 'Lewis', 'Lee', 'Young'];
const departments = ['Operations', 'Finance', 'IT', 'HR'];
const courseIds = ['crs-1', 'crs-4', 'crs-5', 'crs-11', 'crs-13', 'crs-16', 'crs-20', 'crs-24'];
const statuses = ['completed', 'in_progress', 'not_started'] as const;

export const ORG_EMPLOYEES: Employee[] = Array.from({ length: 25 }, (_, i) => {
  const dept = departments[i % 4];
  const assigned = [courseIds[i % courseIds.length], courseIds[(i + 3) % courseIds.length], courseIds[(i + 5) % courseIds.length]];
  const status = statuses[i % 3];
  const completed = status === 'completed' ? [courseIds[i % courseIds.length]] : [];
  return {
    id: `emp-${i + 1}`,
    orgId: 'user-2',
    firstName: firstNames[i],
    lastName: lastNames[i],
    email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@meridianconstruction.co.uk`,
    department: dept,
    group: `${dept} Team A`,
    site: i % 2 === 0 ? 'Leeds HQ' : 'Manchester Depot',
    status: 'active',
    assignedCourses: assigned,
    completedCourses: completed,
    joinedAt: `2024-${String((i % 12) + 1).padStart(2, '0')}-15T00:00:00Z`,
  };
});

/* ============================================================
 *  REVIEWS — 24 reviews across various courses
 * ============================================================ */
const reviewTemplates = [
  { title: 'Excellent, practical course', comment: 'Really well-structured with clear examples I could apply at work the next day. The final assessment was fair and the certificate arrived instantly.' },
  { title: 'Clear and engaging', comment: 'I have taken a few compliance courses over the years and this was by far the most engaging. The video lessons break up the reading nicely.' },
  { title: 'Great value for money', comment: 'Comprehensive content at a fair price. I liked being able to pause and resume on my phone during my commute.' },
  { title: 'Exactly what I needed', comment: 'Covered all the essentials without padding. The quiz questions made me think and the explanations helped me learn from mistakes.' },
  { title: 'Good refresher', comment: 'Used this as an annual refresher and it was perfect. Updated content reflected recent changes in the law.' },
  { title: 'Thorough and well-paced', comment: 'The modules build logically and the progress tracking kept me motivated. Finished it over three lunch breaks.' },
  { title: 'Highly recommend', comment: 'Our whole team completed this and everyone found it useful. The management dashboard made assigning and tracking simple.' },
  { title: 'Informative and accessible', comment: 'Plain English throughout, no jargon for the sake of it. The reading resources are handy to keep for reference.' },
];

export const REVIEWS: Review[] = Array.from({ length: 24 }, (_, i) => {
  const course = COURSES[i % COURSES.length];
  const tmpl = reviewTemplates[i % reviewTemplates.length];
  const user = DEMO_USERS[i % DEMO_USERS.length];
  return {
    id: `rev-${i + 1}`,
    courseId: course.id,
    userId: `rev-user-${i + 1}`,
    userName: `${firstNames[i]} ${lastNames[i]}`,
    userAvatar: i % 2 === 0 ? 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg' : 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    rating: 4 + (i % 2),
    title: tmpl.title,
    comment: tmpl.comment,
    date: `2025-${String((i % 9) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    verified: true,
  };
});

/* Re-export assets for convenience so consumers can import from a single module. */
export { ASSETS };
