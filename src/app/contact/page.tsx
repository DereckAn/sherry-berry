'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  project: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    project: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual email sending functionality
    // This could be done with services like EmailJS, Formspree, or a custom API
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-light tracking-tight text-black mb-4">
            Thank You
          </h1>
          <p className="text-gray-600 mb-8">
            Your message has been sent successfully. I'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                company: '',
                project: '',
                message: '',
              });
            }}
            className="inline-block bg-black text-white px-6 py-2 font-medium tracking-wide hover:bg-gray-800 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interested in collaborating? I'd love to hear about your project and 
            discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-900 mb-2">
                    Company/Production
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-900 mb-2">
                    Project Type
                  </label>
                  <input
                    type="text"
                    id="project"
                    name="project"
                    placeholder="Film, TV Series, Commercial, etc."
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and how I can help..."
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-vertical"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 px-6 font-medium tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-black mb-4">
                  Professional Services
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Production Design</li>
                  <li>• Set Design & Construction</li>
                  <li>• Art Direction</li>
                  <li>• Location Scouting</li>
                  <li>• Concept Development</li>
                  <li>• Budget Planning</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black mb-4">
                  Response Time
                </h3>
                <p className="text-gray-600">
                  I typically respond to all inquiries within 24 hours. For urgent 
                  projects, please mention the timeline in your message.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black mb-4">
                  Location
                </h3>
                <p className="text-gray-600">
                  Based in Los Angeles, available for projects worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}