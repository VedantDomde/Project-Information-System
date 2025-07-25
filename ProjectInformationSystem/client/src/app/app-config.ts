export const AppConfig = {
  apiBaseUrl: 'http://localhost:5000/api',

  endpoints: {
    projectPerspective: {
      add: '/project-perspectiveadd',
      update: '/project-perspectiveUpdate',
      delete: '/project-perspectivedelete',
      getAll: '/project-perspectivegetall', // append `/${projectId}`
    },
    // Add other modules here if needed
    // projectFund: { ... }
  }
};
