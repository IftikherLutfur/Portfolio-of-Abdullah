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
import { toast } from "sonner";
import Image from "next/image";

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

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
  const [loading, setLoading] = useState(false);

  const [editData, setEditData] = useState({
    title: "",
    image: "",
    description: "",
    tags: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setEditData((prev) => ({ ...prev, [id]: value }));
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

  // 🖼 Handle single image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formDataCloud = new FormData();
      formDataCloud.append("file", file);
      formDataCloud.append("upload_preset", UPLOAD_PRESET as string);

      const res = await fetch(CLOUDINARY_URL as string, {
        method: "POST",
        body: formDataCloud,
      });

      const data = await res.json();

      if (data.secure_url) {
        setEditData((prev) => ({ ...prev, image: data.secure_url }));
        toast.success("✅ Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Submit PATCH request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${editId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editData,
            tags: editData.tags.split(",").map((tag) => tag.trim()),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(`Update failed: ${data.message || "Unknown error"}`);
        return;
      }

      toast.success("✅ Blog updated successfully!");
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("❌ Something went wrong. Check console.");
    }
  };

  // 🗑 Handle delete
  const handleDelete = async () => {
    if (!editId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${editId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(`Delete failed: ${data.message || "Unknown error"}`);
        return;
      }

      toast.success("✅ Blog deleted successfully!");
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("❌ Something went wrong. Check console.");
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
                <TableCell>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button onClick={() => handleEditClick(blog)}>Edit</Button>
                  <Button
                    onClick={() => {
                      setEditId(blog._id);
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

        {/* ✏️ Edit Modal */}
        <Modal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Edit Blog"
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium mb-1"
              >
                Title
              </label>
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

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium mb-1"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border px-3 py-2 rounded-md"
              />
              {editData.image && (
                <div className="mt-3">
                  <Image
                    src={editData.image}
                    width={200}
                    height={200}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>

            {/* Description */}
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
                placeholder="Write blog description..."
              />
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium mb-1"
              >
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                value={editData.tags}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                placeholder="e.g., React, Next.js"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                onClick={() => setIsEditOpen(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Modal>

        {/* 🗑 Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Delete Blog"
          size="sm"
        >
          <div className="space-y-4">
            <p>Are you sure you want to delete this blog?</p>
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

      <InsertBlogData />
    </div>
  );
}
