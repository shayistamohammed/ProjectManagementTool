import React, { useState, useEffect } from "react";
import { Flex, Box, Button, Input, Textarea } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus } from "react-icons/fa";

function Homepage() {
  const [projects, setProjects] = useState([]);
  const [projectInput, setProjectInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [deadlineInput, setDeadlineInput] = useState(new Date());
  const [mentorInput, setMentorInput] = useState("");
  const [teamMembersInput, setTeamMembersInput] = useState([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    if (storedProjects) setProjects(storedProjects);
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = () => {
    if (projectInput.trim() !== "") {
      const newProject = {
        id: Date.now(),
        name: projectInput,
        description: descriptionInput,
        deadline: deadlineInput,
        mentor: mentorInput,
        teamMembers: teamMembersInput,
      };

      setProjects([...projects, newProject]);
      setProjectInput("");
      setDescriptionInput("");
      setDeadlineInput(new Date());
      setMentorInput("");
      setTeamMembersInput([]);
    }
  };

  const sortedProjects = projects.sort((a, b) => a.deadline - b.deadline);

  return (
    <Flex flexWrap="wrap" gap="24px" margin="70px">
      {sortedProjects.map((project) => (
        <Box
          key={project.id}
          w="300px"
          h="auto"
          bg="lightgreen"
          p="20px"
          borderRadius="8px"
          boxShadow="md"
          mb="20px"
        >
          <h1>{project.name}</h1>
          <div>
            <strong>Project Name:</strong> {project.name}
          </div>
          <div>
            <strong>Description:</strong> {project.description}
          </div>
          {/* Display team deadline inside the same box */}
          <div>
            <strong>Team Deadline:</strong> {project.deadline.toLocaleDateString()}
          </div>
          <div>
            <strong>Employees Involved:</strong> {project.employees}
          </div>
          <div>
            <strong>Mentor:</strong> {project.mentor}
          </div>
          <div>
            <strong>Team Members:</strong>
            <ul style={{ listStyleType: "none", paddingInlineStart: 0 }}>
              {project.teamMembers.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        </Box>
      ))}
      <Box w="300px" h="auto" p="20px" borderRadius="8px" boxShadow="md">
        <Input
          placeholder="Enter project name"
          value={projectInput}
          onChange={(e) => setProjectInput(e.target.value)}
          _placeholder={{
            fontWeight: "bold",
          }}
          mb="2"
        />
        <Input
          placeholder="Enter project description"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          _placeholder={{
            fontWeight: "bold",
          }}
          mb="2"
        />
        <div>
          <strong>Team Deadline:</strong>
          <DatePicker
            selected={deadlineInput}
            onChange={(date) => setDeadlineInput(date)}
            dateFormat="dd/MM/yyyy"
            customInput={
              <Button
                as="div"
                rightIcon={<FaPlus />}
                colorScheme="teal"
                fontWeight="bold"
              >
                Select Date
              </Button>
            }
            popperPlacement="bottom-end"
          />
        </div>
        <Input
          placeholder="Enter mentor name"
          value={mentorInput}
          onChange={(e) => setMentorInput(e.target.value)}
          _placeholder={{
            fontWeight: "bold",
          }}
          mb="2"
        />
        <Textarea
          placeholder="Enter team member names (one per line)"
          value={teamMembersInput.join("\n")}
          onChange={(e) => setTeamMembersInput(e.target.value.split("\n"))}
          _placeholder={{
            fontWeight: "bold",
          }}
          mb="2"
          rows={4}
        />
        <Button colorScheme="teal" onClick={handleAddProject} fontWeight="bold">
          Add Project
        </Button>
      </Box>
    </Flex>
  );
}

export default Homepage;