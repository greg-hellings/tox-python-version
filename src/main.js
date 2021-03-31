const core = require("@actions/core");

try {
	var env = core.getInput('tox-env'),
	    factors = env.split('-'),
	    pyf = /(?<pypy>py)?py(?<version>\d+)/,
	    pyfactors = [],
	    version = '';
	// Check every factor to see if it matches
	factors.forEach(function(item) {
		var match = item.match(pyf);
		if ( match )
			pyfactors.push(match);
	});
	// A factor that sets Python version was detected
	if ( pyfactors.length != 0 ) {
		var strversion = pyfactors[0].groups.version,
		    pypy = pyfactors[0].groups.pypy;
		if ( pypy !== undefined) {
			version = 'pypy-';
		}
		if ( strversion.length == 1 )
			version += strversion[0] + '.x';
		else
			version += strversion[0] + '.' + strversion.substr(1);
	} else
		version = '3.x';  // Default version if none selected
	core.setOutput('python-version', version);
} catch(error) {
	core.setFailed(error.message);
}
