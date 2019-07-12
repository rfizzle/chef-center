const settings = {
  appName: 'Chef-Center',
  url: process.env.NODE_ENV === 'production' ? "" : (process.env.URL || "http://localhost:3000"),
  defaultAuthenticatedRoute: '/dashboard',
  defaultUnauthenticatedRoute: '/login',
};

export default settings;