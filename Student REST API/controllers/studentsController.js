const getStudents = async (req, res) => {
    try {
        const students = await req.db
            .collection("students")
            .find()
            .toArray();

        res.json(students);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
};

module.exports = {
    getStudents
};