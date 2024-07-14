const { update } = require('../../models/Assignments');
const Assigment = require('../../models/Assignments');

// const createAssignment = async (req, res) => {

//     const role = req.user.role;

//     if (role === 'instructor') {
//         try {

//             let ass = new Assigment(req.body);
//             if (!ass) {
//                 throw new Error('this an error with ass');
//             }
//             ass.createdAt = new Date();
//             ass.createdBy = req.user.id;
//             await ass.save()
//             res.status(201).send(ass)
//         } catch (e) {
//             res.status(400).send();
//             console.log(e)
//         }
//     }
//     else {
//         res.status(400).send('you are not allow to create assignment');
//         console.log('you are not instructor');
//     }
// }



const createAssignment = async (req, res) => {
    const role = req.user.role;

    if (role !== 'instructor') {
        console.log('Unauthorized attempt to create assignment');
        return res.status(403).send('You are not authorized to create assignments');
    }

    try {
        const assignmentData = {
            AssignmentType: req.body.AssignmentType,
            title: req.body.title,
            totalpoints: req.body.totalpoints,
            visiable: req.body.visiable,
            startedAt: req.body.startedAt,
            expiredAt: req.body.expiredAt,
            Questions: req.body.Questions.map(q => ({
                QuestionType: q.QuestionType,
                QuestionTitle: q.QuestionTitle,
                Points: q.Points,
                Answer: q.Answer,
                AutoGraded: q.AutoGraded,
                TextMatch: q.TextMatch,
                KeyWords: q.KeyWords,
                Answers: q.Answers
            })),
            createdBy: req.user.id,
            createdAt: new Date()
        };

        console.log('Creating new assignment with data:', assignmentData);

        let newAssignment = new Assignment(assignmentData);

        await newAssignment.save();

        console.log('Assignment created successfully:', newAssignment);
        res.status(201).json({
            message: 'Assignment created successfully',
            assignment: newAssignment
        });
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(400).json({
            message: 'Failed to create assignment',
            error: error.message
        });
    }
};




const getAllAssignment = async (req, res) => {

    try {
        let myAssignment;
        if (req.user.role === 'instructor') {
            myAssignment = await Assigment.find({ createdBy: req.user._id });
        }
        else if (req.user.role === 'student') {
            myAssignment = await Assigment.find({ createdBy: req.user._id, visiable: true });
        }
        else {
            throw new Error('You can\'t open this assignment');
        }
        if (!myAssignment) {
            throw new Error('There is no assignment for you');
        }
        res.status(200).send(myAssignment);
    } catch (e) {
        res.status(400).send('there is no assignment for this course')
    }
}


const getAssignment = async (req, res) => {
    try {
        let myAssignment;
        let Assignment_id = req.params.assigmentId;
        if (req.user.role === 'instructor') {
            myAssignment = await Assigment.findOne({ _id: Assignment_id });
        }
        else if (req.user.role === 'student') {
            myAssignment = await Assigment.findOne({ _id: Assignment_id, visiable: true });

        }
        else {
            throw new Error('You can\'t open this assignment');
        }
        if (!myAssignment) {
            throw new Error('There is no assignment for you');
        }
        res.status(200).send(myAssignment);
    } catch (e) {
        res.status(400).send('there is no assignment for this course')
    }
}


const editStatusForAssignment = async (req, res) => {
    try {
        const id = req.params.assigmentId;
        const updateAssignment = await Assigment.findOneAndUpdate(
            { _id: id ,createdBy: req.user._id},
         
            {
                visiable:!this.visiable
            } ,{
                new: true
              }
        );

        console.log(updateAssignment);
        if (!updateAssignment) {
            throw new Error('updated Assignment is not updated');
        }
        res.status(200).send(updateAssignment);
    }
    catch (e) {
        res.status(400).send();
        console.log(e);
    }
}



const showAssignment = async (req, res) => {
    try {
        const id = req.params.assigmentId;
        const updateAssignment = await Assigment.findOneAndUpdate(
            { _id: id ,createdBy: req.user._id},
         
            {
                visiable:!this.visiable
            } ,{
                new: true
              }
        );
        if (!updateAssignment) {
            throw new Error('updated Assignment is not updated');
        }
        
        res.status(200).send(updateAssignment);
    }
    catch (e) {
        res.status(400).send();
        console.log(e);
    }
}


const editDateForAssignment = async (req, res) => {
    try {
        const id = req.params.assigmentId;
        const updateAssignment = await Assignment.findByIdAndUpdate(
            { _id: id },
            { createdBy: req.user._id },
            {
                $set:
                {
                    startedAt: req.body.startAt,
                    expiredAt: req.body.expiredAt
                }
            },
        );
        console.log(updateAssignment);
        if (!updateAssignment) {
            throw new Error('updated Assignment is not updated');
        }
        res.status(200).send(updateAssignment);
    }
    catch (e) {
        res.status(400).send();
        console.log(e);
    }
}




const deleteAssignment = async (req, res) => {

    const role = req.user.role;
    const id = req.params.assigmentId;
    if (role === 'instructor') {
        try {

            const assignment_delete = await Assigment.findOne({ _id: id, createdBy: req.user._id });
            if (!assignment_delete || (toString(assignment_delete.createdBy) !== toString(req.user._id))) {
                throw new Error('this an error with ass');
            }

            assignment_delete.remove();
            res.status(201).send("deleted")
        } catch (e) {
            res.status(400).send();
            console.log(e)
        }
    }
    else {
        res.status(400).send('you are not allow to delete assignment');
    }
}



module.exports = { createAssignment, getAllAssignment, getAssignment, showAssignment, editStatusForAssignment, editDateForAssignment, deleteAssignment };