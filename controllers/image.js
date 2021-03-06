const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ddccc3bae88d4e74b4253d929aa76e69'
});

const handleApiCall = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.textfield)
	.then(data => {res.json(data)})
	.catch(err => res.status(400).json('Problem working with API.'))
}

const handleImage = (req,res,db) => {
	const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => res.json(entries[0]))
	.catch(err => res.status(400).json('Unable to get the data.'))
}

module.exports = {
	handleApiCall: handleApiCall,
	handleImage: handleImage
};