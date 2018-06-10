#!bin/usr/env node

/**
 * handles common strings conversions.
 * 
 * @class Str
 */
class Str
{
	/**
	 * Changes dash-case to camel-case.
	 *
	 * @return string
	 */
	static dashToCamel(string)
	{
		if (typeof string == 'undefined') {
			throw new Error('String cannot be undefined');
		}

		return string.replace(/-([a-z])/g, function (partial) { 
			return partial[1].toUpperCase(); 
		});
	}
}

module.exports = Str;
