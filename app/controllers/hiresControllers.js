const { ErrorResponse } = require('../../utils/errorResponse');
const { getAllHires, getDetailHire, insertHireMassage } = require('../models/Hire');
const { getRecruiterById, getCandidateById } = require('../models/User');

const getHireMessages = async (req, res) => {
  const getAllHiresResults = await getAllHires();
  res.status(200).send(getAllHiresResults.rows);
};

const getDetailHireMessage = async (req, res) => {
  const { id } = req.params;
  const getDetailHireResult = await getDetailHire(id);
  if (!getDetailHireResult?.rowCount) throw new ErrorResponse('Hire messages not found!', 404);
  res.status(200).send(getDetailHireResult.rows);
};

const addHireMessage = async (req, res) => {
  const { recruiterId, candidateId, messageSubject, description } = req.body;

  const mandatoryFieldIsBlank = !recruiterId || !candidateId || !messageSubject;
  if (mandatoryFieldIsBlank) throw new ErrorResponse('Recruiter, candidate and message subject is required', 422);

  const recruiterIdChecker = await getRecruiterById(recruiterId);
  if (!recruiterIdChecker?.rowCount) throw new ErrorResponse('Recruiter not found!', 404);

  const candidateIdChecker = await getCandidateById(candidateId);
  if (!candidateIdChecker?.rowCount) throw new ErrorResponse('Candidate not found!', 404);

  await insertHireMassage({ recruiterId, candidateId, messageSubject, description });
  res.status(200).send({ message: 'hire message sended' });
};
module.exports = { getHireMessages, getDetailHireMessage, addHireMessage };
