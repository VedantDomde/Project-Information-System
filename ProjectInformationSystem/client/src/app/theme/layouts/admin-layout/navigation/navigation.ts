export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [

      {
        id: 'default',
        title: 'Project Search',
        type: 'item',
        classes: 'nav-item',
        url: '/project-search',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Project Master',
        type: 'item',
        classes: 'nav-item',
        url: '/project-master',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Project Perspective',
        type: 'item',
        classes: 'nav-item',
        url: 'project-perspective',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Project Phases',
        type: 'item',
        classes: 'nav-item',
        url: 'project-phases',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Project Funds',
        type: 'item',
        classes: 'nav-item',
        url: 'project-funds',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Project Locations',
        type: 'item',
        classes: 'nav-item',
        url: 'project-location',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Project Correspondence',
        type: 'item',
        classes: 'nav-item',
        url: 'project-correspondence',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Project Directions',
        type: 'item',
        classes: 'nav-item',
        url: 'project-directions',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Project Expenditure',
        type: 'item',
        classes: 'nav-item',
        url: 'project-expenditure',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Time Limit Extension',
        type: 'item',
        classes: 'nav-item',
        url: 'time-limit-extension',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Project Progress',
        type: 'item',
        classes: 'nav-item',
        url: 'project-progress',
        icon: 'dashboard',
        breadcrumbs: false
      },
    ]
  },
  {
    id: 'dashboard',
    title: 'Masters',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Phase Master',
        type: 'item',
        classes: 'nav-item',
        url: 'phase-master',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'Technical Personnal',
        type: 'item',
        classes: 'nav-item',
        url: 'technical-personnal',
        icon: 'dashboard',
        breadcrumbs: false
      },
      
    ]
  },
];
