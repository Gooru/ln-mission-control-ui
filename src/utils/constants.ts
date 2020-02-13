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
  },
  {
    labelKey: 'collection',
    type: 'collection',
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
  },
  {
    labelKey: 'question',
    type: 'question',
  },
  {
    labelKey: 'lesson',
    type: 'lesson',
  },
  {
    labelKey: 'unit',
    type: 'unit',
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
  'matrix',
  'competency-map',
  'tree',
  'crosswalk',
  'learning-map',
];

export const GOORU_DEFAULT_STANDARD = 'GDF';

export const GOORU_DEFAULT_FRAMEWORK = 'GDT';

export const MICRO_COMPETENCY_CODE_TYPES: any = [
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
