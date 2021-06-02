angular.module("meanRacing").factory("AuthFactory", AuthFactory);

function AuthFactory() {
  const auth = { isLoggedIn: false };
  return {
    auth: auth,
  };
}
