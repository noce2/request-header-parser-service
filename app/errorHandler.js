/* eslint linebreak-style: ["error", "windows"]*/
module.exports.errorHandler = (error) => {
  console.log(`error message: ${error}`);
  return { error: `encountered server ${error}` };
};
