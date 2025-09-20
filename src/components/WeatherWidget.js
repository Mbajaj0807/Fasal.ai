import React, { useState, useEffect } from 'react';
import config from '../utils/config';
import Toast from './Toast';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sendingAlert, setSendingAlert] = useState(false);
  const [toast, setToast] = useState(null);

  // Load saved data on component mount
  useEffect(() => {
    fetchCities();
    
    // Restore saved city and weather from localStorage
    const savedCity = localStorage.getItem('selectedCity');
    const savedWeather = localStorage.getItem('weatherData');
    
    if (savedCity) {
      setSelectedCity(savedCity);
      setSearchTerm(savedCity);
      
      if (savedWeather) {
        try {
          const weatherData = JSON.parse(savedWeather);
          // Check if weather data is not older than 30 minutes
          const timestamp = localStorage.getItem('weatherTimestamp');
          const now = Date.now();
          if (timestamp && (now - parseInt(timestamp)) < 30 * 60 * 1000) {
            setWeather(weatherData);
          }
        } catch (err) {
          console.error('Error parsing saved weather data:', err);
        }
      }
    }
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.city-selector-wrapper')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchCities = async () => {
    try {
      const countryCode = config.defaults.countryCode;
      const response = await fetch(
        `https://${config.rapidApi.citiesHost}/cities-by-countrycode?countrycode=${countryCode}`,
        {
          headers: {
            'x-rapidapi-key': config.rapidApi.key,
            'x-rapidapi-host': config.rapidApi.citiesHost
          }
        }
      );
      const data = await response.json();
      
      console.log('Total cities fetched:', data.length);
      
      // Use all cities returned by the API
      // If the API returns too many cities, you can limit them here
      // For now, we'll use all cities or limit to first 100 for performance
      const allCities = Array.isArray(data) ? data : [];
      
      // Sort cities alphabetically by name for better UX
      const sortedCities = allCities.sort((a, b) => {
        const nameA = a.name || '';
        const nameB = b.name || '';
        return nameA.localeCompare(nameB);
      });
      
      setCities(sortedCities);
      if (sortedCities.length > 0) {
        // Set a default city (you can change this to any preferred city)
        const defaultCity = sortedCities.find(city => city.name === 'Mumbai') || sortedCities[0];
        setSelectedCity(defaultCity.name);
      }
    } catch (err) {
      console.error('Error fetching cities:', err);
      // Fallback to default Indian cities if API fails
      const defaultCities = [
        { name: 'Mumbai' }, { name: 'Delhi' }, { name: 'Bangalore' },
        { name: 'Hyderabad' }, { name: 'Chennai' }, { name: 'Kolkata' },
        { name: 'Pune' }, { name: 'Ahmedabad' }, { name: 'Jaipur' },
        { name: 'Surat' }, { name: 'Lucknow' }, { name: 'Kanpur' },
        { name: 'Nagpur' }, { name: 'Indore' }, { name: 'Bhopal' },
        { name: 'Visakhapatnam' }, { name: 'Patna' }, { name: 'Vadodara' },
        { name: 'Ghaziabad' }, { name: 'Ludhiana' }, { name: 'Agra' },
        { name: 'Nashik' }, { name: 'Faridabad' }, { name: 'Meerut' },
        { name: 'Rajkot' }, { name: 'Varanasi' }, { name: 'Srinagar' },
        { name: 'Aurangabad' }, { name: 'Dhanbad' }, { name: 'Amritsar' }
      ];
      setCities(defaultCities);
      setSelectedCity('Mumbai');
    }
  };

  // Convert Fahrenheit to Celsius
  const fahrenheitToCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5/9).toFixed(1);
  };

  // Show toast notification
  const showToast = (message, type = 'success', duration = 5000) => {
    setToast({ message, type, duration });
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://${config.rapidApi.weatherHost}/city?city=${encodeURIComponent(cityName)}&lang=EN`,
        {
          headers: {
            'x-rapidapi-key': config.rapidApi.key,
            'x-rapidapi-host': config.rapidApi.weatherHost
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      
      // Convert temperatures from Fahrenheit to Celsius
      if (data.main) {
        data.main.temp = fahrenheitToCelsius(data.main.temp);
        data.main.feels_like = fahrenheitToCelsius(data.main.feels_like);
        data.main.temp_min = fahrenheitToCelsius(data.main.temp_min);
        data.main.temp_max = fahrenheitToCelsius(data.main.temp_max);
      }
      
      setWeather(data);
      
      // Save to localStorage
      localStorage.setItem('weatherData', JSON.stringify(data));
      console.log(data)
      localStorage.setItem('weatherTimestamp', Date.now().toString());
      localStorage.setItem('selectedCity', cityName);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Unable to fetch weather data. Please try again.');
      showToast('Unable to fetch weather data. Please try again.', 'error', 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (city) {
      fetchWeather(city);
    }
  };

  const handleSendUpdate = async () => {
    if (weather && selectedCity) {
      setSendingAlert(true);
      try {
        // Prepare the SMS body with weather data
        const smsBody = `${selectedCity}: मौसम ${weather.weather?.[0]?.main || 'N/A'} (${weather.weather?.[0]?.description || 'N/A'}), 🌡 ${weather.main?.temp || 0}°C (महसूस ${weather.main?.feels_like || 0}°C), 💧${weather.main?.humidity || 0}%, 💨${weather.wind?.speed || 0} म/सेक`;
        
        // Get Twilio credentials from config
        const { accountSid, authToken, fromNumber, toNumber } = config.twilio;
        
        // Validate configuration
        if (!config.isConfigured()) {
          const missing = config.getMissingConfigs();
          throw new Error(`Missing configuration: ${missing.join(', ')}. Please check your .env file.`);
        }
        
        // Create the request body
        const formData = new URLSearchParams();
        formData.append('To', toNumber);
        formData.append('From', fromNumber);
        formData.append('Body', smsBody);
        
        // Make the API call to Twilio
        const response = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
          {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          showToast(
            `Weather alert sent successfully to All Farmers!`,
            'success',
            5000
          );
          console.log('SMS sent successfully:', data);
        } else {
          const errorData = await response.json();
          console.error('Twilio error:', errorData);
          showToast(
            `Failed to send alert: ${errorData.message || 'Unknown error'}`,
            'error',
            5000
          );
        }
      } catch (error) {
        console.error('Error sending SMS:', error);
        showToast(
          error.message || 'Failed to send alert. Please try again.',
          'error',
          5000
        );
      } finally {
        setSendingAlert(false);
      }
    } else {
      showToast('Please select a city and wait for weather data to load.', 'warning', 4000);
    }
  };

  // Fetch weather when selectedCity changes and it's not from localStorage
  useEffect(() => {
    if (selectedCity && !weather) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity]);

  const getWeatherIcon = (condition) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Smoke': '🌫️',
      'Haze': '🌫️',
      'Dust': '🌫️',
      'Fog': '🌫️'
    };
    return icons[condition] || '🌤️';
  };

  // Filter cities based on search term
  const filteredCities = cities.filter(city => 
    city.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="weather-widget-container">
      <div className="weather-widget compact">
        <div className="weather-header">
          <h3>🌤️ Weather</h3>
          <div className="city-selector-wrapper">
            <input
              type="text"
              placeholder="Search city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              className="city-search-input"
            />
            {isDropdownOpen && (
              <div className="city-dropdown-list">
                <div className="city-count">Total cities: {filteredCities.length}</div>
                {filteredCities.length > 0 ? (
                  filteredCities.slice(0, 50).map((city, index) => (
                    <div
                      key={index}
                      className={`city-option ${selectedCity === city.name ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedCity(city.name);
                        setSearchTerm(city.name);
                        setIsDropdownOpen(false);
                        fetchWeather(city.name);
                        localStorage.setItem('selectedCity', city.name);
                      }}
                    >
                      {city.name}
                    </div>
                  ))
                ) : (
                  <div className="no-cities">No cities found</div>
                )}
                {filteredCities.length > 50 && (
                  <div className="city-count">Showing first 50 cities...</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="weather-content">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>Error loading weather</p>
            </div>
          )}

          {weather && !loading && !error && (
            <div className="weather-info compact">
              <div className="weather-main-section">
                <div className="weather-temp-group">
                  <span className="weather-icon">
                    {getWeatherIcon(weather.weather?.[0]?.main)}
                  </span>
                  <div>
                    <div className="temperature">
                      {weather.main?.temp || 0}°C
                    </div>
                    <div className="weather-description">
                      {weather.weather?.[0]?.description || 'N/A'}
                    </div>
                  </div>
                </div>
                
                <div className="weather-details compact">
                  <div className="detail-item">
                    <span className="detail-icon">💧</span>
                    <span className="detail-value">{weather.main?.humidity || 0}%</span>
                  </div>
                  <span className="detail-divider"></span>
                  <div className="detail-item">
                    <span className="detail-icon">💨</span>
                    <span className="detail-value">{weather.wind?.speed || 0} m/s</span>
                  </div>
                  <span className="detail-divider"></span>
                  <div className="detail-item">
                    <span className="detail-icon">🌡️</span>
                    <span className="detail-value">{weather.main?.feels_like || 0}°C</span>
                  </div>
                  <span className="detail-divider"></span>
                  <div className="detail-item">
                    <span className="detail-icon">📊</span>
                    <span className="detail-value">{weather.main?.pressure || 0} hPa</span>
                  </div>
                </div>
              </div>
              
              <div className="send-button-compact">
                <button 
                  className="send-alert-btn"
                  onClick={handleSendUpdate}
                  disabled={sendingAlert}
                  title="Send SMS Alert"
                >
                  {sendingAlert ? (
                    <>
                      <div className="btn-spinner"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">📤</span>
                      <span>Send Alert</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {!weather && !loading && !error && (
            <div className="no-data">
              <p>Select a city</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default WeatherWidget;