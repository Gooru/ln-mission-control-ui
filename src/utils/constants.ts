export const NAVIGATION_MENUS = [
  {
    name: 'network',
    path: '/network',
  },
  {
    name: 'competency',
    path: '/competency',
  },
  {
    name: 'catalog',
    path: '/catalog',
  },
  {
    name: 'learners',
    path: '/learners',
  },
  {
    name: 'console',
    path: '/console',
  },
];

export const PARTNERS_TYPE = [
  {
    labelKey: 'tool.providers',
    type: 'tools_providers',
    pathname: 'tool-providers',
    partition: 1,
    showTop3Partners: true,
  },
  {
    labelKey: 'researcher.partners',
    type: 'researchers',
    pathname: 'researchers',
    partition: 1,
    showTop3Partners: true,
  },
  {
    labelKey: 'content.developers',
    type: 'content_developers',
    pathname: 'content-developers',
    partition: 1,
    showTop3Partners: true,
  },
  {
    labelKey: 'administrators',
    type: 'implementation_partners',
    pathname: 'administrators',
    partition: 1,
    showTop3Partners: true,
  },
  {
    labelKey: 'integration.partners',
    type: 'integration_partners',
    pathname: 'integration',
    partition: 2,
    showTop3Partners: true,
  },
  {
    labelKey: 'instructors',
    type: 'implementation_partners',
    pathname: 'instructors',
    partition: 2,
    showTop3Partners: false,
  },
  {
    labelKey: 'learners',
    type: 'learners',
    pathname: 'learners',
    partition: 2,
    showTop3Partners: false,
  },
  {
    labelKey: 'funders',
    type: 'funders',
    pathname: 'funders',
    partition: 2,
    showTop3Partners: true,
  },
];

export const CONTENT_TYPE = [
  {
    labelKey: 'content.assessment',
    type: 'assessment',
  },
  {
    labelKey: 'content.collection',
    type: 'collection',
  },
  {
    labelKey: 'content.resource',
    type: 'resource',
  },
  {
    labelKey: 'content.offline.activity',
    type: 'offline-activity',
  },
  {
    labelKey: 'content.course',
    type: 'course',
  },
  {
    labelKey: 'content.question',
    type: 'question',
  },
];

export const CONTENT_DISTRIBUTION = {
  color: ['#ffffff', '#c5e5d0', '#9ed5b2', '#77c493', '#51b374'],
};

export const CATEGORY_DISTRIBUTION = {
  color: ['#3180c0', '#bad4ea', '#8db8dc', '#5f9cce', '#ffffff'],
};

export const DEFAULT_IMAGES_PATH: any = {
  profile: '/img/default-images/profile.png',
  partner: '/img/default-images/partner.png',
  collection: '/img/default-images/collection-default.png',
  assessment: '/img/default-images/assessment-default.png',
};

// Competency status
export const COMPETENCY_STATUS = [
  'Not Started',
  'In Progress',
  'Mastered (Inferred)',
  'Mastered (Asserted)',
  'Mastered (Earned)',
  'Mastered (Demonstrated)',
];

export const LEARNING_MAP_CONTENT_TYPE = [
  {
    labelKey: 'assessment',
    type: 'assessment',
    isSummaryFooter: true,
    isSummaryFooterSeq: 5,
  },
  {
    labelKey: 'collection',
    type: 'collection',
    isSummaryFooter: true,
    isSummaryFooterSeq: 4,
  },
  {
    labelKey: 'resource',
    type: 'resource',
  },
  {
    labelKey: 'offline activity',
    type: 'offline-activity',
  },
  {
    labelKey: 'course',
    type: 'course',
    isSummaryFooter: true,
    isSummaryFooterSeq: 1,
  },
  {
    labelKey: 'question',
    type: 'question',
  },
  {
    labelKey: 'lesson',
    type: 'lesson',
    isSummaryFooter: true,
    isSummaryFooterSeq: 3,
  },
  {
    labelKey: 'unit',
    type: 'unit',
    isSummaryFooter: true,
    isSummaryFooterSeq: 2,
  },
  {
    labelKey: 'rubric',
    type: 'rubric',
  },
];

export const GRADING_SCALE = [{
  LOWER_LIMIT: 0,
  COLOR: '#F46360',
  RANGE: '0-59',
},
{
  LOWER_LIMIT: 60,
  COLOR: '#ED8E36',
  RANGE: '60-69',
},
{
  LOWER_LIMIT: 70,
  COLOR: '#FABA36',
  RANGE: '70-79',
},
{
  LOWER_LIMIT: 80,
  COLOR: '#A8C99C',
  RANGE: '80-89',
},
{
  LOWER_LIMIT: 90,
  COLOR: '#4B9740',
  RANGE: '90-100',
},
];

