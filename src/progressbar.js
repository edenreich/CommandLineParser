#!bin/usr/env node

/**
 * Display the progress of an operation.
 * 
 * @class Progressbar
 */
class Progressbar
{
	/**
	 * Starts the progressbar.
	 *
	 * @return void
	 */
	static start()
	{
		process.stdout.write('\n');
		this.ticker = tickEvery(500);
	}

	/**
	 * Stops the progressbar.
	 *
	 * @return void
	 */
	static stop()
	{
		clearInterval(this.ticker);
		this.ticker = undefined;
		process.stdout.write('\n');
	}
}

/**
 * Ticks by a given time.
 *
 * @param number | time
 * @return interval
 */
function tickEvery(time)
{
	let frames = createArrowFrames(40);
	let frame = 0;
	let refInterval;


	var loadFrame = function() {
	    process.stdout.write('\r' + frames[frame++]);
		
		if (frame >= frames.length) {
			clearInterval(refInterval);
			process.stdout.write('\n');
		}
	}

	refInterval = setInterval(loadFrame, time);

	return refInterval;
}

/**
 * Creates frames by given count.
 * for example ['==>', '===>']
 *
 * @param number | count
 * @return array
 */
function createArrowFrames(count)
{
	let frames = [];
	let arrow = '=';

	for (let i = 0; i < count; ++i) {
		let frame = arrow.repeat(i);
		frame += '>'; 
		frames.push(frame);
	}

	return frames;
}

module.exports = Progressbar;
