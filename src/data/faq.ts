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
    question: "How does pricing and cancellation work?",
    answer:
      "Lessons are billed monthly per learner, with no registration fee and no long-term contract. You can stop or pause at the end of any month with notice. Prepaying for three, six or twelve months reduces the monthly rate; family discounts apply to siblings.",
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
    question: "Why is pricing per week rather than per hour?",
    answer:
      "Because that is how learning actually works. Two short lessons a week build far more retention than one long one, so plans are built around frequency. Each card shows the per-lesson rate as well, so you can compare it with any other academy.",
  },
  {
    id: 2,
    question: "Are there any hidden fees?",
    answer:
      "No registration fee, no materials fee, no charge for the trial. The price on the pricing page is the price. Payment processing is not connected to this website yet — enrolment is arranged with the academy directly.",
  },
  {
    id: 3,
    question: "Can siblings share a lesson?",
    answer:
      "Siblings can share a lesson if their level is close enough that neither is held back, but one-to-one teaching is what makes the progress reliable. Most families book separate lessons and take the 10% second-learner discount.",
  },
  {
    id: 4,
    question: "What if we miss a lesson?",
    answer:
      "With notice, missed lessons are made up within the same month. Lessons cancelled without notice are not carried over. The full policy is in the terms.",
  },
  {
    id: 5,
    question: "Do you offer a discount for prepayment?",
    answer:
      "Yes: 5% for three months, 10% for six months, and 15% for twelve months. Prepayment is optional; the monthly rate is the default.",
  },
];
