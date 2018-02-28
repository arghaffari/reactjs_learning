import express from 'express';
import data from '../src/testData.json'

const router = express.Router();
const contests = data.contests.reduce((obj, contest)=>{
			obj[contest.id] = contest;
			return obj
		}, {});

router.get('/contests', (req, res)=>{
	res.send({
		contests
	});
});


router.get('/contests/:contestId', (req, res) => {
	const contest = contests[req.params.contestId];
	contest.description = "Lorem ipson Lorem ipson Lorem ipsonLorem ipsonLorem ipson Lorem ipson"
	res.send({
		contest
	});
});


export default router;