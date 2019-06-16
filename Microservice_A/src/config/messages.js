module.exports = {
  errors: {
    internalError: 'Internal Server Error',
    wrongIdFormat: 'The id provided is not of the required format',
    notFound: element => `${element} not found`,
  },
  successful: {
    deletedSuccessfully: element => `${element} was successfully deleted`,
  },
};
