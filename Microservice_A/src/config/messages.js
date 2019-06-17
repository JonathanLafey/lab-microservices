module.exports = {
  errors: {
    internalError: 'Internal Server Error',
    wrongIdFormat: 'The id provided is not of the required format',
    notFound: element => `${element} not found`,
    driverIsRequired: 'You need to select a specific driver id',
  },
  successful: {
    deletedSuccessfully: element => `${element} was successfully deleted`,
  },
};
