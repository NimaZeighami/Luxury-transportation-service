import { DatePicker, TimePicker } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const ServiceRequest = () => {
  const [luxuryservice, setLuxuryService] = useState("Luxury Service1");
  const [numberOfPassengers, setNumberOfPassengers] = useState();
  const [numberOfPassengerBags, setNumberOfPassengerBags] = useState();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [dateOfTrip, setDateOfTrip] = useState();
  const [timeOfTrip, setTimeOfTrip] = useState();
  const [description, setDescription] = useState();

  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    libraries: ["places"],
  });
  console.log("Google Auto Complete is Working ?! :", isLoaded);
  console.log("API-Key:", process.env.REACT_APP_GOOGLEMAPS_API_KEY);

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const phoneNumber = localStorage.getItem("phoneNumber");

  const handleServiceRequset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://dignitylimo.com/users/requests.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            action: "fast",
            passenger_name: `${firstName} ${lastName}`,
            passenger_email: email,
            passenger_phonenumber: phoneNumber,
            number_of_passengers: numberOfPassengers,
            number_of_passenger_bags: numberOfPassengerBags,
            trip_origin: origin,
            trip_destination: destination,
            trip_date: dateOfTrip,
            trip_time: timeOfTrip,
            trip_description: description,
            trip_luxury_service: luxuryservice,
          }),
        }
      );
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      const data = await response.json();
      console.log("DATA:", data)
      localStorage.setItem("requestNumber", data.data[0]);
      window.location.replace("successful-request");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOriginOnPlacesChanged = () => {
    const originAddress = originRef.current.getPlaces();
    if (originAddress && originAddress.length > 0) {
      const formattedOrigin = originAddress[0].formatted_address;
      setOrigin(formattedOrigin);
      console.log("Origin Address:", formattedOrigin);
    }
  };

  const handleDestinationOnPlacesChanged = () => {
    const destinationAddress = destinationRef.current.getPlaces();
    if (destinationAddress && destinationAddress.length > 0) {
      const formattedDestination = destinationAddress[0].formatted_address;
      setDestination(formattedDestination);
      console.log("Destination Address:", formattedDestination);
    }
  };

  return (
    <div>
      <div className="bg-red-500 min-h-screen flex items-center">
        <div className="w-full">
          <h2 className="text-center text-white font-bold text-2xl uppercase mb-10">
            Fill out our form
          </h2>
          <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form action="">
              {isLoaded ? (
                <div className="mb-2">
                  <label
                    htmlFor="origin"
                    className="block mb-2 font-bold text-gray-600"
                  >
                    Origin
                  </label>
                  <StandaloneSearchBox
                    onLoad={(ref) => (originRef.current = ref)}
                    onPlacesChanged={handleOriginOnPlacesChanged}
                  >
                    <input
                      type="text"
                      id="origin"
                      name="origin"
                      placeholder="Put in your Origin."
                      className="border border-gray-300 shadow p-3 w-full rounded mb-1"
                    />
                  </StandaloneSearchBox>
                </div>
              ) : (
                <h1 className="text-red-500">
                  Google Web Service doesn't work !! call support
                </h1>
              )}
              {isLoaded ? (
                <div className="mb-2">
                  <label
                    htmlFor="destination"
                    className="block mb-2 font-bold text-gray-600"
                  >
                    Destination
                  </label>
                  <StandaloneSearchBox
                    onLoad={(ref) => (destinationRef.current = ref)}
                    onPlacesChanged={handleDestinationOnPlacesChanged}
                  >
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      placeholder="Put in your Destination."
                      className="border border-gray-300 shadow p-3 w-full rounded mb-1"
                    />
                  </StandaloneSearchBox>
                </div>
              ) : (
                <h1 className="text-red-500">
                  Google Web Service doesn't work !! call support
                </h1>
              )}

              <div className="mb-2">
                <label htmlFor="date" className="block mb-2 font-bold text-gray-600">
                  Date
                </label>
                <DatePicker
                  id="date"
                  className="border border-gray-300 shadow p-3 w-full rounded mb-1 "
                  placeholder="Put in your Date"
                  onChange={(date, dateString) => setDateOfTrip(dateString)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="time" className="block mb-2 font-bold text-gray-600">
                  Time
                </label>
                <TimePicker
                  format="HH:mm"
                  id="time"
                  className="border border-gray-300 shadow p-3 w-full rounded mb-1 "
                  placeholder="Put in your Time"
                  onChange={(time, timeString) => setTimeOfTrip(timeString)}
                />
              </div>

              <label
                htmlFor="passengerNumber"
                className="block w-full bg-red-500 text-white text-center font-bold p-4 rounded-lg"
              >
                Next
              </label>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-black min-h-screen flex items-center">
        <div className="w-full">
          <h2 className="text-center text-white font-bold text-2xl uppercase mb-10">
            Submit the Form
          </h2>
          <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form action="">
              <div className="mb-2">
                <label
                  htmlFor="passengerNumber"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Passenger Number
                </label>
                <input
                  type="number"
                  id="passengerNumber"
                  name="passengerNumber"
                  placeholder="Put in your Passenger Number."
                  className="border border-gray-300 shadow p-3 w-full rounded mb-1"
                  onChange={(e) => setNumberOfPassengers(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="baggageNumber"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Baggage Number
                </label>
                <input
                  type="number"
                  id="baggageNumber"
                  name="baggageNumber"
                  placeholder="Put in your Baggage Number."
                  className="border border-gray-300 shadow p-3 w-full rounded mb-1"
                  onChange={(e) => setNumberOfPassengerBags(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="additionalRequest"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Additional Request
                </label>
                <textarea
                  id="additionalRequest"
                  name="additionalRequest"
                  placeholder="Put in your Additional Request."
                  className="border border-gray-300 shadow p-3 w-full rounded mb-1"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="luxuryService"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Luxury Service
                </label>
                <select
                  value={luxuryservice}
                  id="luxuryService"
                  onChange={(e) => setLuxuryService(e.target.value)}
                  className="border border-gray-300 shadow p-3 w-full rounded mb-1"
                >
                  <option value="Luxury Service1">Luxury Service1</option>
                  <option value="Luxury Service2">Luxury Service2</option>
                  <option value="Luxury Service3">Luxury Service3</option>
                </select>
              </div>

              <button
                className="w-full bg-red-500 text-white font-bold py-4 rounded-lg"
                onClick={handleServiceRequset}
              >
                Submit Form
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequest;
