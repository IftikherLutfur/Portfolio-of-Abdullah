"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { toast } from "sonner";
import Image from "next/image";

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

const FormModalView: React.FC = () => {
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technology: "",
    images: [] as string[], // multiple images
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle multiple image upload
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

      setFormData((prev) => ({ ...prev, images: uploadedUrls }));
      toast.success("All images uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  // Submit project form to backend
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          technology: formData.technology
            ? formData.technology.split(",").map((tech) => tech.trim())
            : [],
          image: formData.images, // array of image URLs
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(`Failed to submit project: ${data.message || "Unknown error"}`);
      } else {
        toast.success("✅ Project submitted successfully!");
        setFormData({ title: "", description: "", technology: "", images: [] });
        setIsProjectOpen(false);
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
      <Button onClick={() => setIsProjectOpen(true)} variant="default">
        Add Project +
      </Button>

      {/* Project Form Modal */}
      <Modal
        isOpen={isProjectOpen}
        onClose={() => setIsProjectOpen(false)}
        title="Submit Project"
        size="lg"
      >
        <form onSubmit={handleProjectSubmit} className="space-y-4">

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
              placeholder="Enter project title"
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
              placeholder="Enter project description..."
              required
            />
          </div>

          {/* Technology */}
          <div>
            <label htmlFor="technology" className="block text-sm font-medium mb-1">
              Technology (comma separated) *
            </label>
            <input
              type="text"
              id="technology"
              value={formData.technology}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="e.g., Next.js, Node.js, MongoDB"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Upload up to 4 Images Select 4 image together*
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full border px-3 py-2 rounded-md"
              required
            />

            {/* Preview */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                {formData.images.map((img, index) => (
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

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              onClick={() => setIsProjectOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Project"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FormModalView;
