import Joi from "joi";
import { http } from "../httpService";
import { baseURL } from "../../constants/config";
import { showFailureToaster, showSuccessToaster } from "../../utils/toaster";

const parkingApiEndpoint = baseURL + "parking-areas";

const parkingAreaSchema = Joi.object({
  name: Joi.string().min(2).max(128).required(),
  belongsTo: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  totalSlots: Joi.number().min(1).max(99999999999).required(),
  type: Joi.string().min(2).max(10).required(),
  // bookedSlots: Joi.number().min(0).max(99999999999),
  // locationId: Joi.string()
  //   .regex(/^[0-9a-fA-F]{24}$/)
  //   .required(),
});

async function addParkingArea(parkingArea) {
  try {
    await http.post(parkingApiEndpoint, { ...parkingArea });
    showSuccessToaster("Successfuly created new parking area!");
    return true;
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

// parkingAreaId is acting as query strign params, it will be automatically applied if provided
async function getParkingAreas(queryParams = "") {
  try {
    // let endpoint = ;
    // if (queryParams="") endpoint += "?";
    // if (queryParams="") endpoint += "?_id=" + queryParams="";

    return await http.get(parkingApiEndpoint + queryParams);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

export const parkingAreaService = {
  parkingAreaSchema,
  addParkingArea,
  getParkingAreas,
};
