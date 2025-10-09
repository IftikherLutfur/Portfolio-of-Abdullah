"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import FormModalView from "./InsertProject";

interface Project {
    _id: string;
    title: string;
    technology?: string[];
    description?: string;
    image?: string;
    createdAt: string;
    updatedAt?: string;
}

interface ProjectProps {
    projects: Project[];
}

export default function ProjectTableData({ projects }: ProjectProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [editData, setEditData] = useState({
        title: "",
        image: "",
        description: "",
        technology: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setEditData((prev) => ({ ...prev, [id]: value }));
    };

    const handleEditClick = (project: Project) => {
        setEditId(project._id);
        setEditData({
            title: project.title,
            image: project.image || "",
            description: project.description || "",
            technology: project.technology ? project.technology.join(", ") : "",
        });
        setIsEditOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/${editId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...editData,
                    technology: editData.technology.split(",").map((tech) => tech.trim()),
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(`Update failed: ${data.message || "Unknown error"}`);
                return;
            }

            alert("✅ Project updated successfully!");
            setIsEditOpen(false);
        } catch (error) {
            console.error("Error updating project:", error);
            alert("❌ Something went wrong. Check console.");
        }
    };

    const handleDelete = async () => {
        if (!editId) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/${editId}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (!res.ok) {
                alert(`Delete failed: ${data.message || "Unknown error"}`);
                return;
            }

            alert("✅ Project deleted successfully!");
            setIsDeleteOpen(false);
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("❌ Something went wrong. Check console.");
        }
    };

    return (
       <div>
         <div className="mx-20 w-full overflow-x-auto shadow-lg rounded-lg border border-gray-200 mt-20">
            <Table className="min-w-full">
                <TableCaption className="text-left mx-5 my-2 text-black font-semibold py-2">
                    All Projects
                </TableCaption>
                <TableHeader className="bg-amber-100">
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Technology</TableHead>
                        <TableHead className="text-right">Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {projects?.map((project, index) => (
                        <TableRow key={project._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell>{project.technology?.join(", ")}</TableCell>
                            <TableCell className="text-right">
                                {new Date(project.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => handleEditClick(project)}>Edit</Button>
                                <Button onClick={() => setIsDeleteOpen(true)} variant="destructive">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Edit Modal */}
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Project" size="lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={editData.title}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Enter project title"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                            type="text"
                            id="image"
                            value={editData.image}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Image URL"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            id="description"
                            rows={4}
                            value={editData.description}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md resize-none"
                            placeholder="Write project description..."
                        />
                    </div>

                    <div>
                        <label htmlFor="technology" className="block text-sm font-medium mb-1">Technology (comma separated)</label>
                        <input
                            type="text"
                            id="technology"
                            value={editData.technology}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="e.g., Next.js, Node.js"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button type="button" onClick={() => setIsEditOpen(false)} variant="secondary">
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Project" size="sm">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Are you sure?</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                This action cannot be undone. This will permanently delete the project and remove all associated data.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Button onClick={() => setIsDeleteOpen(false)} variant="secondary">Cancel</Button>
                        <Button onClick={handleDelete} variant="destructive">Delete</Button>
                    </div>
                </div>
            </Modal>
        </div>
        <FormModalView/>
       </div>
    );
}
