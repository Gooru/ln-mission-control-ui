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
    type: 'administrators',
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

export const DEFAULT_IMAGES_PATH: any = {
  profile: '/img/default-images/profile.png',
  partner: '/img/default-images/partner.png',
};
