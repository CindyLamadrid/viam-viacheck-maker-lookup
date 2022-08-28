const RangerLib = require('./ranger');

let Ranger = '';

const addRangerOptions = () => {
  Ranger.TransportChangeOptions = function transportChangeOptions() {
    Ranger.SetGenericOption('OptionalDevices', 'NeedImaging', 'true');
    Ranger.SetGenericOption('OptionalDevices', 'NeedFrontImage1', 'true');
    Ranger.SetGenericOption('OptionalDevices', 'NeedRearImage1', 'true');
    // it was change the option to always print electronically the endorsement
    Ranger.SetGenericOption('OptionalDevices', 'NeedRearEndorser', 'true');
    Ranger.SetGenericOption('RearEndorser', 'Type', 'Electronic');
    Ranger.SetDriverOption('VirtualEndorsement', 'Side', 'Back');
    Ranger.SetDriverOption('VirtualEndorsement', 'YPosition', '10');
    Ranger.SetDriverOption('VirtualEndorsement', 'XPosition', '10');
    Ranger.EnableOptions();
  };
};

const initializeRanger = (messageEndorsement, wsUrl) => {
  Ranger = new RangerLib.MakeRanger();
  Ranger.wsUrl = wsUrl;
  Ranger.ShutDown();
  // Ranger.StartUp();

  addRangerOptions(messageEndorsement);
  return Ranger;
  // addCallbacksRanger();
};

module.exports = {
  addRangerOptions,
  initializeRanger
};
