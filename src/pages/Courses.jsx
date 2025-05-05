import React, { useState, useEffect } from "react"
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  TextField,
  Stack,
} from "@mui/material"

import {
    getCourses,
    createCourse,
    getCourseSections,
    createSection,
    getSectionFiles,
    uploadFile,
  } from "../api"

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const Courses = () => {

    const [courses, setCourses] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState(null)
    const [selectedSectionId, setSelectedSectionId] = useState(null)
    const [newCourseName, setNewCourseName] = useState("")
    const [newSectionName, setNewSectionName] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [openSectionDialog, setOpenSectionDialog] = useState(false)
    const [openFileDialog, setOpenFileDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [uploadingFile, setUploadingFile] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    const selectedCourse = courses.find((c) => c.id === selectedCourseId) || null
    const selectedSection = selectedCourse?.sections?.find((s) => s.id === selectedSectionId) || null

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        setLoading(true)
        try {
        const response = await getCourses()
        setCourses(response.data)
        } catch (error) {
        alert("Error fetching courses. Please try again.")
        console.error(error)
        } finally {
        setLoading(false)
        }
    }

    const handleCreateCourse = async () => {
        if (!newCourseName.trim()) return
        setLoading(true)
        try {
        const response = await createCourse(newCourseName)
        setCourses([...courses, response.data])
        setNewCourseName("")
        setOpenDialog(false)
        } catch (error) {
        alert("Error creating course. Please try again.")
        console.error(error)
        } finally {
        setLoading(false)
        }
    }

    const handleEnterCourse = async (courseId) => {
        setLoading(true)
        try {
        const response = await getCourseSections(courseId)
        const updatedCourses = courses.map((course) =>
            course.id === courseId
            ? { ...course, sections: response.data }
            : course
        )
        setCourses(updatedCourses)
        setSelectedCourseId(courseId)
        setSelectedSectionId(null)
        } catch (error) {
        alert("Error fetching sections. Please try again.")
        console.error(error)
        } finally {
        setLoading(false)
        }
    }

    const handleCreateSection = async () => {
        if (!newSectionName.trim() || !selectedCourseId) return
        setLoading(true)
        try {
        await createSection(newSectionName, selectedCourseId)
        const response = await getCourseSections(selectedCourseId)
        const updatedCourses = courses.map((course) =>
            course.id === selectedCourseId
            ? { ...course, sections: response.data }
            : course
        )
        setCourses(updatedCourses)
        setNewSectionName("")
        setOpenSectionDialog(false)
        } catch (error) {
        alert("Error creating section. Please try again.")
        console.error(error)
        } finally {
        setLoading(false)
        }
    }

    const handleEnterSection = async (courseId, sectionId) => {
        setLoading(true)
        try {
        const response = await getSectionFiles(courseId, sectionId)
        const updatedCourses = courses.map((course) =>
            course.id === courseId
            ? {
                ...course,
                sections: course.sections.map((section) =>
                    section.id === sectionId
                    ? { ...section, files: response.data }
                    : section
                ),
                }
            : course
        )
        setCourses(updatedCourses)
        setSelectedSectionId(sectionId)
        } catch (error) {
        alert("Error fetching section details. Please try again.")
        console.error(error)
        } finally {
        setLoading(false)
        }
    }



    return (
        <div>
            <h1>Courses</h1>
            <p>Welcome to the Courses page. Here you can find a list of available courses.</p>
            <Container>
                <Typography variant="h4" sx={{ marginTop: 2 }}>
                LMS - RAG
                </Typography>

                {loading && <Typography>Loading...</Typography>}

                {!selectedCourseId ? (
                <>
                    <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={() => setOpenDialog(true)}
                    >
                    Create Course
                    </Button>
                    <Stack
                    direction="row"
                    spacing={2}
                    sx={{ marginTop: 2, flexWrap: "wrap" }}
                    >
                    {courses.map((course) => (
                        <Card
                        key={course.id}
                        onClick={() => handleEnterCourse(course.id)}
                        sx={{ cursor: "pointer", width: 200 }}
                        >
                        <CardContent>
                            <Typography variant="h6">{course.name}</Typography>
                        </CardContent>
                        </Card>
                    ))}
                    </Stack>
                </>
                ) : !selectedSectionId ? (
                <>
                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setSelectedCourseId(null)}
                    >
                    Back to Courses
                    </Button>
                    <Typography variant="h5" sx={{ marginTop: 2 }}>
                    {selectedCourse?.name}
                    </Typography>
                    <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    onClick={() => setOpenSectionDialog(true)}
                    >
                    Create Section
                    </Button>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Sections
                    </Typography>
                    <Stack spacing={1}>
                    {(selectedCourse?.sections || []).map((section) => (
                        <Typography
                        key={section.id}
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                            handleEnterSection(selectedCourseId, section.id)
                        }
                        >
                        {section.name}
                        </Typography>
                    ))}
                    </Stack>
                </>
                ) : (
                <>
                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setSelectedSectionId(null)}
                    >
                    Back to Course
                    </Button>
                    <Typography variant="h5" sx={{ marginTop: 2 }}>
                    {selectedSection?.name}
                    </Typography>
                    <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={() => setOpenFileDialog(true)}
                    >
                    Upload File
                    </Button>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Files
                    </Typography>
                    <Stack spacing={1}>
                    {(selectedSection?.files || []).length === 0 ? (
                        <Typography>No files available</Typography>
                    ) : (
                        selectedSection.files.map((file) => (
                        <Typography
                            key={file.id}
                            component="a"
                            href={`${API_BASE_URL}${file.file_url}`}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ textDecoration: "underline", color: "primary.main" }}
                        >
                            {file.name}
                        </Typography>

                        ))
                    )}
                    </Stack>
                </>
                )}

                {/* Create Course Dialog */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <Container sx={{ padding: 2 }}>
                    <Typography variant="h6">Create a New Course</Typography>
                    <TextField
                    fullWidth
                    label="Course Name"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    sx={{ marginY: 2 }}
                    />
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateCourse}
                    disabled={loading}
                    >
                    Create
                    </Button>
                </Container>
                </Dialog>

                {/* Create Section Dialog */}
                <Dialog
                open={openSectionDialog}
                onClose={() => setOpenSectionDialog(false)}
                >
                <Container sx={{ padding: 2 }}>
                    <Typography variant="h6">Create Section</Typography>
                    <TextField
                    fullWidth
                    label="Section Name"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    sx={{ marginY: 2 }}
                    />
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateSection}
                    disabled={loading}
                    >
                    Create
                    </Button>
                </Container>
                </Dialog>

                {/* Upload File Dialog */}
                <Dialog open={openFileDialog} onClose={() => setOpenFileDialog(false)}>
                <Container sx={{ padding: 2 }}>
                    <Typography variant="h6">Upload File</Typography>
                    <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    style={{ margin: "16px 0" }}
                    />
                    <Button
                    variant="contained"
                    color="primary"
                    disabled={uploadingFile || !selectedFile}
                    onClick={async () => {
                        if (!selectedFile || !selectedSection) return;
                        setUploadingFile(true);
                        try {
                        await uploadFile(selectedFile, selectedCourseId, selectedSection.id);

                        // Refresh section files
                        const response = await getSectionFiles(selectedCourseId, selectedSection.id);
                        const updatedCourses = courses.map((course) =>
                            course.id === selectedCourseId
                            ? {
                                ...course,
                                sections: course.sections.map((section) =>
                                    section.id === selectedSection.id
                                    ? { ...section, files: response.data }
                                    : section
                                ),
                                }
                            : course
                        );
                        setCourses(updatedCourses);
                        setSelectedFile(null);
                        setOpenFileDialog(false);
                        } catch (error) {
                        alert("Error uploading file. Please try again.");
                        console.error(error);
                        } finally {
                        setUploadingFile(false);
                        }
                    }}
                    >
                    {uploadingFile ? "Uploading..." : "Upload"}
                    </Button>
                </Container>
                </Dialog>
            </Container>
        </div>
    );
};

export default Courses;