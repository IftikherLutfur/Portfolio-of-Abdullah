"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { toast } from "sonner";

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Submit contact form (POST request)
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
        Add Blog+
      </Button>

      {/* Contact Form Modal */}
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
              placeholder="e.g., React.js, javascript"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Paste image URL"
            />
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
              {loading ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FormModalView;
