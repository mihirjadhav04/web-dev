import express from 'express';

const app = express();
const port = 3000;
let registeredStudents = [];

// Middleware to parse JSON request bodies
app.use(express.json());

let studentIdCounter = 1; // Initialize a counter for unique student IDs

// POST REQUEST: Register a new student
app.post('/register-student', (req, res) => {
    const { fullname, email, phone, city } = req.body;

    // Create a new student object with a unique ID
    const newStudentData = {
        id: studentIdCounter++,
        fullname: fullname,
        email: email,
        phone: phone,
        city: city,
    };

    // Add the new student to the list
    registeredStudents.push(newStudentData);

    // Send a response with the newly created student data
    res.status(201).send({
        data: newStudentData,
        message: "Student registered successfully!",
        success: true,
    });
});

// GET REQUEST: List all registered students
app.get('/list-registered-students', (req, res) => {
    res.status(200).send({
        data: registeredStudents,
        message: "List of all registered students.",
        success: true,
    });
});

// GET REQUEST: Fetch a single student's data by ID
app.get('/registered-student/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const fetchedStudent = registeredStudents.find(student => student.id === studentId);

    if (!fetchedStudent) {
        return res.status(404).send({
            message: "Student not found.",
            success: false,
        });
    }

    res.status(200).send({
        data: fetchedStudent,
        message: "Student details fetched successfully.",
        success: true,
    });
});

// PUT REQUEST: Update a student's details by ID
app.put('/update-student-details/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const fetchedStudent = registeredStudents.find(student => student.id === studentId);

    if (!fetchedStudent) {
        return res.status(404).send({
            message: "Student not found.",
            success: false,
        });
    }

    // Update student details
    const { fullname, email, phone, city } = req.body;
    fetchedStudent.fullname = fullname;
    fetchedStudent.email = email;
    fetchedStudent.phone = phone;
    fetchedStudent.city = city;

    res.status(200).send({
        data: fetchedStudent,
        message: "Successfully updated student details!",
        success: true,
    });
});

// DELETE REQUEST: Delete a student's details by ID
app.delete('/delete-student/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = registeredStudents.findIndex(student => student.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).send({
            message: "Student not found.",
            success: false,
        });
    }

    // Remove the student from the list
    const deletedStudent = registeredStudents.splice(studentIndex, 1)[0];

    res.status(200).send({
        data: deletedStudent,
        message: "Student deleted successfully.",
        success: true,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server app listening on port ${port}..`);
});
