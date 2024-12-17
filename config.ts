
type AppConfig = {
    API_BASE_URL: string;
    URL_WORD_GENERATOR_ENDPOINT: string;
    URL_WORD_VALIDATOR_ENDPOINT: string;
    URL_WORD_CHECKER_ENDPOINT: string;
  };
  
  const config: AppConfig = {
    API_BASE_URL: "http://PC1509:8080/en",
    URL_WORD_GENERATOR_ENDPOINT: "/random-word",
    URL_WORD_VALIDATOR_ENDPOINT: "/validate-guess",
    URL_WORD_CHECKER_ENDPOINT: "/check-guess-against-word",
  };
  
  export default config;
  