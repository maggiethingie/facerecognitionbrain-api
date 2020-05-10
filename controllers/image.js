const Clarifai = require('clarifai');

const app = new Clarifai.App({
      apiKey: 'c7ba0de166254fec899bc817cc1140ca'
});

const handleApiCall = (req, res) => {
	const { input }  = req.body;
	console.log(input);
	app.models
		.predict(Clarifai.COLOR_MODEL, "https://www.byrdie.com/thmb/pr2U7ghfvv3Sz8zJCHWFLT2K55E=/735x0/cdn.cliqueinc.com__cache__posts__274058__face-masks-for-pores-274058-1543791152268-main.700x0c-270964ab60624c5ca853057c0c151091-d3174bb99f944fc492f874393002bab7.jpg")
		.then(data => {
			res.json(data);
			console.log("data", data);
		})
	.catch(err => res.status(400).json("i am unable to work with API"))
}

const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entry count'));
}

module.exports = { handleImage, handleApiCall };