/**
 * FAQ content. Every answer is a statement about how the academy operates,
 * not a statistic. Keep it that way.
 */

export type Faq = { id: number; question: string; answer: string };

export const HOME_FAQS: Faq[] = [
  {
    id: 1,
    question: "What happens in the free trial class?",
    answer:
      "Thirty minutes, one-to-one, with the teacher who would actually teach your lessons. The teacher listens to where the student is, tries a short piece of teaching, and then you receive a written recommendation: which course to start, how many lessons a week, and what the first month would cover. No card details are taken.",
  },
  {
    id: 2,
    question: "Is this a new online-only academy?",
    answer:
      "No. As-Sabuur has taught Qur'an in person for years; the online programme is an extension of that same teaching, not a separate venture. The teachers, the method and the standards are the ones already used in person. Online lessons simply make them available to families who are not local.",
  },
  {
    id: 3,
    question: "Can I request a male or female teacher?",
    answer:
      "Yes. Tell us your preference when you book the trial and we will match accordingly. For children, we ask parents to state any preference up front so the trial is with the right teacher from the start.",
  },
  {
    id: 4,
    question: "What do we need for a lesson?",
    answer:
      "A stable internet connection, a device with a camera and microphone, and a quiet corner. The teacher shares the Qaida or mushaf page on screen, so nothing needs printing. Headphones help younger children concentrate.",
  },
  {
    id: 5,
    question: "Can a parent sit in?",
    answer:
      "Always, and for children under seven we recommend it for the first few lessons. Parents also receive a short monthly note describing what was covered and what to practise.",
  },
  {
    id: 6,
    question: "How can I find out the current lesson fees?",
    answer:
      "Contact the academy with the course you are considering and the learner’s preferred schedule. We will share the current fee information and explain the available arrangements before you decide.",
  },
  {
    id: 7,
    question: "What time zones do you teach across?",
    answer:
      "Lessons are scheduled in your local time. We teach families across North America, the UK, Europe, the Gulf, Australia and beyond, and the booking form asks for your time zone so the trial is offered at a sensible hour.",
  },
];

export const PRICING_FAQS: Faq[] = [
  {
    id: 1,
    question: "How are lesson fees determined?",
    answer:
      "Contact the academy to discuss the learner’s goals, lesson length and preferred weekly schedule. We will share the current fee information directly.",
  },
  {
    id: 2,
    question: "Where can I see the current fees?",
    answer:
      "The website does not publish unconfirmed package amounts. Please contact the academy for current fee information before making a decision.",
  },
  {
    id: 3,
    question: "Can siblings learn at the same time?",
    answer:
      "Ask the academy about suitable arrangements for siblings. The teaching format and lesson plan should suit each learner’s level and needs.",
  },
  {
    id: 4,
    question: "What if we miss a lesson?",
    answer:
      "With notice, missed lessons are made up within the same month. Lessons cancelled without notice are not carried over. The full policy is in the terms.",
  },
  {
    id: 5,
    question: "Are there family or prepayment discounts?",
    answer:
      "Please ask the academy about any current family or prepayment arrangements when requesting fee information.",
  },
];
