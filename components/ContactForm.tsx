import React, { useState, FormEvent } from 'react';
import { SendIcon } from './icons';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const encode = (data: { [key: string]: any }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setIsSubmitted(false);
    setSubmissionError(null);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData }),
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '' });
      setErrors({});
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      setSubmissionError('Sorry, there was an error sending your message. Please try again later.');
    }
  };

  return (
    <section className="py-12 md:py-16 text-center">
      <h2 className="font-['Quattrocento'] text-4xl sm:text-5xl md:text-6xl font-bold text-gradient text-gradient-secondary mb-4">
        Get In Touch
      </h2>
      <p className="font-['Quattrocento'] text-lg sm:text-xl text-gradient text-gradient-primary max-w-2xl mx-auto mb-10 md:mb-12">
        Have a project in mind? Drop a message. Eloy responds within 24 hours — or the AI gets there first.
      </p>

      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-700/30 border border-green-500 text-green-200 rounded-lg max-w-md mx-auto" role="alert">
          Got it. Eloy (or his AI) will be in touch shortly.
        </div>
      )}

      {submissionError && (
        <div className="mb-6 p-4 bg-red-700/30 border border-red-500 text-red-200 rounded-lg max-w-md mx-auto" role="alert">
          {submissionError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="max-w-xl mx-auto space-y-6 text-left"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>Don't fill this out if you're human: <input name="bot-field" /></label>
        </p>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gradient text-gradient-primary mb-1">
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 bg-[#2A2E45] border ${errors.name ? 'border-red-500' : 'border-[#5F476B]'} rounded-lg focus:ring-2 focus:ring-[#7B6187] focus:border-[#7B6187] outline-none placeholder-gray-400 text-white transition-colors`}
            placeholder="e.g. Jane Doe"
            aria-required="true"
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gradient text-gradient-primary mb-1">
            Your Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 bg-[#2A2E45] border ${errors.email ? 'border-red-500' : 'border-[#5F476B]'} rounded-lg focus:ring-2 focus:ring-[#7B6187] focus:border-[#7B6187] outline-none placeholder-gray-400 text-white transition-colors`}
            placeholder="you@example.com"
            aria-required="true"
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        {/* Service Dropdown */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gradient text-gradient-primary mb-1">
            What do you need?
          </label>
          <select
            name="service"
            id="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full p-3 bg-[#2A2E45] border border-[#5F476B] rounded-lg focus:ring-2 focus:ring-[#7B6187] focus:border-[#7B6187] outline-none text-white transition-colors appearance-none"
          >
            <option value="" className="bg-[#2A2E45]">Select a service...</option>
            <option value="Legal Drafting" className="bg-[#2A2E45]">Legal Drafting</option>
            <option value="Copywriting" className="bg-[#2A2E45]">Copywriting</option>
            <option value="Content Strategy" className="bg-[#2A2E45]">Content Strategy</option>
            <option value="Not Sure Yet" className="bg-[#2A2E45]">Not Sure Yet</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gradient text-gradient-primary mb-1">
            Tell me about your project <span className="text-red-400">*</span>
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-3 bg-[#2A2E45] border ${errors.message ? 'border-red-500' : 'border-[#5F476B]'} rounded-lg focus:ring-2 focus:ring-[#7B6187] focus:border-[#7B6187] outline-none placeholder-gray-400 text-white resize-none transition-colors`}
            placeholder="Industry, audience, what's broken, what you need..."
            aria-required="true"
          />
          {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
        </div>

        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center justify-center w-full sm:w-auto px-10 py-3.5 text-base font-medium text-white bg-[#0057FF] border border-transparent rounded-full transition-all duration-200 ease-in-out hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#151226] focus:ring-[#0057FF] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <SendIcon className="mr-2 h-5 w-5 fill-white" />
            )}
            {isSubmitting ? 'Sending...' : 'Send It →'}
          </button>
        </div>
      </form>
    </section>
  );
};
