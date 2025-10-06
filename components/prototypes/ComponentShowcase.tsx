import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Input, InputGroup } from '@/components/ui/Input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';

export const ComponentShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buttons');
  const [inputValue, setInputValue] = useState('');

  const sampleData = [
    { name: 'Sarah Chen', role: 'Senior Frontend Developer', score: 87, status: 'Active' },
    { name: 'Marcus Johnson', role: 'Product Manager', score: 92, status: 'Active' },
    { name: 'Emily Rodriguez', role: 'UX Designer', score: 78, status: 'Review' },
    { name: 'David Kim', role: 'Backend Engineer', score: 95, status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Depth System Components</h1>
          <p className="text-gray-600">Interactive prototypes demonstrating depth system states</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="modals">Modals</TabsTrigger>
          </TabsList>

          <TabsContent value="buttons">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Button System</h2>
                <p className="text-gray-600">Different variants and states with depth transitions</p>
              </CardHeader>
              <CardBody>
                <div className="space-y-6">
                  {/* Button Variants */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Primary Variants</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="primary" size="sm">Small Primary</Button>
                      <Button variant="primary" size="md">Medium Primary</Button>
                      <Button variant="primary" size="lg">Large Primary</Button>
                      <Button variant="primary" loading>Loading</Button>
                      <Button variant="primary" disabled>Disabled</Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Secondary Variants</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="secondary" size="sm">Small Secondary</Button>
                      <Button variant="secondary" size="md">Medium Secondary</Button>
                      <Button variant="secondary" size="lg">Large Secondary</Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Ghost Variants</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="ghost" size="sm">Small Ghost</Button>
                      <Button variant="ghost" size="md">Medium Ghost</Button>
                      <Button variant="ghost" size="lg">Large Ghost</Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </TabsContent>

          <TabsContent value="cards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Default Card */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Default Card</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600 mb-4">Standard card with medium shadow depth for static content.</p>
                  <Button variant="primary" size="sm">View Details</Button>
                </CardBody>
              </Card>

              {/* Interactive Card */}
              <Card interactive>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Interactive Card</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600 mb-4">Hover over this card to see depth changes and elevation effects.</p>
                  <Button variant="secondary" size="sm">Learn More</Button>
                </CardBody>
              </Card>

              {/* Raised Card */}
              <Card variant="raised">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Raised Card</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600 mb-4">Higher elevation for important content and call-to-action areas.</p>
                  <Button variant="primary" size="sm">Get Started</Button>
                </CardBody>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Input System</h2>
                <p className="text-gray-600">Form elements with depth and focus states</p>
              </CardHeader>
              <CardBody>
                <InputGroup>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    helperText="We'll never share your email with anyone else."
                  />

                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                  />

                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    startIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    }
                  />

                  <Input
                    label="Search"
                    placeholder="Search candidates..."
                    endIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    }
                  />

                  <Input
                    label="Company Website"
                    type="url"
                    placeholder="https://example.com"
                    error="Please enter a valid URL"
                  />
                </InputGroup>
              </CardBody>
            </Card>
          </TabsContent>

          <TabsContent value="tables">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Data Table</h2>
                <p className="text-gray-600">Structured data presentation with hover states and depth</p>
              </CardHeader>
              <CardBody>
                <Table hoverable>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Fit Score</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleData.map((person, index) => (
                      <TableRow key={index} interactive>
                        <TableCell className="font-medium">{person.name}</TableCell>
                        <TableCell>{person.role}</TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            person.score >= 90 ? 'bg-green-100 text-green-800' :
                            person.score >= 80 ? 'bg-blue-100 text-blue-800' :
                            person.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {person.score}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            person.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {person.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </TabsContent>

          <TabsContent value="modals">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Modal System</h2>
                <p className="text-gray-600">Overlay components with backdrop blur and depth</p>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <p className="text-gray-600">Click the button below to see the modal in action:</p>
                  <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    Open Modal
                  </Button>
                </div>
              </CardBody>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-semibold text-gray-900">Depth System Modal</h3>
        </ModalHeader>
        <ModalBody>
          <p className="text-gray-600 mb-4">
            This modal demonstrates the overlay depth system with backdrop blur and elevated shadow effects.
          </p>
          <Input
            label="Sample Input"
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Confirm Action
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};