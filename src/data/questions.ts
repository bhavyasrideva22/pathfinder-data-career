import { Question } from '@/types/assessment';

export const psychometricQuestions: Question[] = [
  {
    id: 'psych_1',
    type: 'likert',
    question: 'I am curious about how companies manage and store massive amounts of data.',
    category: 'psychometric',
    subcategory: 'interest',
    weight: 1.0
  },
  {
    id: 'psych_2',
    type: 'likert',
    question: 'The idea of building systems that move and clean data sounds exciting.',
    category: 'psychometric',
    subcategory: 'interest',
    weight: 1.0
  },
  {
    id: 'psych_3',
    type: 'likert',
    question: 'I prefer working with abstract, logical systems rather than face-to-face interactions.',
    category: 'psychometric',
    subcategory: 'personality',
    weight: 0.8
  },
  {
    id: 'psych_4',
    type: 'likert',
    question: 'I enjoy solving complex problems that require attention to detail.',
    category: 'psychometric',
    subcategory: 'personality',
    weight: 1.2
  },
  {
    id: 'psych_5',
    type: 'likert',
    question: 'I am comfortable learning new technologies even when they seem difficult at first.',
    category: 'psychometric',
    subcategory: 'growth_mindset',
    weight: 1.1
  },
  {
    id: 'psych_6',
    type: 'likert',
    question: 'I can work independently for long periods without getting bored.',
    category: 'psychometric',
    subcategory: 'work_style',
    weight: 0.9
  },
  {
    id: 'psych_7',
    type: 'likert',
    question: 'I am motivated more by mastering skills than by external rewards.',
    category: 'psychometric',
    subcategory: 'motivation',
    weight: 1.0
  },
  {
    id: 'psych_8',
    type: 'likert',
    question: 'I persist through challenging problems even when progress is slow.',
    category: 'psychometric',
    subcategory: 'grit',
    weight: 1.3
  }
];

export const technicalQuestions: Question[] = [
  {
    id: 'tech_1',
    type: 'multiple-choice',
    question: 'What is Hadoop primarily used for?',
    options: [
      'Web development',
      'Storing and processing large datasets across distributed systems',
      'Creating mobile applications',
      'Database administration'
    ],
    category: 'technical',
    subcategory: 'domain_knowledge',
    weight: 1.0
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    question: 'What is the main difference between ETL and ELT?',
    options: [
      'ETL transforms data before loading, ELT loads data before transforming',
      'ETL is faster than ELT',
      'ETL is only for small datasets',
      'There is no difference'
    ],
    category: 'technical',
    subcategory: 'domain_knowledge',
    weight: 1.2
  },
  {
    id: 'tech_3',
    type: 'multiple-choice',
    question: 'In a distributed system, what is a key challenge?',
    options: [
      'Single point of failure',
      'Data consistency across nodes',
      'Limited storage capacity',
      'Slow processing speed'
    ],
    category: 'technical',
    subcategory: 'systems',
    weight: 1.1
  },
  {
    id: 'tech_4',
    type: 'multiple-choice',
    question: 'Which Python data structure would you use to store key-value pairs?',
    options: [
      'List',
      'Tuple',
      'Dictionary',
      'Set'
    ],
    category: 'technical',
    subcategory: 'programming',
    weight: 0.8
  },
  {
    id: 'tech_5',
    type: 'multiple-choice',
    question: 'What is Apache Spark primarily designed for?',
    options: [
      'Web hosting',
      'Fast, large-scale data processing',
      'Email management',
      'File compression'
    ],
    category: 'technical',
    subcategory: 'tools',
    weight: 1.0
  }
];

export const aptitudeQuestions: Question[] = [
  {
    id: 'apt_1',
    type: 'multiple-choice',
    question: 'If a dataset has 1 million rows and you need to process 10% of them, how many rows will you process?',
    options: [
      '10,000',
      '100,000',
      '1,000,000',
      '10,000,000'
    ],
    category: 'aptitude',
    subcategory: 'numerical',
    weight: 0.8
  },
  {
    id: 'apt_2',
    type: 'multiple-choice',
    question: 'What comes next in this sequence: 2, 4, 8, 16, ?',
    options: [
      '24',
      '32',
      '20',
      '18'
    ],
    category: 'aptitude',
    subcategory: 'pattern',
    weight: 1.0
  },
  {
    id: 'apt_3',
    type: 'multiple-choice',
    question: 'If System A processes 100 records per second and System B processes 150 records per second, how long will it take both systems together to process 1000 records?',
    options: [
      '4 seconds',
      '6 seconds',
      '8 seconds',
      '10 seconds'
    ],
    category: 'aptitude',
    subcategory: 'logical',
    weight: 1.1
  }
];

export const allQuestions = [
  ...psychometricQuestions,
  ...technicalQuestions,
  ...aptitudeQuestions
];