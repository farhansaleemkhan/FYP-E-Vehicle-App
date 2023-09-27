const Joi = require("joi");
const mongoose = require("mongoose");
const { Vehicle } = require("../vehicle/vehicle");
const { ParkingArea } = require("./parkingArea");

const parkingSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  parkingAreaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingArea",
    required: true,
  },
  parkedTime: {
    type: String,
    default: Date.now,
  },
});

// pre hook for 'save': update the isParked property to true and add 1 to the bookedSlots when parking document is created
parkingSchema.pre("save", async function (next) {
  try {
    await Vehicle.updateOne({ _id: this.vehicleId }, { isParked: true });
    await ParkingArea.updateOne({ _id: this.parkingAreaId }, { $inc: { bookedSlots: 1 } });

    next();
  } catch (error) {
    next(error);
  }
});

// pre hook for 'remove': update the isParked property to false and decrement 1 to the bookedSlots when parking document is deleted
parkingSchema.pre("remove", { document: true }, async function (next) {
  try {
    await Vehicle.updateOne({ _id: this.vehicleId }, { isParked: false });
    await ParkingArea.updateOne({ _id: this.parkingAreaId }, { $inc: { bookedSlots: -1 } });

    next();
  } catch (error) {
    next(error);
  }
});

const Parking = mongoose.model("Parking", parkingSchema);

function validateParking(parking) {
  const schema = {
    vehicleId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    parkingAreaId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  };

  return Joi.validate(parking, schema);
}

exports.Parking = Parking;
exports.validate = validateParking;