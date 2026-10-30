import { useState } from "react";
import type { Route } from "./+types/projects";
import { Topbar } from "~/components/layout/topbar";
import { SidebarTrigger } from "~/components/layout/sidebar-trigger";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { ProjectsHeader } from "~/components/projects/projects-header";
import { ProjectStatusTabs } from "~/components/projects/project-status-tabs";
import { ProjectsToolbar } from "~/components/projects/projects-toolbar";
import { ProjectsTable } from "~/components/projects/projects-table";
import { toast } from "~/components/ui/toast";
import { ProjectForm } from "~/components/projects/project-form";
import { mockProjects, type Project } from "~/components/projects/project-data";
import { createProjectFromForm } from "~/components/projects/project-form-utils";
import type { ProjectFormValues } from "~/components/projects/project-form-schema";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | Teamboard" },
    { name: "description", content: "Your Teamboard projects." },
  ];
}

export default function Projects() {
  const [projects, setProjects] = useState(mockProjects);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  function openCreateForm() {
    setEditingProject(null);
    setFormOpen(true);
  }

  function openEditForm(project: Project) {
    setEditingProject(project);
    setFormOpen(true);
  }

  function saveProject(values: ProjectFormValues) {
    const wasEditing = editingProject !== null;
    const savedProject = createProjectFromForm(
      values,
      editingProject ?? undefined,
    );
    setProjects((current) =>
      editingProject
        ? current.map((project) =>
            project.id === editingProject.id ? savedProject : project,
          )
        : [savedProject, ...current],
    );
    toast.add({
      title: wasEditing ? "Project updated" : "Project created",
      description: wasEditing
        ? `${savedProject.name} has been updated.`
        : `${savedProject.name} has been created.`,
      type: "success",
      timeout: 5000,
    });
    setFormOpen(false);
    setEditingProject(null);
  }

  function deleteProject(project: Project) {
    setProjects((current) => current.filter((item) => item.id !== project.id));
    setFormOpen(false);
    setEditingProject(null);
  }

  return (
    <>
      <Topbar left={<PageBreadcrumb />} right={<SidebarTrigger />} />
      <div className="page-content">
        <ProjectsHeader onCreateProject={openCreateForm} />
        <ProjectStatusTabs />
        <ProjectsToolbar />
        <ProjectsTable projects={projects} onEditProject={openEditForm} />
      </div>
      <ProjectForm
        open={formOpen}
        project={editingProject}
        onOpenChange={setFormOpen}
        onSubmit={saveProject}
        onDelete={deleteProject}
      />
    </>
  );
}

function PageBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbPage>Projects</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
