/**
 * Verify that the passed in parameters exists are the correct types.
 * Return helpful error messages to users.
 *
 * @param  {object}  params       The object the user passed in.
 * @param  {string}  src          The method that called verifyParams, used in error messages.
 * @param  {boolean} skipWarnings This is used in our tests to not flag false positives.
 * @return {boolean}              True if params pass, false if there was a problem.
 */
// eslint-disable-next-line no-unused-vars
function verifyKeepMetaData (params, src, skipWarnings) {
    var warnUser = require('../warnUser.js');

    if (
        params.keepMetaData === null ||
        params.keepMetaData &&
        typeof(params.keepMetaData) !== 'boolean'
    ) {
        warnUser('The keepMetaData parameter must be a boolean value.', skipWarnings);
        return false;
    }

    return true;
}

module.exports = verifyKeepMetaData;
