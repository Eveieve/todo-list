import { projectsArr, deleteProject, editProject } from "./project";
import { rerenderInputField, renderLittleTask } from "./little-taskDOM";

const projectSection = document.querySelector(".project-section");
const renderedProjects = document.querySelector(".rendered-projects");
const projectForm = document.querySelector(".project-form");

projectSection.appendChild(projectForm);
projectSection.appendChild(renderedProjects);

export function renderProject(proj) {
  // renderedDiv to contain rendered project box
  const renderedDiv = document.createElement("div");
  renderedDiv.classList.add("rendered-div");
  renderedProjects.appendChild(renderedDiv);

  // renderedDiv.classList.add("project-title-rendered");
  renderedDiv.setAttribute("id", `${proj.id}`);
  const projectTitle = document.createElement("input");
  projectTitle.value = proj.title;
  projectTitle.classList.add = "project-title-rendered";
  renderedDiv.appendChild(projectTitle);

  renderedDiv.addEventListener("click", () => {
    rerenderInputField(proj);
    renderLittleTask(proj);
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "edit";

  editBtn.addEventListener("click", () => {
    editProject(projectTitle, proj);
    rerenderProjectArr();
  });

  renderedDiv.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  renderedDiv.appendChild(deleteBtn);

  const doneStatus = document.createElement("input");
  doneStatus.setAttribute("type", "checkbox");
  if (proj.doneStatus) doneStatus.setAttribute("checked", "checked");

  renderedDiv.appendChild(doneStatus);

  doneStatus.addEventListener("click", () => {
    proj.toggleDoneStatus();
    localStorage.setItem("storageProjectsArr", JSON.stringify(projectsArr));
  });

  const idToRemove = proj.id;

  deleteBtn.addEventListener("click", () => {
    deleteProject(idToRemove);
    rerenderProjectArr();
  });
}

export function rerenderProjectArr() {
  while (renderedProjects.firstChild) {
    renderedProjects.firstChild.remove();
  }
  console.log(projectsArr);
  projectsArr.forEach(renderProject);
}
