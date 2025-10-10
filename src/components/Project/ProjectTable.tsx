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
import { toast } from "sonner";
import Image from "next/image";

interface Project {
    _id: string;
    title: string;
    technology?: string[];
    description?: string;
    image?: string[]; // <-- changed to array
    createdAt: string;
    updatedAt?: string;
}

interface ProjectProps {
    projects: Project[];
}

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

export default function ProjectTableData({ projects }: ProjectProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [editData, setEditData] = useState({
        title: "",
        description: "",
        technology: "",
        image: [] as string[],
    });

    // handle text input change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setEditData((prev) => ({ ...prev, [id]: value }));
    };

    // open modal with project data
    const handleEditClick = (project: Project) => {
        setEditId(project._id);
        setEditData({
            title: project.title,
            description: project.description || "",
            technology: project.technology ? project.technology.join(", ") : "",
            image: project.image || [],
        });
        setIsEditOpen(true);
    };

    // handle image upload (multiple)
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (files.length > 4) {
            toast.error("You can upload up to 4 images only.");
            return;
        }

        setLoading(true);
        const uploadedUrls: string[] = [];

        try {
            for (const file of Array.from(files)) {
                const formDataCloud = new FormData();
                formDataCloud.append("file", file);
                formDataCloud.append("upload_preset", UPLOAD_PRESET as string);

                const res = await fetch(CLOUDINARY_URL as string, {
                    method: "POST",
                    body: formDataCloud,
                });

                const data = await res.json();

                if (data.secure_url) {
                    uploadedUrls.push(data.secure_url);
                }
            }

            setEditData((prev) => ({
                ...prev,
                image: [...prev.image, ...uploadedUrls],
            }));
            toast.success("Images uploaded successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Image upload failed!");
        } finally {
            setLoading(false);
        }
    };

    // submit edit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId) return;

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/project/${editId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: editData.title,
                        description: editData.description,
                        technology: editData.technology
                            ? editData.technology.split(",").map((tech) => tech.trim())
                            : [],
                        image: editData.image, // now array
                    }),
                }
            );

            const data = await res.json();
            if (!res.ok) {
                toast.error(`Update failed: ${data.message || "Unknown error"}`);
                return;
            }

            toast.success("✅ Project updated successfully!");
            setIsEditOpen(false);
        } catch (error) {
            console.error("Error updating project:", error);
            toast.error("❌ Something went wrong. Check console.");
        } finally {
            setLoading(false);
        }
    };

    // delete project
    const handleDelete = async () => {
        if (!editId) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/project/${editId}`,
                { method: "DELETE" }
            );

            const data = await res.json();
            if (!res.ok) {
                toast.error(`Delete failed: ${data.message || "Unknown error"}`);
                return;
            }

            toast.success("✅ Project deleted successfully!");
            setIsDeleteOpen(false);
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("❌ Something went wrong. Check console.");
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
                                <TableCell className="text-right space-x-2">
                                    <Button onClick={() => handleEditClick(project)}>Edit</Button>
                                    <Button
                                        onClick={() => {
                                            setEditId(project._id);
                                            setIsDeleteOpen(true);
                                        }}
                                        variant="destructive"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Edit Modal */}
                <Modal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    title="Edit Project"
                    size="lg"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-1">
                                Title
                            </label>
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
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium mb-1"
                            >
                                Description
                            </label>
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
                            <label
                                htmlFor="technology"
                                className="block text-sm font-medium mb-1"
                            >
                                Technology (comma separated)
                            </label>
                            <input
                                type="text"
                                id="technology"
                                value={editData.technology}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md"
                                placeholder="e.g., Next.js, Node.js"
                            />
                        </div>

                        {/* Image Upload Section */}
                        <div>
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium mb-1"
                            >
                                Upload Images (optional), if you change, then you should change all 4 and select together
                            </label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="w-full border px-3 py-2 rounded-md"
                            />

                            {editData.image.length > 0 && (
                                <div className="grid grid-cols-2 gap-3 mt-3">
                                    {editData.image.map((img, index) => (
                                        <Image
                                            key={index}
                                            src={img}
                                            width={200}
                                            height={200}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-40 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <Button
                                type="button"
                                onClick={() => setIsEditOpen(false)}
                                variant="secondary"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Delete Project"
                    size="sm"
                >
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-10 w-10 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Are you sure?
                                </h3>
                                <p className="text-sm text-gray-600">
                                    This action cannot be undone. This will permanently delete the
                                    project and all associated data.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button
                                onClick={() => setIsDeleteOpen(false)}
                                variant="secondary"
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} variant="destructive">
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>

            {/* Insert Project Modal */}
            <FormModalView />
        </div>
    );
}
