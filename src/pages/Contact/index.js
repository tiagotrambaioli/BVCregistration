import React from 'react';
import ContactForm from '../../components/Contact';
import ViewForms from '../../components/ViewForms';
import useAuth from '../../hooks/useAuth';

export function Contact() {
  const { auth } = useAuth();
  return auth?.role === 'admin' ? <ViewForms /> : <ContactForm />;
}
