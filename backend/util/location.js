const axios = require("axios");

const { googleMapsPlatformAPIKey } = require("../config/keys");
const HttpError = require("../models/http_error");

const getCoordinatesForAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${googleMapsPlatformAPIKey}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
};

exports.getCoordinatesForAddress = getCoordinatesForAddress;
