// Configuration file for environment variables
// This provides a centralized place to access all environment variables

const config = {
  // Twilio Configuration
  twilio: {
    accountSid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    authToken: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
    fromNumber: process.env.REACT_APP_TWILIO_FROM_NUMBER,
    toNumber: process.env.REACT_APP_TWILIO_TO_NUMBER,
  },
  
  // RapidAPI Configuration
  rapidApi: {
    key: process.env.REACT_APP_RAPIDAPI_KEY,
    weatherHost: process.env.REACT_APP_RAPIDAPI_WEATHER_HOST || 'open-weather13.p.rapidapi.com',
    citiesHost: process.env.REACT_APP_RAPIDAPI_CITIES_HOST || 'country-state-city-search-rest-api.p.rapidapi.com',
  },
  
  // Default Settings
  defaults: {
    countryCode: process.env.REACT_APP_DEFAULT_COUNTRY_CODE || 'IN',
  },
  
  // Check if all required environment variables are set
  isConfigured: () => {
    const required = [
      config.twilio.accountSid,
      config.twilio.authToken,
      config.twilio.fromNumber,
      config.twilio.toNumber,
      config.rapidApi.key,
    ];
    
    return required.every(value => value && value !== '');
  },
  
  // Get missing configuration warnings
  getMissingConfigs: () => {
    const missing = [];
    
    if (!config.twilio.accountSid) missing.push('REACT_APP_TWILIO_ACCOUNT_SID');
    if (!config.twilio.authToken) missing.push('REACT_APP_TWILIO_AUTH_TOKEN');
    if (!config.twilio.fromNumber) missing.push('REACT_APP_TWILIO_FROM_NUMBER');
    if (!config.twilio.toNumber) missing.push('REACT_APP_TWILIO_TO_NUMBER');
    if (!config.rapidApi.key) missing.push('REACT_APP_RAPIDAPI_KEY');
    
    return missing;
  }
};

export default config;