"use client";
import React, { useState } from "react";

type SectionType = 'gdpr' | 'pdpa';

interface Section {
    title: string;
    content: string;
    points: string[];
}

const PolicyPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SectionType>('gdpr');

    const sections: Record<SectionType, Section[]> = {
        gdpr: [
            {
                title: "Data Collection and Processing",
                content: "We collect and process your personal data only with your explicit consent and for specific, legitimate purposes including:",
                points: [
                    "Processing investment transactions and maintaining records",
                    "Providing personalized investment recommendations",
                    "Communicating about opportunities and platform updates",
                    "Ensuring platform security and preventing fraud"
                ]
            },
            {
                title: "Your Rights Under GDPR",
                content: "As a user, you have the following rights regarding your personal data:",
                points: [
                    "Right to access your personal data",
                    "Right to rectify inaccurate information",
                    "Right to erasure ('right to be forgotten')",
                    "Right to restrict processing",
                    "Right to data portability",
                    "Right to object to processing"
                ]
            },
            {
                title: "Data Security",
                content: "We implement appropriate technical and organizational measures to ensure security of your personal data, including:",
                points: [
                    "Encryption of sensitive data",
                    "Regular security assessments",
                    "Strict access controls",
                    "Continuous monitoring and updates"
                ]
            }
        ],
        pdpa: [
            {
                title: "Personal Data Collection",
                content: "Under the Personal Data Protection Act (PDPA), we collect and use personal data with transparency:",
                points: [
                    "Identity verification information",
                    "Contact and communication details",
                    "Investment preferences and history",
                    "Platform usage information"
                ]
            },
            {
                title: "Purpose of Data Usage",
                content: "Your personal data is used for the following purposes:",
                points: [
                    "Account management and verification",
                    "Investment processing and tracking",
                    "Customer support and communication",
                    "Legal compliance and reporting"
                ]
            },
            {
                title: "Data Protection Measures",
                content: "We protect your personal data through:",
                points: [
                    "Secure data storage systems",
                    "Regular staff training on data protection",
                    "Third-party security assessments",
                    "Incident response procedures"
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Privacy Policy & Data Protection
                    </h1>
                    <p className="text-xl text-gray-600">
                        How we protect and handle your data at B2D Ventures
                    </p>
                </div>

                {/* Section Selector */}
                <div className="flex justify-center space-x-4 mb-12">
                    <button
                        onClick={() => setActiveSection('gdpr')}
                        className={`px-6 py-3 rounded-lg font-medium ${
                            activeSection === 'gdpr'
                                ? 'bg-purple text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        GDPR Compliance
                    </button>
                    <button
                        onClick={() => setActiveSection('pdpa')}
                        className={`px-6 py-3 rounded-lg font-medium ${
                            activeSection === 'pdpa'
                                ? 'bg-purple text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        PDPA Compliance
                    </button>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {sections[activeSection].map((section, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                {section.title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {section.content}
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                                {section.points.map((point, pointIndex) => (
                                    <li key={pointIndex}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-12 text-center bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Questions About Your Data?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        If you have any questions about how we handle your data or would like to exercise your rights, please contact our Data Protection Officer.
                    </p>
                    <button className="bg-purple text-white px-8 py-3 rounded-lg font-medium hover:bg-purple/90 transition-colors duration-300">
                        Contact DPO
                    </button>
                </div>

                {/* Last Updated */}
                <div className="mt-8 text-center text-gray-500">
                    Last updated: November 2024
                </div>
            </div>
        </div>
    );
};

export default PolicyPage;