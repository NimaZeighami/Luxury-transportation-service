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
  console.log("Google Auto Compelete is Working ?! :", isLoaded);
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
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("requestNumber", data.data[0]);
      }
    } catch (error) {
      console.log("user or password is incorrect");
    }
    // navigate("dashboard/passenger/successful-request", { replace: true });
    window.location.replace("successful-request");
  };
  const handleOriginOnPlacesChanged = () => {
    let originAddress = originRef.current.getPlaces();
    console.log("originAddress", originAddress);
  };
  const handleDestinationOnPlacesChanged = () => {
    let destinationAddress = destinationRef.current.getPlaces();
    console.log("destinationAddress", destinationAddress);
  };
  return (
    <div>
      {/* <div class="bg-red-800 min-h-screen flex items-center">
        <div class="w-full">
          <h2 class="text-center text-white font-bold text-2xl uppercase mb-10">
            Fill out our form
          </h2>
          <div class="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form action="">
              <div class="mb-3">
                <label for="name" class="block mb-2 font-bold text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Put in your fullname."
                  class="border border-gray-300 shadow p-3 w-full rounded mb-1"
                />
              </div>

              <div class="mb-3">
                <label for="email" class="block mb-2 font-bold text-gray-600">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Put in your Email."
                  class="border border-red-300 shadow p-3 w-full rounded mb-1"
                />
                <p class="text-sm text-red-400 mt-2">This field is required</p>
              </div>

              <div class="mb-3">
                <label
                  for="phoneNumber"
                  class="block mb-2 font-bold text-gray-600"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Put in your phoneNumber."
                  class="border border-red-300 shadow p-3 w-full rounded mb-1"
                />
                <p class="text-sm text-red-400 mt-2">This field is required</p>
              </div>

              <button class="block w-full bg-red-500 text-white font-bold p-4 rounded-lg">
                Next
              </button>
            </form>
          </div>
        </div>
      </div> */}
      <div class="bg-red-500 min-h-screen flex items-center">
        <div class="w-full">
          <h2 class="text-center text-white font-bold text-2xl uppercase mb-10">
            Fill out our form
          </h2>
          <div class="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form action="">
              {isLoaded ? (
                <div class="mb-2">
                  <label
                    for="origin"
                    class="block mb-2 font-bold text-gray-600"
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
                      class="border border-gray-300 shadow p-3 w-full rounded mb-1"
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </StandaloneSearchBox>
                </div>
              ) : (
                <h1 className="text-red-500">
                  Google Web Service doesn't work !! call support
                </h1>
              )}
              {isLoaded ? (
                <div class="mb-2">
                  <label
                    for="destination"
                    class="block mb-2 font-bold text-gray-600"
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
                      class="border border-gray-300 shadow p-3 w-full rounded mb-1"
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </StandaloneSearchBox>
                </div>
              ) : (
                <h1 className="text-red-500">
                  Google Web Service doesn't work !! call support
                </h1>
              )}

              <div class="mb-2">
                <label for="date" class="block mb-2 font-bold text-gray-600">
                  Date
                </label>
                <DatePicker
                  id="date"
                  className="border border-gray-300 shadow p-3 w-full rounded mb-1 "
                  placeholder="Put in your Date"
                  onChange={(date, dateString) => setDateOfTrip(dateString)}
                />
              </div>
              <div class="mb-2">
                <label for="time" class="block mb-2 font-bold text-gray-600">
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
                for="passengerNumber"
                class="block w-full bg-red-500 text-white text-center font-bold p-4 rounded-lg"
              >
                Next
              </label>
            </form>
          </div>
        </div>
      </div>
      <div class="bg-black min-h-screen flex items-center">
        <div class="w-full">
          <h2 class="text-center text-white font-bold text-2xl uppercase mb-10">
            Submit the Form
          </h2>
          <div class="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form action="">
              <div class="mb-2">
                <label
                  for="passengerNumber"
                  class="block mb-2 font-bold text-gray-600"
                >
                  Passenger Number
                </label>
                <input
                  type="number"
                  id="passengerNumber"
                  name="passengerNumber"
                  placeholder="Put in your Passenger Number."
                  class="border border-gray-300 shadow p-3 w-full rounded mb-1"
                  onChange={(e) => setNumberOfPassengers(e.target.value)}
                />
              </div>
              <div class="mb-2">
                <label
                  for="baggageNumber"
                  class="block mb-2 font-bold text-gray-600"
                >
                  Baggage Number
                </label>
                <input
                  type="number"
                  id="baggageNumber"
                  name="baggageNumber"
                  placeholder="Put in your Baggage Number."
                  class="border border-gray-300 shadow p-3 w-full rounded mb-1"
                  onChange={(e) => setNumberOfPassengerBags(e.target.value)}
                />
              </div>
              <div class="mb-2">
                <label
                  for="additionalRequest"
                  class="block mb-2 font-bold text-gray-600"
                >
                  Additional Request
                </label>
                <textarea
                  id="additionalRequest"
                  name="additionalRequest"
                  placeholder="Put in your Additional Request."
                  class="border border-gray-300 shadow p-3 w-full rounded mb-1"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label
                  for="luxuryService"
                  class="block mb-2 font-bold text-gray-600"
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
                class="block w-full bg-red-500 text-white font-bold p-4 rounded-lg"
                onClick={handleServiceRequset}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequest;
