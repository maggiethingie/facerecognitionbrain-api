const Clarifai = require('clarifai');

const app = new Clarifai.App({
      apiKey: 'c7ba0de166254fec899bc817cc1140ca'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			console.log(data);
			res.json(data);
		})
	.catch(err => res.status(400).json(err))
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