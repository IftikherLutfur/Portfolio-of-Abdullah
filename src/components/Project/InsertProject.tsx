"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { toast } from "sonner";

const FormModalView: React.FC = () => {
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technology: "",
    image: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Submit project form (POST request)
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          technology: formData.technology.split(",").map((tech) => tech.trim()),
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok) {
        toast.error(`Failed to submit project: ${data.message || "Unknown error"}`);
      } else {
        toast.success("✅ Project submitted successfully!");
        setFormData({ title: "", description: "", technology: "", image: "" });
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
        Add Project+
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
              placeholder="e.g., Next.js, Node.js"
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
              onClick={() => setIsProjectOpen(false)}
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