export const LEARNER_PREFERENCE_META: any = {
  video: {
    labelKey: 'Video Resources',
    icon: 'video-resource',
  },
  webpage: {
    labelKey: 'Web Based Resources',
    icon: 'website-resource',
  },
  interactive: {
    labelKey: 'Interactive Resources',
    icon: 'interactive-resource',
  },
  image: {
    labelKey: 'Image Resources',
    icon: 'image-resource',
  },
  text: {
    labelKey: 'Text Resources',
    icon: 'text-resource',
  },
  audio: {
    labelKey: 'Audio Resources',
    icon: 'audio-resource',
  },
  project: {
    labelKey: 'Project',
    icon: 'offline-activity-gray',
  },
};

export const COMPETENCY_NAVIGATION_MENUS = [
  'competency-map',
  'tree',
  'crosswalk',
  'learning-map',
];

export const GOORU_DEFAULT_STANDARD = 'GDF';

export const GOORU_DEFAULT_FRAMEWORK = 'GDT';

export const MICRO_COMPETENCY_CODE_TYPES = [
  'learning_target_level_0',
  'learning_target_level_1',
  'learning_target_level_2',
];

export const TAXONOMY_LEVELS = {
  COURSE: 'course',
  DOMAIN: 'domain',
  STANDARD: 'standard',
  MICRO: 'micro-standard',
};

export const LEARNER_MINDSETS_VECTORS = [
  'grit',
  'perseverance',
  'motivation',
  'selfConfidence',
];

export const LEARNER_COMMUNITY_VECTORS = [
  'citizenship',
  'authority',
  'reputation',

];
export const DEMO_USERS = [
  'e062559a-35d2-45e9-85fd-380987dc2fdf',
];


export const ACTIVITY_FILTER = [
  {
    title: 'filter-types.filter-types.21-century-skills',
    code: '21-century-skills',
  },
  {
    title: 'filter-types.filter-types.dok',
    code: 'dok',
  },
  {
    title: 'filter-types.filter-types.license',
    code: 'licenses',
  },
  {
    title: 'filter-types.filter-types.publisher',
    code: 'publisher',
  },
  {
    title: 'filter-types.filter-types.audience',
    code: 'audience',
  },
];

export const DEFAULT_ACTIVITY_FILTERS = [
  {
    title: 'filter-types.category',
    code: 'category',
  },
  {
    title: 'filter-types.subject',
    code: 'subject',
  },
  {
    title: 'filter-types.course',
    code: 'course',
  },
];

export const CATALOG_MENUS = [
  {
    name: 'summary',
    tab: 'SummaryContent',
    key: 'summary',
    isActive: true,
  },
  {
    name: 'courses',
    key: 'course',
    tab: 'ActivityContent',
    apiKey: 'course',
  },
  {
    name: 'collections',
    key: 'collection',
    tab: 'ActivityContent',
    apiKey: 'collection',
  },
  {
    name: 'assessments',
    key: 'assessment',
    tab: 'ActivityContent',
    apiKey: 'collection',
  },
  {
    name: 'offline Activities',
    key: 'offline-activity',
    tab: 'ActivityContent',
    apiKey: 'collection',
  },
  {
    name: 'resources',
    key: 'resource',
    tab: 'ActivityContent',
    apiKey: 'resource',
  },
  {
    name: 'questions',
    key: 'question',
    tab: 'ActivityContent',
    apiKey: 'question',
  },
  {
    name: 'rubrics',
    key: 'rubric',
    tab: 'ActivityContent',
    apiKey: 'rubric',
  },
];

export const DEFAULT_CATALOG_STRING: any = {
  audio_resource: { name: 'Audio', colorCode: '#76C8BC' },
  video_resource: { name: 'Videos', colorCode: '#3EB6A6' },
  interactive_resource: { name: 'Interactive', colorCode: '#76C8BC' },
  image_resource: { name: 'Images', colorCode: '#76C8BC' },
  webpage_resource: { name: 'Webpages', colorCode: '#009A87' },
  text_resource: { name: 'Text', colorCode: '#76C8BC' },
  multiple_choice_question: { name: 'Multiple Choice', colorCode: '#3A434D' },
  multiple_answer_question: { name: 'Multiple Answer', colorCode: '#6E767D' },
  true_false_question: { name: 'True Or False', colorCode: '#93999E' },
  fill_in_the_blank_question: { name: 'Fill In The Blank', colorCode: '#3A434D' },
  hot_spot_image_question: { name: 'Multiple Select - Image', colorCode: '#3A434D' },
  hot_spot_text_question: { name: 'Multiple Select - Text', colorCode: '#93999E' },
  hot_text_highlight_question: { name: 'Highlight Text', colorCode: '#93999E' },
  hot_text_reorder_question: { name: 'Drag And Drop Order', colorCode: '#3A434D' },
  open_ended_question: { name: 'Open Ended', colorCode: '#3A434D' },
};


export const COLORCODE: any = ['#3A434D', '#93999E', '#6E767D'];
