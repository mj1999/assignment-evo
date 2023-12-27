const surveyForm = require("../model/surveyForms");
module.exports.submit = async function (req, res) {
  console.log(req.body);
  try {
    const surveyPresent = await surveyForm.findOne({ email: req.body.email });
    if (!surveyPresent) {
      surveyForm.create(req.body);
      res.json({
        success: true,
        message: "Survey form successfully submitted",
      });
    } else {
      res.json({
        success: false,
        present: true,
        message: "Form already present",
      });
    }
  } catch {
    res.json({ success: false, message: "Internal Server Error" });
  }
};
module.exports.view = async function (req, res) {
  try {
    const surveys = await surveyForm.find({});
    res.json({ success: true, message: "fetched all surveys", surveys });
  } catch {
    res.json({ success: false, message: "Internal Server Error" });
  }
};
