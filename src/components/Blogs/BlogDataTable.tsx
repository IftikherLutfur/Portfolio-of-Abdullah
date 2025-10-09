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
import InsertBlogData from "./InsertBlogData";

interface Blog {
    _id: string;
    title: string;
    author: string;
    status: string;
    createdAt: string;
    description?: string;
    tags?: string[];
    image?: string;
}

interface BlogDataTableProps {
    blogs: Blog[];
}

export default function BlogDataTable({ blogs }: BlogDataTableProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [editData, setEditData] = useState({
        title: "",
        image: "",
        description: "",
        tags: "",
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setEditData((prev) => ({ ...prev, [id]: value }));
        console.log(`${id}:`, value);
    };

    // Open modal with selected blog data
    const handleEditClick = (blog: Blog) => {
        setEditId(blog._id);
        setEditData({
            title: blog.title,
            image: blog.image || "",
            description: blog.description || "",
            tags: blog.tags ? blog.tags.join(", ") : "",
        });
        setIsEditOpen(true);
    };

    // Submit PATCH request
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${editId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...editData,
                    tags: editData.tags.split(",").map((tag) => tag.trim()),
                }),
            });

            const data = await res.json();
            console.log("Update Response:", data);

            if (!res.ok) {
                alert(`Update failed: ${data.message || "Unknown error"}`);
                return;
            }

            alert("✅ Blog updated successfully!");
            setIsEditOpen(false);
        } catch (error) {
            console.error("Error updating blog:", error);
            alert("❌ Something went wrong. Check console.");
        }
    };

   const handleDelete = async () => {
    if (!editId) return; // যেই blog select করেছি সেটা নাও

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${editId}`, {
            method: "DELETE",
        });

        const data = await res.json();
        console.log("Delete Response:", data);

        if (!res.ok) {
            alert(`Delete failed: ${data.message || "Unknown error"}`);
            return;
        }

        alert("✅ Blog deleted successfully!");
        setIsDeleteOpen(false);
    } catch (error) {
        console.error("Error deleting blog:", error);
        alert("❌ Something went wrong. Check console.");
    }
};


    return (
       <div>
         <div className="mx-20 w-full overflow-x-auto shadow-lg rounded-lg border border-gray-200 mt-20">
            <Table className="min-w-full">
                <TableCaption className="text-left mx-5 my-2 text-black font-semibold py-2">
                    All Blogs
                </TableCaption>
                <TableHeader className="bg-amber-100">
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead></TableHead>
                        <TableHead className="text-right">CreatedAt</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {blogs?.map((blog, index) => (
                        <TableRow key={blog._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{blog.title}</TableCell>
                            <TableCell>{blog.author}</TableCell>
                            <TableCell>{blog.status}</TableCell>
                            <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => handleEditClick(blog)}>Edit</Button>
                                <Button onClick={() => setIsDeleteOpen(true)} variant="destructive">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Edit Modal */}
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Blog" size="lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={editData.title}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Enter blog title"
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
                            placeholder="Write blog description..."
                        />
                    </div>

                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                        <input
                            type="text"
                            id="tags"
                            value={editData.tags}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="e.g., React, Next.js"
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
            <div>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Delete Item"
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
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    Are you sure?
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    This action cannot be undone. This will permanently delete the
                                    item and remove all associated data.
                                </p>
                            </div>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-5 w-5 text-red-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700 dark:text-red-300">
                                        <strong>Warning:</strong> This is a destructive action that
                                        cannot be reversed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button onClick={() => setIsDeleteOpen(false)} variant="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} variant="destructive">
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>

        </div>
           <InsertBlogData/>
       </div>
    );
}
