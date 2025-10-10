"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { toast } from "sonner";
import Image from "next/image";

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

const FormModalView: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    tags: "",
    image: "",
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle single image upload
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
        setFormData((prev) => ({ ...prev, image: data.secure_url }));
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

  // Submit blog form (POST request)
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok) {
        toast.error(`Failed to submit blog: ${data.message || "Unknown error"}`);
      } else {
        toast.success("✅ Blog submitted successfully!");
        setFormData({ title: "", description: "", author: "", tags: "", image: "" });
        setIsContactOpen(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsContactOpen(true)} variant="default">
        Add Blog +
      </Button>

      {/* Blog Form Modal */}
      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Submit Blog"
        size="lg"
      >
        <form onSubmit={handleContactSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md resize-none"
              placeholder="Enter blog description..."
              required
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Author *
            </label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Author name"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Tags (comma separated) *
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="e.g., React.js, JavaScript"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Upload Image *
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border px-3 py-2 rounded-md"
              required
            />

            {/* Preview */}
            {formData.image && (
              <div className="mt-3">
                <Image
                  src={formData.image}
                  width={200}
                  height={200}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              onClick={() => setIsContactOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Blog"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FormModalView;
