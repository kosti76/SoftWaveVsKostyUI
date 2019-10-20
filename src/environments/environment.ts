// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  // adalConfig: {
  //   clientId: "27b14e6b-6405-442d-9a77-0bd119ce6524",
  //   tenant: "a785ac24-6d42-4a00-9bc8-5c70ce550cc1",
  //   validateAuthority: true,
  //   authority: "https://login.microsoftonline.com/a785ac24-6d42-4a00-9bc8-5c70ce550cc1/",
  //   cacheLocation: "localStorage",
  //   navigateToLoginRequestUrl: true,
  //   popUp: true,    
  //   isAngular: true,
  //   piiLoggingEnabled: true,
  //   redirectUri: "http://localhost:4200/data",
  //   postLogoutRedirectUri: "http://localhost:4200/",
  //   scope: "api://7c5b71ec-0e08-43bc-9204-c2f3c4b9afe7/api-access",
  //   graphscope: "user.read"
  // },
  adalConfig: {
    clientId: "f66ae71d-a041-49d6-9292-9f8cd685e095",
    tenant: "a785ac24-6d42-4a00-9bc8-5c70ce550cc1",
    validateAuthority: true,
    authority: "https://login.microsoftonline.com/a785ac24-6d42-4a00-9bc8-5c70ce550cc1",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: true,
    popUp: true,    
    isAngular: true,
    piiLoggingEnabled: true,
    redirectUri: "http://localhost:4200",
    postLogoutRedirectUri: "http://localhost:4200",
    scope: "api://9bd180a1-9bd9-470d-ab71-10fe74c29078/api-access",
    graphscope: "user.read"
  },
  apiBaseUrl: "https://localhost/",
  graphApiUrl: "https://graph.microsoft.com/"
};
