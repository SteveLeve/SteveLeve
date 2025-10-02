import { useState } from 'react';
import type { FormEvent } from 'react';

interface FormData {
    name: string;
    email: string;
    company: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Message validation
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (formData.subject.trim().length < 10) {
            newErrors.subject = 'Subject must be at least 10 characters';
        }


        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // TODO: Replace with actual API endpoint when Cloudflare Worker is ready
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    subject: '',
                    message: ''
                });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-grid">
                {/* Name Field */}
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Your full name"
                        disabled={isSubmitting}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                {/* Email Field */}
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                {/* Company Field */}
                <div className="form-group">
                    <label htmlFor="company" className="form-label">
                        Company
                    </label>
                    <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="form-input"
                        placeholder="Your company (optional)"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Subject Field */}
                <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                        Subject *
                    </label>
                    <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className={`form-input ${errors.subject ? 'error' : ''}`}
                        placeholder="Brief description of your inquiry"
                        disabled={isSubmitting}
                    />
                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>
            </div>

            {/* Message Field */}
            <div className="form-group">
                <label htmlFor="message" className="form-label">
                    Message *
                </label>
                <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Tell me about your project, timeline, and goals..."
                    rows={5}
                    disabled={isSubmitting}
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
            >
                {isSubmitting ? (
                    <>
                        <span className="material-symbols-outlined spinning">sync</span>
                        Sending...
                    </>
                ) : (
                    <>
                        <span className="material-symbols-outlined">send</span>
                        Send Message
                    </>
                )}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
                <div className="status-message success">
                    <span className="material-symbols-outlined">check_circle</span>
                    <div>
                        <strong>Message sent successfully!</strong>
                        <p>I'll get back to you within 24 hours.</p>
                    </div>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="status-message error">
                    <span className="material-symbols-outlined">error</span>
                    <div>
                        <strong>Failed to send message</strong>
                        <p>Please try again or contact me directly via LinkedIn.</p>
                    </div>
                </div>
            )}

            <style>{`
        .contact-form {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .form-input,
        .form-textarea {
          padding: 0.75rem;
          border: 2px solid var(--border);
          border-radius: 8px;
          font-size: 1rem;
          background: var(--surface);
          color: var(--ink);
          transition: all 0.2s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(103, 80, 164, 0.1);
        }

        .form-input.error,
        .form-textarea.error {
          border-color: #ef4444;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.8rem;
          margin-top: 0.25rem;
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 1rem 2rem;
          background: var(--brand);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .submit-button:hover:not(:disabled) {
          background: var(--brand-ink);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(103, 80, 164, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .status-message {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .status-message.success {
          background: #f0f9ff;
          border: 1px solid #0ea5e9;
          color: #0c4a6e;
        }

        .status-message.error {
          background: #fef2f2;
          border: 1px solid #ef4444;
          color: #991b1b;
        }

        .status-message .material-symbols-outlined {
          font-size: 1.5rem;
          margin-top: 0.1rem;
        }

        .status-message strong {
          display: block;
          margin-bottom: 0.25rem;
        }

        .status-message p {
          margin: 0;
          font-size: 0.9rem;
        }

        /* Mobile responsive - no changes needed for single column */

        /* Dark theme adjustments */
        :global([data-theme="dark"]) .status-message.success {
          background: rgba(14, 165, 233, 0.1);
          border-color: rgba(14, 165, 233, 0.3);
          color: #7dd3fc;
        }

        :global([data-theme="dark"]) .status-message.error {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #fca5a5;
        }
      `}</style>
        </form>
    );
}