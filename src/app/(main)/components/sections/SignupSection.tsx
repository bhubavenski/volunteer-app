'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

export default function SignupSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setMessage('');
  };
  return (
    <section id="signup" className="-mx-6 py-16 bg-muted">
      <div className="container mx-auto max-w-md">
        <h2 className="text-3xl text-center mb-2">Are you the initiator?</h2>
        <h3 className="text-xl font-semibold text-center mb-8">Sign up now!</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Вашето име"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Вашият имейл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Textarea
            placeholder="Съобщение (по желание)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Send
          </Button>
        </form>
      </div>
    </section>
  );
}
